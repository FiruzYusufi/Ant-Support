
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
    'OpenBox': "Для устранения проблем с сигналом используйте кнопки на пульте OpenBox.",
    'HDBox': "На пульте HDBox найдите кнопку 'Меню' для доступа к настройкам.",
    'Uclan': "Пульт Uclan позволяет быстро перенастроить каналы через меню 'Установка'."
  };

  return (
    <div className="flex flex-col items-center">
      <div className="bg-white p-4 rounded-lg shadow-md">
        <img 
          src={remoteImages[remoteType]}
          alt={`Пульт ${remoteType}`}
          className="h-auto max-h-96 mx-auto object-contain"
        />
      </div>
      <p className="mt-4 text-center text-sm">{remoteInstructions[remoteType]}</p>
    </div>
  );
};

export default RemoteDisplay;
