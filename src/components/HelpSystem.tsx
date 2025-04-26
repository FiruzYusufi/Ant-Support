import React, { useState } from 'react';
import RemoteSelection from './RemoteSelection';
import RemoteDisplay from './RemoteDisplay';
import ErrorMenu from './ErrorMenu';
import TVScreen from './tv/TVScreen';
import { useRemoteControl } from '@/hooks/useRemoteControl';
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
  const [channelList, setChannelList] = useState<Channel[]>(defaultChannels);

  const { tvState, handleRemoteAction } = useRemoteControl({
    selectedError,
    channelList,
  });

  const handleRemoteSelect = (remoteType: string) => {
    setSelectedRemote(remoteType);
    setShowTvScreen(true);
  };

  const handleErrorSelect = (errorType: string) => {
    setSelectedError(errorType);
    
    if (errorType === 'no_signal') {
      tvState.tvMessage = 'Нет сигнала';
      tvState.showMenu = false;
    } else if (errorType === 'channels_encoded') {
      tvState.tvMessage = 'Каналы закодированы';
      tvState.showMenu = false;
    } else if (errorType === 'no_channels') {
      tvState.tvMessage = 'Каналы не настроены. Используйте меню для поиска каналов.';
      tvState.showMenu = false;
      setChannelList([]);
    } else if (errorType === 'channel_search') {
      tvState.tvMessage = null;
      tvState.showMenu = false;
      handleRemoteAction('channel_search');
    } else if (errorType === 'menu_settings') {
      tvState.tvMessage = null;
      tvState.showMenu = true;
      tvState.menuSelection = 'main';
      tvState.menuIndex = 0;
    } else if (errorType === 'weak_signal') {
      tvState.tvMessage = 'Слабый сигнал';
      tvState.showMenu = false;
    } else if (errorType === 'hdmi') {
      tvState.tvMessage = 'HDMI режим';
      tvState.showMenu = false;
    } else if (errorType === 'sleep_timer') {
      tvState.showSleepTimer = true;
      tvState.sleepTime = 30;
      tvState.showMenu = false;
      tvState.tvMessage = null;
    } else {
      tvState.tvMessage = null;
      tvState.showMenu = false;
      tvState.showSleepTimer = false;
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
                  {...tvState}
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
