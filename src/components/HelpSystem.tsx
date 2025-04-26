
import React, { useState, useEffect } from 'react';
import RemoteSelection from './RemoteSelection';
import RemoteDisplay from './RemoteDisplay';
import ErrorMenu from './ErrorMenu';
import TVScreen from './tv/TVScreen';
import { toast } from 'sonner';
import { Channel } from '@/types/tv';

const defaultChannels: Channel[] = [
  { number: 1, name: "Первый канал", logo: "https://via.placeholder.com/50x30?text=1", contentType: "news", description: "Информационные и общественно-политические программы" },
  { number: 2, name: "Россия 1", logo: "https://via.placeholder.com/50x30?text=2", contentType: "news", description: "Новости и аналитика, информационные передачи" },
  { number: 3, name: "НТВ", logo: "https://via.placeholder.com/50x30?text=3", contentType: "crime", description: "Криминальные передачи и новости" },
  { number: 4, name: "ТНТ", logo: "https://via.placeholder.com/50x30?text=4", contentType: "entertainment", description: "Развлекательные шоу и сериалы" },
  { number: 5, name: "СТС", logo: "https://via.placeholder.com/50x30?text=5", contentType: "entertainment", description: "Семейные фильмы и развлекательные программы" },
  { number: 6, name: "Карусель", logo: "https://via.placeholder.com/50x30?text=6", contentType: "kids", description: "Детские мультфильмы и передачи" },
  { number: 7, name: "Матч ТВ", logo: "https://via.placeholder.com/50x30?text=7", contentType: "sports", description: "Спортивные трансляции и новости спорта" },
  { number: 8, name: "Культура", logo: "https://via.placeholder.com/50x30?text=8", contentType: "culture", description: "Искусство, история, документальные фильмы" },
  { number: 9, name: "РЕН ТВ", logo: "https://via.placeholder.com/50x30?text=9", contentType: "entertainment", description: "Фильмы и развлекательные программы" },
  { number: 10, name: "Мульт", logo: "https://via.placeholder.com/50x30?text=10", contentType: "kids", description: "Мультфильмы для детей разных возрастов" }
];

const HelpSystem = () => {
  const [selectedRemote, setSelectedRemote] = useState('');
  const [selectedError, setSelectedError] = useState('');
  const [showTvScreen, setShowTvScreen] = useState(false);
  const [tvMessage, setTvMessage] = useState<string | null>(null);
  const [powerState, setPowerState] = useState<boolean>(true);
  const [currentChannel, setCurrentChannel] = useState<number>(1);
  const [volume, setVolume] = useState<number>(50);
  const [showVolume, setShowVolume] = useState<boolean>(false);
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [menuSelection, setMenuSelection] = useState<string>('main');
  const [menuIndex, setMenuIndex] = useState<number>(0);
  const [channelSearchProgress, setChannelSearchProgress] = useState<number>(0);
  const [channelList, setChannelList] = useState<Channel[]>(defaultChannels);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [showInfo, setShowInfo] = useState<boolean>(false);
  const [showSleepTimer, setShowSleepTimer] = useState<boolean>(false);
  const [sleepTime, setSleepTime] = useState<number>(0);
  const [aspectRatio, setAspectRatio] = useState<string>("16:9");

  useEffect(() => {
    if (showVolume) {
      const timer = setTimeout(() => {
        setShowVolume(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [showVolume, volume]);

  useEffect(() => {
    if (showInfo) {
      const timer = setTimeout(() => {
        setShowInfo(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [showInfo]);

  const handleRemoteSelect = (remoteType: string) => {
    setSelectedRemote(remoteType);
    setShowTvScreen(true);
  };

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

  const handleErrorSelect = (errorType: string) => {
    setSelectedError(errorType);
    
    if (errorType === 'no_signal') {
      setTvMessage('Нет сигнала');
      setShowMenu(false);
    } else if (errorType === 'channels_encoded') {
      setTvMessage('Каналы закодированы');
      setShowMenu(false);
    } else if (errorType === 'no_channels') {
      setTvMessage('Каналы не настроены. Используйте меню для поиска каналов.');
      setShowMenu(false);
      setChannelList([]);
    } else if (errorType === 'channel_search') {
      setTvMessage(null);
      setShowMenu(false);
      startChannelSearch();
    } else if (errorType === 'menu_settings') {
      setTvMessage(null);
      setShowMenu(true);
      setMenuSelection('main');
      setMenuIndex(0);
    } else if (errorType === 'weak_signal') {
      setTvMessage('Слабый сигнал');
      setShowMenu(false);
    } else if (errorType === 'hdmi') {
      setTvMessage('HDMI режим');
      setShowMenu(false);
    } else if (errorType === 'sleep_timer') {
      setShowSleepTimer(true);
      setSleepTime(30);
      setShowMenu(false);
      setTvMessage(null);
    } else {
      setTvMessage(null);
      setShowMenu(false);
      setShowSleepTimer(false);
    }
  };

  const handleRemoteAction = (action: string, value?: any) => {
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

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6">Система помощи операторам</h2>
      
      {!showTvScreen && (
        <RemoteSelection onSelectRemote={handleRemoteSelect} />
      )}
      
      {showTvScreen && (
        <div className="mt-8 animate-fade-in">
          <h3 className="text-xl font-semibold mb-4">Ваш выбор: {selectedRemote}</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <RemoteDisplay 
                remoteType={selectedRemote} 
                selectedError={selectedError}
                onRemoteAction={handleRemoteAction}
              />
            </div>
            
            <div>
              <div className="bg-black p-4 rounded-lg aspect-video mb-4 flex items-center justify-center relative overflow-hidden border-4 border-gray-800">
                <TVScreen
                  powerState={powerState}
                  currentChannel={currentChannel}
                  volume={volume}
                  isMuted={isMuted}
                  showVolume={showVolume}
                  showMenu={showMenu}
                  menuSelection={menuSelection}
                  menuIndex={menuIndex}
                  showInfo={showInfo}
                  showSleepTimer={showSleepTimer}
                  sleepTime={sleepTime}
                  aspectRatio={aspectRatio}
                  tvMessage={tvMessage}
                  isSearching={isSearching}
                  channelSearchProgress={channelSearchProgress}
                  channelList={channelList}
                />
              </div>
              
              <ErrorMenu onSelectError={handleErrorSelect} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HelpSystem;
