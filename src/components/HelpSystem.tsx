
import React, { useState } from 'react';
import RemoteSelection from './RemoteSelection';
import RemoteDisplay from './RemoteDisplay';

const HelpSystem = () => {
  const [selectedError, setSelectedError] = useState('');
  const [showRemoteSelection, setShowRemoteSelection] = useState(false);
  const [selectedRemote, setSelectedRemote] = useState('');
  const [showRemoteDisplay, setShowRemoteDisplay] = useState(false);

  const handleErrorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const errorValue = e.target.value;
    setSelectedError(errorValue);
    setShowRemoteSelection(!!errorValue);
    setShowRemoteDisplay(false);
  };

  const handleRemoteSelect = (remoteType: string) => {
    setSelectedRemote(remoteType);
    setShowRemoteDisplay(true);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6">Система помощи операторам</h2>
      
      {/* Выбор ошибки */}
      <div id="error-selection">
        <h3 className="text-xl font-semibold mb-4">Выберите ошибку:</h3>
        <select 
          id="error-list" 
          className="w-full p-3 border border-gray-300 rounded"
          value={selectedError}
          onChange={handleErrorChange}
        >
          <option value="">-- Выберите ошибку --</option>
          <option value="no_signal">Нет сигнала</option>
          <option value="channels_encoded">Каналы закодированы</option>
        </select>
      </div>
      
      {/* Выбор пульта */}
      {showRemoteSelection && (
        <RemoteSelection onSelectRemote={handleRemoteSelect} />
      )}
      
      {/* Отображение пульта и инструкции */}
      {showRemoteDisplay && (
        <RemoteDisplay remoteType={selectedRemote} />
      )}
    </div>
  );
};

export default HelpSystem;
