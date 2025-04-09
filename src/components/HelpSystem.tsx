
import React, { useState } from 'react';
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
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [menuSelection, setMenuSelection] = useState<string>('main');
  const [channelSearchProgress, setChannelSearchProgress] = useState<number>(0);
  const [channelList, setChannelList] = useState<Array<{number: number, name: string}>>([
    { number: 1, name: "Первый канал" },
    { number: 2, name: "Россия 1" },
    { number: 3, name: "НТВ" },
    { number: 4, name: "ТНТ" },
    { number: 5, name: "СТС" }
  ]);
  const [isSearching, setIsSearching] = useState<boolean>(false);

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
    } else if (errorType === 'channel_search') {
      setTvMessage(null);
      setShowMenu(false);
      startChannelSearch();
    } else if (errorType === 'menu_settings') {
      setTvMessage(null);
      setShowMenu(true);
      setMenuSelection('main');
    } else if (errorType === 'weak_signal') {
      setTvMessage('Слабый сигнал');
      setShowMenu(false);
    } else {
      setTvMessage(null);
      setShowMenu(false);
    }
  };

  const startChannelSearch = () => {
    setIsSearching(true);
    setChannelSearchProgress(0);
    toast('Начат поиск каналов');
    
    const searchInterval = setInterval(() => {
      setChannelSearchProgress(prev => {
        if (prev >= 100) {
          clearInterval(searchInterval);
          setIsSearching(false);
          toast('Поиск каналов завершен');
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
        break;
      case 'channel':
        if (powerState && !selectedError) {
          setCurrentChannel(value);
          toast(`Переключение на канал: ${value}`);
        }
        break;
      case 'volume':
        if (powerState) {
          const newVolume = Math.min(Math.max(volume + value, 0), 100);
          setVolume(newVolume);
          toast(`Громкость: ${newVolume}`);
        }
        break;
      case 'menu':
        if (powerState) {
          setShowMenu(!showMenu);
          setMenuSelection('main');
          toast(showMenu ? 'Закрытие меню' : 'Открытие меню');
        }
        break;
      case 'menu_select':
        if (powerState && showMenu) {
          setMenuSelection(value);
          toast(`Выбрано: ${value}`);
        }
        break;
      case 'search_channels':
        if (powerState) {
          startChannelSearch();
        }
        break;
      case 'exit':
        if (powerState && showMenu) {
          setShowMenu(false);
          toast('Выход из меню');
        }
        break;
      default:
        if (powerState) {
          toast(`Действие: ${action}`);
        }
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
      return <p className="text-white text-lg">Нет сигнала</p>;
    }
    
    if (selectedError === 'channels_encoded') {
      return <p className="text-white text-lg">Каналы закодированы</p>;
    }
    
    if (selectedError === 'no_channels') {
      return <p className="text-white text-lg">Каналы не настроены</p>;
    }
    
    if (selectedError === 'weak_signal') {
      return (
        <div className="flex flex-col items-center">
          <p className="text-white text-lg">Слабый сигнал</p>
          <div className="flex mt-2">
            <div className="h-4 w-1 bg-green-500 mx-0.5"></div>
            <div className="h-4 w-1 bg-green-500 mx-0.5"></div>
            <div className="h-4 w-1 bg-gray-500 mx-0.5"></div>
            <div className="h-4 w-1 bg-gray-500 mx-0.5"></div>
            <div className="h-4 w-1 bg-gray-500 mx-0.5"></div>
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
    const currentChannelInfo = channelList.find(ch => ch.number === currentChannel);
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <div className="absolute top-2 right-2 bg-gray-800 px-2 py-1 text-sm text-white rounded">
          {currentChannel}
        </div>
        <p className="text-white text-2xl">{currentChannelInfo?.name || `Канал ${currentChannel}`}</p>
        <p className="text-gray-400 mt-4">Нажмите кнопки на пульте для управления ТВ</p>
      </div>
    );
  };

  const renderTvMenu = () => {
    if (menuSelection === 'main') {
      return (
        <div className="text-white h-full p-4">
          <h3 className="text-xl font-bold mb-4">Главное меню</h3>
          <ul className="space-y-2">
            <li className="p-2 bg-blue-900 rounded">Настройка каналов</li>
            <li className="p-2 hover:bg-blue-800 rounded">Настройка изображения</li>
            <li className="p-2 hover:bg-blue-800 rounded">Настройка звука</li>
            <li className="p-2 hover:bg-blue-800 rounded">Настройка времени</li>
            <li className="p-2 hover:bg-blue-800 rounded">Опции системы</li>
          </ul>
        </div>
      );
    } else if (menuSelection === 'channels') {
      return (
        <div className="text-white h-full p-4">
          <h3 className="text-xl font-bold mb-4">Настройка каналов</h3>
          <button className="bg-blue-600 p-2 rounded w-full text-left mb-2">
            Автоматический поиск
          </button>
          <button className="bg-blue-900 hover:bg-blue-800 p-2 rounded w-full text-left mb-2">
            Ручной поиск
          </button>
          <button className="bg-blue-900 hover:bg-blue-800 p-2 rounded w-full text-left">
            Редактирование каналов
          </button>
        </div>
      );
    }
    
    return (
      <div className="text-white h-full flex items-center justify-center">
        <p>Раздел в разработке</p>
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
              <div className="bg-gray-900 p-4 rounded-lg aspect-video mb-4 flex items-center justify-center relative overflow-hidden">
                {renderTvScreen()}
                
                {/* Volume indicator that appears temporarily */}
                {powerState && !isSearching && !selectedError && (
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-1/2 bg-gray-800 rounded-full h-2">
                    <div 
                      className="h-full bg-green-500 rounded-full" 
                      style={{ width: `${volume}%` }}
                    ></div>
                  </div>
                )}
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
