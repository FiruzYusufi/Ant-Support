
import React from 'react';
import { VolumeX, Volume2 } from 'lucide-react';
import TVMenu from './TVMenu';
import ChannelContent from './ChannelContent';
import { Channel, TVState } from '@/types/tv';

interface TVScreenProps extends TVState {
  channelList: Channel[];
}

const TVScreen = ({ 
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
  channelList
}: TVScreenProps) => {
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

  if (tvMessage) {
    return <p className="text-white text-lg">{tvMessage}</p>;
  }

  if (showMenu) {
    return <TVMenu menuSelection={menuSelection} menuIndex={menuIndex} />;
  }

  // Normal TV viewing
  const currentChannelInfo = channelList.find(ch => ch.number === currentChannel) || 
    { number: currentChannel, name: `Канал ${currentChannel}`, contentType: "unknown", description: "Нет информации" };

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
              <p className="text-gray-300 text-sm">{currentChannelInfo.description}</p>
            </div>
          </div>
          <div className="flex justify-between text-xs text-gray-300">
            <span>Соотношение: {aspectRatio}</span>
            <span>Язык: Русский</span>
          </div>
        </div>
      )}
      
      <div className="relative w-full h-full flex items-center justify-center">
        <ChannelContent 
          contentType={currentChannelInfo.contentType} 
          channelName={currentChannelInfo.name} 
        />
      </div>
      
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

export default TVScreen;
