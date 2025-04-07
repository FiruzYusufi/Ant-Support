
import React from 'react';

interface RemoteDisplayProps {
  remoteType: string;
}

const RemoteDisplay = ({ remoteType }: RemoteDisplayProps) => {
  const remoteImages: {[key: string]: string} = {
    'OpenBox': '/images/openbox.jpg',
    'HDBox': '/images/hdbox.jpg',
    'Uclan': '/images/uclan.jpg'
  };

  const remoteInstructions: {[key: string]: string} = {
    'OpenBox': "Нажмите 'Меню' → 'Настройки' → 'Поиск каналов'.",
    'HDBox': "Перезагрузите приставку, затем попробуйте заново.",
    'Uclan': "Убедитесь, что антенна подключена, затем перезапустите устройство."
  };

  return (
    <div id="remote-display" className="mt-6">
      <h3 className="text-xl font-semibold mb-4">Ваш пульт:</h3>
      <img 
        src={remoteImages[remoteType]}
        alt={`Пульт ${remoteType}`}
        className="w-64 mx-auto rounded-md shadow-md"
      />
      <p className="mt-4 text-lg text-center">{remoteInstructions[remoteType]}</p>
    </div>
  );
};

export default RemoteDisplay;
