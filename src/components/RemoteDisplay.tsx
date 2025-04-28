
import React from 'react';
import OpenBoxRemote from './remote/OpenBoxRemote';
import HDBoxRemote from './remote/HDBoxRemote';
import UclanRemote from './remote/UclanRemote';
import { toast } from 'sonner';

interface RemoteDisplayProps {
  remoteType: string;
  selectedError: string;
  onRemoteAction: (action: string, value?: any) => void;
}

const RemoteDisplay = ({ remoteType, selectedError, onRemoteAction }: RemoteDisplayProps) => {
  const remoteImages: {[key: string]: string} = {
    'OpenBox': '/lovable-uploads/64b3e7a7-593e-444b-8020-cc0203022c1c.png',
    'HDBox': '/lovable-uploads/6126de2f-146b-46b7-9b74-7f3e24dd4394.png',
    'Uclan': '/lovable-uploads/892127b7-c67e-44b2-a005-f579a19850ca.png'
  };

  const handleButtonClick = (buttonName: string) => {
    // Provide tactile feedback with toast notification
    toast.success(`Нажата кнопка: ${buttonName}`, {
      duration: 1000,
      position: 'bottom-right',
      className: 'bg-black/80 text-white',
    });

    // Handle errors that block most functionality
    if (selectedError === "no_signal" && !["power", "menu", "exit", "search_channels"].includes(buttonName)) {
      toast.error("Нет сигнала. Сначала устраните проблему с сигналом.", {
        duration: 3000,
      });
      onRemoteAction('error', 'no_signal');
      return;
    }

    if (selectedError === "channels_encoded" && ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"].includes(buttonName)) {
      toast.error("Этот канал закодирован. Необходима подписка.", {
        duration: 3000,
      });
      onRemoteAction('error', 'channels_encoded');
      return;
    }

    // Map button names to actions
    switch (buttonName) {
      case "power":
        onRemoteAction('power');
        break;
      case "menu":
        onRemoteAction('menu');
        break;
      case "exit":
        onRemoteAction('exit');
        break;
      case "ok":
        onRemoteAction('ok');
        break;
      case "vol+":
        onRemoteAction('volume', 5);
        break;
      case "vol-":
        onRemoteAction('volume', -5);
        break;
      case "mute":
        onRemoteAction('mute');
        break;
      case "up":
        onRemoteAction('navigate', 'up');
        break;
      case "down":
        onRemoteAction('navigate', 'down');
        break;
      case "left":
        onRemoteAction('navigate', 'left');
        break;
      case "right":
        onRemoteAction('navigate', 'right');
        break;
      case "p+":
      case "ch+":
        onRemoteAction('channel_change', 1);
        break;
      case "p-":
      case "ch-":
        onRemoteAction('channel_change', -1);
        break;
      default:
        // If this is a number button (channel selection)
        if (!isNaN(Number(buttonName))) {
          onRemoteAction('channel', Number(buttonName));
        } else {
          onRemoteAction(buttonName);
        }
    }
  };

  const renderRemote = () => {
    switch (remoteType) {
      case "OpenBox":
        return <OpenBoxRemote onButtonClick={handleButtonClick} />;
      case "HDBox":
        return <HDBoxRemote onButtonClick={handleButtonClick} />;
      case "Uclan":
        return <UclanRemote onButtonClick={handleButtonClick} />;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="bg-black/80 backdrop-blur-sm p-4 rounded-lg shadow-[0_15px_30px_-10px_rgba(0,0,0,0.7)] relative">
        <img 
          src={remoteImages[remoteType]}
          alt={`Пульт ${remoteType}`}
          className="h-auto max-h-96 mx-auto object-contain opacity-90 z-10 relative"
        />
        {renderRemote()}
      </div>
      <div className="mt-4 text-center text-sm">
        <p className="text-white">Выберите кнопку на пульте для управления телевизором</p>
        <p className="text-gray-400 mt-1">Все кнопки активны и реагируют на нажатие</p>
      </div>
    </div>
  );
};

export default RemoteDisplay;
