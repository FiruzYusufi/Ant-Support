
import { useState } from 'react';
import { toast } from 'sonner';
import { TVState, Channel } from '@/types/tv';
import { getMenuItems } from '@/utils/menuItems';

interface UseRemoteControlProps {
  selectedError: string;
  channelList: Channel[];
}

export const useRemoteControl = ({ selectedError, channelList }: UseRemoteControlProps) => {
  const [powerState, setPowerState] = useState<boolean>(true);
  const [currentChannel, setCurrentChannel] = useState<number>(1);
  const [volume, setVolume] = useState<number>(50);
  const [showVolume, setShowVolume] = useState<boolean>(false);
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [menuSelection, setMenuSelection] = useState<string>('main');
  const [menuIndex, setMenuIndex] = useState<number>(0);
  const [channelSearchProgress, setChannelSearchProgress] = useState<number>(0);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [showInfo, setShowInfo] = useState<boolean>(false);
  const [showSleepTimer, setShowSleepTimer] = useState<boolean>(false);
  const [sleepTime, setSleepTime] = useState<number>(0);
  const [aspectRatio, setAspectRatio] = useState<string>("16:9");
  const [tvMessage, setTvMessage] = useState<string | null>(null);

  const startChannelSearch = () => {
    setIsSearching(true);
    setChannelSearchProgress(0);
    toast.success('Начат поиск каналов');
    
    const searchInterval = setInterval(() => {
      setChannelSearchProgress(prev => {
        if (prev >= 100) {
          clearInterval(searchInterval);
          setIsSearching(false);
          toast.success('Поиск каналов завершен');
          setTvMessage('Найдено каналов: ' + channelList.length);
          return 100;
        }
        return prev + 5;
      });
    }, 500);
  };

  const handleRemoteAction = (action: string, value?: any): void => {
    switch(action) {
      case 'power':
        setPowerState(!powerState);
        toast(powerState ? 'Выключение ТВ...' : 'Включение ТВ...');
        if (!powerState) {
          setShowSleepTimer(false);
        }
        break;
      
      case 'channel':
        if (powerState && !selectedError) {
          setCurrentChannel(value);
          toast.success(`Переключение на канал: ${value}`);
          if (showInfo || showMenu) {
            setShowInfo(false);
            setShowMenu(false);
          }
        }
        break;
      
      case 'volume':
        if (powerState) {
          const newVolume = Math.min(Math.max(volume + value, 0), 100);
          setVolume(newVolume);
          setShowVolume(true);
          setIsMuted(false);
          toast(`Громкость: ${newVolume}`);
        }
        break;
      
      case 'mute':
        if (powerState) {
          setIsMuted(!isMuted);
          toast(isMuted ? 'Звук включен' : 'Звук выключен');
          setShowVolume(true);
        }
        break;
      
      case 'menu':
        if (powerState) {
          setShowMenu(!showMenu);
          setMenuSelection('main');
          setMenuIndex(0);
          if (showMenu) {
            toast('Закрытие меню');
          } else {
            toast('Открытие меню');
            setShowInfo(false);
          }
        }
        break;
      
      case 'info':
        if (powerState && !selectedError && !showMenu) {
          setShowInfo(!showInfo);
          toast(showInfo ? 'Скрытие информации' : 'Показ информации о канале');
        }
        break;
      
      case 'navigate':
        if (powerState && showMenu) {
          if (value === 'up') {
            setMenuIndex(prev => prev > 0 ? prev - 1 : 0);
          } else if (value === 'down') {
            const menuItems = getMenuItems(menuSelection);
            setMenuIndex(prev => prev < menuItems.length - 1 ? prev + 1 : menuItems.length - 1);
          }
          toast(`Навигация: ${value}`);
        }
        break;
      
      case 'ok':
        if (powerState && showMenu) {
          const menuItems = getMenuItems(menuSelection);
          if (menuItems[menuIndex]) {
            if (menuSelection === 'main') {
              switch (menuIndex) {
                case 0:
                  setMenuSelection('channels');
                  setMenuIndex(0);
                  break;
                case 1:
                  setMenuSelection('picture');
                  setMenuIndex(0);
                  break;
                case 2:
                  setMenuSelection('sound');
                  setMenuIndex(0);
                  break;
                case 3:
                  setMenuSelection('time');
                  setMenuIndex(0);
                  break;
                case 4:
                  setMenuSelection('system');
                  setMenuIndex(0);
                  break;
              }
            } else if (menuSelection === 'channels' && menuIndex === 0) {
              setShowMenu(false);
              startChannelSearch();
            }
            toast.success(`Выбрано: ${menuItems[menuIndex]}`);
          }
        }
        break;
      
      case 'channel_change':
        if (powerState && !selectedError && channelList.length > 0) {
          const currentIndex = channelList.findIndex(ch => ch.number === currentChannel);
          let newIndex = currentIndex + value;
          
          if (newIndex < 0) newIndex = channelList.length - 1;
          if (newIndex >= channelList.length) newIndex = 0;
          
          setCurrentChannel(channelList[newIndex].number);
          toast.success(`Переключение на канал: ${channelList[newIndex].name}`);
        }
        break;
      
      case 'aspect_ratio':
        if (powerState && !showMenu && !selectedError) {
          const ratios = ["4:3", "16:9", "Zoom", "Auto"];
          const currentIndex = ratios.indexOf(aspectRatio);
          const nextIndex = (currentIndex + 1) % ratios.length;
          
          setAspectRatio(ratios[nextIndex]);
          toast.success(`Соотношение сторон: ${ratios[nextIndex]}`);
          
          const previousMessage = tvMessage;
          setTvMessage(`Соотношение сторон: ${ratios[nextIndex]}`);
          
          setTimeout(() => {
            setTvMessage(previousMessage);
          }, 2000);
        }
        break;

      case 'sleep':
        if (powerState) {
          setShowSleepTimer(!showSleepTimer);
          if (!showSleepTimer) {
            setSleepTime(prev => prev || 30);
            toast.success(`Таймер сна: ${sleepTime} минут`);
          } else {
            toast('Таймер сна отключен');
          }
        }
        break;
      
      default:
        if (powerState) {
          toast(`Действие: ${action}`);
        }
    }
  };

  const tvState: TVState = {
    powerState,
    currentChannel,
    volume,
    isMuted,
    showVolume,
    showMenu,
    menuSelection,
    menuIndex,
    showInfo,
    showSleepTimer,
    sleepTime,
    aspectRatio,
    tvMessage,
    isSearching,
    channelSearchProgress,
  };

  return {
    tvState,
    handleRemoteAction,
  };
};
