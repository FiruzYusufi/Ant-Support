
import React, { useState, useEffect } from 'react';
import RemoteSelection from './RemoteSelection';
import RemoteDisplay from './RemoteDisplay';
import ErrorMenu from './ErrorMenu';
import { toast } from 'sonner';

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
  const [channelList, setChannelList] = useState<Array<{number: number, name: string, logo?: string}>>([
    { number: 1, name: "Первый канал", logo: "https://via.placeholder.com/50x30?text=1" },
    { number: 2, name: "Россия 1", logo: "https://via.placeholder.com/50x30?text=2" },
    { number: 3, name: "НТВ", logo: "https://via.placeholder.com/50x30?text=3" },
    { number: 4, name: "ТНТ", logo: "https://via.placeholder.com/50x30?text=4" },
    { number: 5, name: "СТС", logo: "https://via.placeholder.com/50x30?text=5" }
  ]);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [showInfo, setShowInfo] = useState<boolean>(false);
  const [showSleepTimer, setShowSleepTimer] = useState<boolean>(false);
  const [sleepTime, setSleepTime] = useState<number>(0);
  const [aspectRatio, setAspectRatio] = useState<string>("16:9");

  // Close volume indicator after delay
  useEffect(() => {
    if (showVolume) {
      const timer = setTimeout(() => {
        setShowVolume(false);
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [showVolume, volume]);

  // Auto-hide info panel
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

  const handleRemoteAction = (action: string, value?: any) => {
    switch(action) {
      case 'power':
        setPowerState(!powerState);
        toast(powerState ? 'Выключение ТВ...' : 'Включение ТВ...');
        if (!powerState) {
          // Turning TV back on
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
          const menuItems = getMenuItems(menuSelection);
          
          if (value === 'up') {
            setMenuIndex(prev => prev > 0 ? prev - 1 : 0);
          } else if (value === 'down') {
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
      
      case 'search_channels':
        if (powerState) {
          startChannelSearch();
        }
        break;
      
      case 'exit':
        if (powerState) {
          if (showMenu) {
            if (menuSelection !== 'main') {
              setMenuSelection('main');
              setMenuIndex(0);
              toast('Возврат в главное меню');
            } else {
              setShowMenu(false);
              toast('Выход из меню');
            }
          } else if (showInfo) {
            setShowInfo(false);
            toast('Скрытие информации');
          }
        }
        break;

      case 'aspect_ratio':
        if (powerState && !showMenu && !selectedError) {
          const ratios = ["4:3", "16:9", "Zoom", "Auto"];
          const currentIndex = ratios.indexOf(aspectRatio);
          const nextIndex = (currentIndex + 1) % ratios.length;
          
          setAspectRatio(ratios[nextIndex]);
          toast.success(`Соотношение сторон: ${ratios[nextIndex]}`);
          
          // Show temporary message on TV
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

  const getMenuItems = (section: string): string[] => {
    switch (section) {
      case 'main':
        return ["Настройка каналов", "Настройка изображения", "Настройка звука", "Настройка времени", "Опции системы"];
      case 'channels':
        return ["Автоматический поиск", "Ручной поиск", "Редактирование каналов"];
      case 'picture':
        return ["Режим изображения", "Контраст", "Яркость", "Цветность", "Резкость"];
      case 'sound':
        return ["Режим звука", "Баланс", "Автогромкость", "Цифровой выход"];
      case 'time':
        return ["Часовой пояс", "Таймер сна", "Автовыключение"];
      case 'system':
        return ["Язык меню", "Сброс настроек", "Информация о системе"];
      default:
        return [];
    }
  };

  const renderTvScreen = () => {
    if (!powerState) {
      return <p className="text-gray-400 text-lg">ТВ выключен</p>;
    }
    
    if (isSearching) {
      return (
        <div className="w-full h-full flex flex-col items-center justify-center">
          <p className="text-white text-lg mb-4">Поиск каналов...</p>
          <div className="w-4/5 h-2 bg-gray-600 rounded-full">
            <div 
              className="h-full bg-blue-500 rounded-full transition-all duration-300" 
              style={{ width: `${channelSearchProgress}%` }}
            ></div>
          </div>
          <p className="text-white mt-2">{channelSearchProgress}%</p>
        </div>
      );
    }
    
    if (selectedError === 'no_signal') {
      return (
        <div className="w-full h-full flex flex-col items-center justify-center">
          <p className="text-white text-lg mb-2">Нет сигнала</p>
          <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
        </div>
      );
    }
    
    if (selectedError === 'channels_encoded') {
      return (
        <div className="w-full h-full flex flex-col items-center justify-center">
          <p className="text-white text-lg mb-2">Каналы закодированы</p>
          <p className="text-white text-sm">Необходима подписка для просмотра</p>
          <div className="mt-4 p-2 bg-red-600/80 rounded">
            <p className="text-white text-xs">Ошибка доступа: E-04</p>
          </div>
        </div>
      );
    }
    
    if (selectedError === 'no_channels') {
      return (
        <div className="w-full h-full flex flex-col items-center justify-center">
          <p className="text-white text-lg mb-4">Каналы не настроены</p>
          <div className="bg-gray-800/80 p-3 rounded">
            <p className="text-white text-sm">Нажмите MENU для входа в настройки</p>
            <p className="text-white text-sm">или кнопку ПОИСК на пульте</p>
          </div>
        </div>
      );
    }
    
    if (selectedError === 'weak_signal') {
      return (
        <div className="flex flex-col items-center justify-center h-full">
          <p className="text-white text-lg mb-4">Слабый сигнал</p>
          <div className="flex mt-2">
            <div className="h-6 w-2 bg-green-500 mx-0.5"></div>
            <div className="h-6 w-2 bg-green-500 mx-0.5"></div>
            <div className="h-6 w-2 bg-gray-500 mx-0.5"></div>
            <div className="h-6 w-2 bg-gray-500 mx-0.5"></div>
            <div className="h-6 w-2 bg-gray-500 mx-0.5"></div>
          </div>
          <p className="text-white mt-4 text-sm">Проверьте подключение антенны</p>
        </div>
      );
    }

    if (selectedError === 'hdmi') {
      return (
        <div className="flex flex-col items-center justify-center h-full">
          <p className="text-white text-lg mb-2">HDMI</p>
          <div className="flex items-center bg-black/40 p-4 rounded">
            <p className="text-white text-sm">Внешнее устройство не обнаружено</p>
          </div>
        </div>
      );
    }
    
    if (showMenu) {
      return renderTvMenu();
    }
    
    if (tvMessage) {
      return <p className="text-white text-lg">{tvMessage}</p>;
    }
    
    // Normal TV viewing
    const currentChannelInfo = channelList.find(ch => ch.number === currentChannel) || 
      { number: currentChannel, name: `Канал ${currentChannel}` };

    return (
      <div className="flex flex-col items-center justify-center h-full">
        {showSleepTimer && (
          <div className="absolute top-2 left-2 bg-red-600/80 px-2 py-1 text-sm text-white rounded flex items-center space-x-1">
            <span className="animate-pulse">●</span>
            <span>Сон: {sleepTime} мин</span>
          </div>
        )}
        
        <div className="absolute top-2 right-2 bg-gray-800/80 px-2 py-1 text-sm text-white rounded">
          {currentChannel}
        </div>

        {showInfo && (
          <div className="absolute bottom-4 left-4 right-4 bg-black/70 p-3 rounded">
            <div className="flex items-center mb-2">
              {currentChannelInfo.logo && (
                <div className="w-12 h-8 bg-gray-700 rounded mr-2 flex items-center justify-center text-xs">
                  {currentChannel}
                </div>
              )}
              <div>
                <p className="text-white font-bold">{currentChannelInfo.name}</p>
                <p className="text-gray-300 text-sm">Прямой эфир</p>
              </div>
            </div>
            <div className="flex justify-between text-xs text-gray-300">
              <span>Соотношение: {aspectRatio}</span>
              <span>Язык: Русский</span>
            </div>
          </div>
        )}
        
        <p className="text-white text-2xl">{currentChannelInfo.name}</p>
        <p className="text-gray-400 mt-4">Нажмите кнопки на пульте для управления ТВ</p>
        
        {/* Volume indicator that appears temporarily */}
        {showVolume && (
          <div className="absolute bottom-8 left-4 right-4 flex items-center space-x-2">
            {isMuted ? (
              <VolumeX size={20} className="text-white" />
            ) : (
              <Volume2 size={20} className="text-white" />
            )}
            
            <div className="flex-1 bg-gray-800 rounded-full h-2">
              <div 
                className={`h-full rounded-full ${isMuted ? 'bg-red-500' : 'bg-green-500'}`}
                style={{ width: isMuted ? '0%' : `${volume}%` }}
              ></div>
            </div>
            <span className="text-white text-sm">{isMuted ? 'MUTE' : volume}</span>
          </div>
        )}
      </div>
    );
  };

  const renderTvMenu = () => {
    const menuItems = getMenuItems(menuSelection);
    
    return (
      <div className="text-white h-full p-4 overflow-auto">
        <h3 className="text-xl font-bold mb-4">
          {menuSelection === 'main' ? 'Главное меню' : 
          menuSelection === 'channels' ? 'Настройка каналов' :
          menuSelection === 'picture' ? 'Настройка изображения' :
          menuSelection === 'sound' ? 'Настройка звука' :
          menuSelection === 'time' ? 'Настройка времени' : 'Опции системы'}
        </h3>
        
        <ul className="space-y-2">
          {menuItems.map((item, index) => (
            <li 
              key={index} 
              className={`p-2 ${index === menuIndex ? 'bg-blue-700' : 'hover:bg-gray-800'} rounded-md transition-colors duration-150`}
            >
              {item}
            </li>
          ))}
        </ul>
        
        <div className="absolute bottom-4 right-4 text-sm text-gray-400">
          OK - выбрать | EXIT - назад
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6">Система помощи операторам</h2>
      
      {/* Выбор пульта */}
      {!showTvScreen && (
        <RemoteSelection onSelectRemote={handleRemoteSelect} />
      )}
      
      {/* Экран с телевизором и пультом */}
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
                {renderTvScreen()}
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
