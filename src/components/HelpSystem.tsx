
import React, { useState } from 'react';
import RemoteSelection from './RemoteSelection';
import RemoteDisplay from './RemoteDisplay';
import ErrorMenu from './ErrorMenu';

const HelpSystem = () => {
  const [selectedRemote, setSelectedRemote] = useState('');
  const [selectedError, setSelectedError] = useState('');
  const [showTvScreen, setShowTvScreen] = useState(false);
  const [tvMessage, setTvMessage] = useState<string | null>(null);
  const [powerState, setPowerState] = useState<boolean>(true);

  const handleRemoteSelect = (remoteType: string) => {
    setSelectedRemote(remoteType);
    setShowTvScreen(true);
  };

  const handleErrorSelect = (errorType: string) => {
    setSelectedError(errorType);
    if (errorType === 'no_signal') {
      setTvMessage('Нет сигнала');
    } else if (errorType === 'channels_encoded') {
      setTvMessage('Каналы закодированы');
    } else {
      setTvMessage(null);
    }
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
              <RemoteDisplay remoteType={selectedRemote} selectedError={selectedError} />
            </div>
            
            <div>
              <div className="bg-gray-800 p-4 rounded-lg aspect-video mb-4 flex items-center justify-center">
                {!powerState ? (
                  <p className="text-gray-400 text-lg">ТВ выключен</p>
                ) : (
                  <div className="h-full w-full flex items-center justify-center">
                    {selectedError === 'no_signal' && (
                      <p className="text-white text-lg">Нет сигнала</p>
                    )}
                    {selectedError === 'channels_encoded' && (
                      <p className="text-white text-lg">Каналы закодированы</p>
                    )}
                    {tvMessage && (
                      <p className="text-white text-lg">{tvMessage}</p>
                    )}
                    {!selectedError && !tvMessage && (
                      <p className="text-gray-400 text-lg">ТВ работает</p>
                    )}
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
