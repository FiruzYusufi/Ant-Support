
import React from 'react';
import { toast } from 'sonner';
import { 
  Power, VolumeX, Volume2, Tv2, Search, Menu, 
  Info, ArrowUp, ArrowDown, ArrowLeft, ArrowRight,
  Play, Pause, SkipBack, SkipForward, Square
} from 'lucide-react';

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
      
      case "epg":
        onRemoteAction('epg');
        break;
        
      case "info":
        onRemoteAction('info');
        break;
        
      case "play":
        onRemoteAction('play');
        break;
        
      case "pause":
        onRemoteAction('pause');
        break;
        
      case "stop":
        onRemoteAction('stop');
        break;
        
      case "rec":
        onRemoteAction('record');
        break;
        
      case "search":
      case "find":
        onRemoteAction('search_channels');
        break;
      
      case "tvradio":
      case "tv/sat":
      case "tvr":
        onRemoteAction('tv_radio_toggle');
        break;
        
      case "aspect":
        onRemoteAction('aspect_ratio');
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

  // Render the specific remote based on type
  const renderRemoteButtons = () => {
    switch (remoteType) {
      case "OpenBox":
        return (
          <div className="absolute inset-0 flex flex-col">
            {/* Power row */}
            <div className="flex justify-between mt-4 mx-4">
              <button
                onClick={() => handleButtonClick("power")}
                className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center shadow-lg hover:brightness-110 active:scale-95 transition-all"
                title="Кнопка питания"
              >
                <Power size={14} color="white" />
              </button>
              
              <button
                onClick={() => handleButtonClick("mute")}
                className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center shadow-lg hover:brightness-110 active:scale-95 transition-all"
                title="Без звука"
              >
                <VolumeX size={14} color="white" />
              </button>
            </div>
            
            {/* Number buttons */}
            <div className="grid grid-cols-3 gap-2 mt-6 mx-4">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
                <button
                  key={num}
                  onClick={() => handleButtonClick(num.toString())}
                  className="w-8 h-8 bg-gray-800 text-white rounded-full flex items-center justify-center shadow hover:brightness-110 active:scale-95 transition-all"
                  title={`Кнопка ${num}`}
                >
                  {num}
                </button>
              ))}
              <button
                onClick={() => handleButtonClick("tvradio")}
                className="w-8 h-8 bg-gray-900 text-white rounded-full flex items-center justify-center text-xs shadow hover:brightness-110 active:scale-95 transition-all"
              >
                TV/R
              </button>
              <button
                onClick={() => handleButtonClick("0")}
                className="w-8 h-8 bg-gray-800 text-white rounded-full flex items-center justify-center shadow hover:brightness-110 active:scale-95 transition-all"
              >
                0
              </button>
              <button
                onClick={() => handleButtonClick("recall")}
                className="w-8 h-8 bg-gray-900 text-white rounded-full flex items-center justify-center text-xs shadow hover:brightness-110 active:scale-95 transition-all"
              >
                ↩
              </button>
            </div>
            
            {/* Menu row */}
            <div className="flex justify-between mt-4 mx-8">
              <button
                onClick={() => handleButtonClick("menu")}
                className="w-12 h-8 bg-gray-900 rounded-full flex items-center justify-center text-white text-xs shadow hover:brightness-110 active:scale-95 transition-all"
              >
                MENU
              </button>
              <button
                onClick={() => handleButtonClick("info")}
                className="w-8 h-8 bg-gray-900 rounded-full flex items-center justify-center text-white text-xs shadow hover:brightness-110 active:scale-95 transition-all"
              >
                i
              </button>
              <button
                onClick={() => handleButtonClick("exit")}
                className="w-12 h-8 bg-gray-900 rounded-full flex items-center justify-center text-white text-xs shadow hover:brightness-110 active:scale-95 transition-all"
              >
                EXIT
              </button>
            </div>
            
            {/* Navigation */}
            <div className="flex flex-col items-center mt-6">
              <div className="w-24 h-24 relative">
                <button
                  onClick={() => handleButtonClick("up")}
                  className="absolute top-0 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-blue-600 text-white flex items-center justify-center hover:brightness-110 active:scale-95 transition-all"
                >
                  <ArrowUp size={18} />
                </button>
                <button
                  onClick={() => handleButtonClick("left")}
                  className="absolute top-1/2 left-0 transform -translate-y-1/2 w-8 h-8 bg-blue-600 text-white flex items-center justify-center hover:brightness-110 active:scale-95 transition-all"
                >
                  <ArrowLeft size={18} />
                </button>
                <button
                  onClick={() => handleButtonClick("ok")}
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-blue-700 text-white rounded-full flex items-center justify-center shadow hover:brightness-110 active:scale-95 transition-all"
                >
                  OK
                </button>
                <button
                  onClick={() => handleButtonClick("right")}
                  className="absolute top-1/2 right-0 transform -translate-y-1/2 w-8 h-8 bg-blue-600 text-white flex items-center justify-center hover:brightness-110 active:scale-95 transition-all"
                >
                  <ArrowRight size={18} />
                </button>
                <button
                  onClick={() => handleButtonClick("down")}
                  className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-blue-600 text-white flex items-center justify-center hover:brightness-110 active:scale-95 transition-all"
                >
                  <ArrowDown size={18} />
                </button>
              </div>
            </div>
            
            {/* Program buttons */}
            <div className="flex justify-between mt-6 mx-4">
              <button
                onClick={() => handleButtonClick("p-")}
                className="w-8 h-8 bg-gray-800 text-white rounded-full flex items-center justify-center text-xs shadow hover:brightness-110 active:scale-95 transition-all"
              >
                P-
              </button>
              <button
                onClick={() => handleButtonClick("p+")}
                className="w-8 h-8 bg-gray-800 text-white rounded-full flex items-center justify-center text-xs shadow hover:brightness-110 active:scale-95 transition-all"
              >
                P+
              </button>
            </div>
            
            {/* Color buttons */}
            <div className="grid grid-cols-4 gap-2 mt-6 mx-4">
              <button
                onClick={() => handleButtonClick("red")}
                className="w-8 h-8 bg-red-600 rounded-full shadow hover:brightness-110 active:scale-95 transition-all"
                title="Красная кнопка"
              ></button>
              <button
                onClick={() => handleButtonClick("green")}
                className="w-8 h-8 bg-green-600 rounded-full shadow hover:brightness-110 active:scale-95 transition-all"
                title="Зеленая кнопка"
              ></button>
              <button
                onClick={() => handleButtonClick("yellow")}
                className="w-8 h-8 bg-yellow-500 rounded-full shadow hover:brightness-110 active:scale-95 transition-all"
                title="Желтая кнопка"
              ></button>
              <button
                onClick={() => handleButtonClick("blue")}
                className="w-8 h-8 bg-blue-600 rounded-full shadow hover:brightness-110 active:scale-95 transition-all"
                title="Синяя кнопка"
              ></button>
            </div>
            
            {/* Bottom buttons */}
            <div className="grid grid-cols-3 gap-2 mt-4 mx-4">
              <button
                onClick={() => handleButtonClick("find")}
                className="w-8 h-8 bg-gray-800 text-white rounded-full flex items-center justify-center text-xs shadow hover:brightness-110 active:scale-95 transition-all"
              >
                FIND
              </button>
              <button
                onClick={() => handleButtonClick("epg")}
                className="w-8 h-8 bg-gray-800 text-white rounded-full flex items-center justify-center text-xs shadow hover:brightness-110 active:scale-95 transition-all"
              >
                EPG
              </button>
              <button
                onClick={() => handleButtonClick("fav")}
                className="w-8 h-8 bg-gray-800 text-white rounded-full flex items-center justify-center text-xs shadow hover:brightness-110 active:scale-95 transition-all"
              >
                FAV
              </button>
            </div>
          </div>
        );
      
      case "HDBox":
        return (
          <div className="absolute inset-0 flex flex-col">
            {/* Top row */}
            <div className="flex justify-between mt-4 mx-4">
              <button
                onClick={() => handleButtonClick("power")}
                className="w-8 h-8 bg-red-600 rounded-md flex items-center justify-center shadow hover:brightness-110 active:scale-95 transition-all"
                title="Кнопка питания"
              >
                <Power size={14} color="white" />
              </button>
              <button
                onClick={() => handleButtonClick("tvradio")}
                className="w-12 h-8 bg-gray-900 rounded-md flex items-center justify-center text-white text-xs shadow hover:brightness-110 active:scale-95 transition-all"
              >
                TV/RADIO
              </button>
              <button
                onClick={() => handleButtonClick("mute")}
                className="w-8 h-8 bg-gray-900 rounded-md flex items-center justify-center text-white text-xs shadow hover:brightness-110 active:scale-95 transition-all"
              >
                <VolumeX size={14} color="white" />
              </button>
            </div>
            
            {/* Number buttons */}
            <div className="grid grid-cols-3 gap-2 mt-6 mx-4">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
                <button
                  key={num}
                  onClick={() => handleButtonClick(num.toString())}
                  className="w-8 h-8 bg-gray-900 rounded-md flex items-center justify-center text-white shadow hover:brightness-110 active:scale-95 transition-all"
                  title={`Кнопка ${num}`}
                >
                  {num}
                </button>
              ))}
              <button
                onClick={() => handleButtonClick("lang")}
                className="w-10 h-8 bg-gray-900 rounded-md flex items-center justify-center text-white text-xs shadow hover:brightness-110 active:scale-95 transition-all"
              >
                LANG
              </button>
              <button
                onClick={() => handleButtonClick("0")}
                className="w-8 h-8 bg-gray-900 rounded-md flex items-center justify-center text-white shadow hover:brightness-110 active:scale-95 transition-all"
              >
                0
              </button>
              <button
                onClick={() => handleButtonClick("list")}
                className="w-10 h-8 bg-gray-900 rounded-md flex items-center justify-center text-white text-xs shadow hover:brightness-110 active:scale-95 transition-all"
              >
                LIST
              </button>
            </div>
            
            {/* Control buttons */}
            <div className="flex justify-between mt-4 mx-6">
              <button
                onClick={() => handleButtonClick("back")}
                className="w-12 h-8 bg-gray-900 rounded-full flex items-center justify-center text-white text-xs shadow hover:brightness-110 active:scale-95 transition-all"
              >
                BACK
              </button>
              <button
                onClick={() => handleButtonClick("info")}
                className="w-12 h-8 bg-gray-900 rounded-full flex items-center justify-center text-white text-xs shadow hover:brightness-110 active:scale-95 transition-all"
              >
                INFO
              </button>
            </div>
            
            <div className="flex justify-between mt-2 mx-6">
              <button
                onClick={() => handleButtonClick("menu")}
                className="w-12 h-8 bg-gray-900 rounded-full flex items-center justify-center text-white text-xs shadow hover:brightness-110 active:scale-95 transition-all"
              >
                MENU
              </button>
              <button
                onClick={() => handleButtonClick("exit")}
                className="w-12 h-8 bg-gray-900 rounded-full flex items-center justify-center text-white text-xs shadow hover:brightness-110 active:scale-95 transition-all"
              >
                EXIT
              </button>
            </div>
            
            {/* Navigation */}
            <div className="flex flex-col items-center mt-4">
              <div className="w-24 h-24 relative">
                <button
                  onClick={() => handleButtonClick("up")}
                  className="absolute top-0 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-gray-700 text-white flex items-center justify-center hover:brightness-110 active:scale-95 transition-all"
                >
                  <ArrowUp size={18} />
                </button>
                <button
                  onClick={() => handleButtonClick("left")}
                  className="absolute top-1/2 left-0 transform -translate-y-1/2 w-8 h-8 bg-gray-700 text-white flex items-center justify-center hover:brightness-110 active:scale-95 transition-all"
                >
                  <ArrowLeft size={18} />
                </button>
                <button
                  onClick={() => handleButtonClick("ok")}
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-gray-900 text-white rounded-full flex items-center justify-center shadow hover:brightness-110 active:scale-95 transition-all"
                >
                  OK
                </button>
                <button
                  onClick={() => handleButtonClick("right")}
                  className="absolute top-1/2 right-0 transform -translate-y-1/2 w-8 h-8 bg-gray-700 text-white flex items-center justify-center hover:brightness-110 active:scale-95 transition-all"
                >
                  <ArrowRight size={18} />
                </button>
                <button
                  onClick={() => handleButtonClick("down")}
                  className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-gray-700 text-white flex items-center justify-center hover:brightness-110 active:scale-95 transition-all"
                >
                  <ArrowDown size={18} />
                </button>
              </div>
            </div>
            
            {/* Colored buttons */}
            <div className="grid grid-cols-4 gap-2 mt-4 mx-4">
              <button
                onClick={() => handleButtonClick("aspect")}
                className="w-10 h-8 bg-red-600 rounded-md flex items-center justify-center text-white text-xs shadow hover:brightness-110 active:scale-95 transition-all"
              >
                ASPECT
              </button>
              <button
                onClick={() => handleButtonClick("epg")}
                className="w-10 h-8 bg-green-600 rounded-md flex items-center justify-center text-white text-xs shadow hover:brightness-110 active:scale-95 transition-all"
              >
                EPG
              </button>
              <button
                onClick={() => handleButtonClick("option")}
                className="w-10 h-8 bg-yellow-500 rounded-md flex items-center justify-center text-white text-xs shadow hover:brightness-110 active:scale-95 transition-all"
              >
                OPTION
              </button>
              <button
                onClick={() => handleButtonClick("sleep")}
                className="w-10 h-8 bg-blue-600 rounded-md flex items-center justify-center text-white text-xs shadow hover:brightness-110 active:scale-95 transition-all"
              >
                SLEEP
              </button>
            </div>
            
            {/* Media buttons */}
            <div className="grid grid-cols-4 gap-2 mt-2 mx-4">
              <button
                onClick={() => handleButtonClick("prev")}
                className="w-8 h-8 bg-gray-800 rounded-md flex items-center justify-center text-white shadow hover:brightness-110 active:scale-95 transition-all"
              >
                <SkipBack size={14} />
              </button>
              <button
                onClick={() => handleButtonClick("play")}
                className="w-8 h-8 bg-gray-800 rounded-md flex items-center justify-center text-white shadow hover:brightness-110 active:scale-95 transition-all"
              >
                <Play size={14} />
              </button>
              <button
                onClick={() => handleButtonClick("pause")}
                className="w-8 h-8 bg-gray-800 rounded-md flex items-center justify-center text-white shadow hover:brightness-110 active:scale-95 transition-all"
              >
                <Pause size={14} />
              </button>
              <button
                onClick={() => handleButtonClick("next")}
                className="w-8 h-8 bg-gray-800 rounded-md flex items-center justify-center text-white shadow hover:brightness-110 active:scale-95 transition-all"
              >
                <SkipForward size={14} />
              </button>
            </div>
          </div>
        );
      
      case "Uclan":
        return (
          <div className="absolute inset-0 flex flex-col">
            {/* Power row */}
            <div className="flex justify-between mt-4 mx-4">
              <button
                onClick={() => handleButtonClick("power")}
                className="w-8 h-8 bg-red-600 rounded-md shadow hover:brightness-110 active:scale-95 transition-all"
                title="Кнопка питания"
              >
                <Power size={14} color="white" className="mx-auto my-auto" />
              </button>
              <button
                onClick={() => handleButtonClick("mute")}
                className="w-8 h-8 bg-gray-900 rounded-md flex items-center justify-center text-white text-xs shadow hover:brightness-110 active:scale-95 transition-all"
                title="Без звука"
              >
                <VolumeX size={14} color="white" />
              </button>
            </div>
            
            {/* Media buttons */}
            <div className="flex justify-between mt-4 mx-4">
              <button
                onClick={() => handleButtonClick("prev")}
                className="w-8 h-8 bg-gray-900 rounded-md flex items-center justify-center text-white text-xs shadow hover:brightness-110 active:scale-95 transition-all"
              >
                <SkipBack size={14} />
              </button>
              <button
                onClick={() => handleButtonClick("rec")}
                className="w-8 h-8 bg-red-600 rounded-md flex items-center justify-center text-white text-xs shadow hover:brightness-110 active:scale-95 transition-all"
              >
                ●
              </button>
              <button
                onClick={() => handleButtonClick("stop")}
                className="w-8 h-8 bg-gray-900 rounded-md flex items-center justify-center text-white text-xs shadow hover:brightness-110 active:scale-95 transition-all"
              >
                <Square size={14} />
              </button>
              <button
                onClick={() => handleButtonClick("next")}
                className="w-8 h-8 bg-gray-900 rounded-md flex items-center justify-center text-white text-xs shadow hover:brightness-110 active:scale-95 transition-all"
              >
                <SkipForward size={14} />
              </button>
            </div>
            
            {/* Color buttons */}
            <div className="grid grid-cols-4 gap-2 mt-4 mx-4">
              <button
                onClick={() => handleButtonClick("audio")}
                className="w-10 h-8 bg-red-500 rounded-md flex items-center justify-center text-white text-xs shadow hover:brightness-110 active:scale-95 transition-all"
              >
                AUDIO
              </button>
              <button
                onClick={() => handleButtonClick("ttx")}
                className="w-10 h-8 bg-green-600 rounded-md flex items-center justify-center text-white text-xs shadow hover:brightness-110 active:scale-95 transition-all"
              >
                TTX
              </button>
              <button
                onClick={() => handleButtonClick("zoom")}
                className="w-10 h-8 bg-yellow-500 rounded-md flex items-center justify-center text-white text-xs shadow hover:brightness-110 active:scale-95 transition-all"
              >
                ZOOM
              </button>
              <button
                onClick={() => handleButtonClick("sub")}
                className="w-10 h-8 bg-blue-600 rounded-md flex items-center justify-center text-white text-xs shadow hover:brightness-110 active:scale-95 transition-all"
              >
                SUB
              </button>
            </div>
            
            {/* Info buttons */}
            <div className="flex justify-between mt-4 mx-8">
              <button
                onClick={() => handleButtonClick("info")}
                className="w-10 h-10 bg-gray-900 rounded-full flex items-center justify-center text-white text-xs shadow hover:brightness-110 active:scale-95 transition-all"
              >
                INFO
              </button>
              <button
                onClick={() => handleButtonClick("recall")}
                className="w-10 h-10 bg-gray-900 rounded-full flex items-center justify-center text-white text-xs shadow hover:brightness-110 active:scale-95 transition-all"
              >
                RECALL
              </button>
            </div>
            
            {/* Navigation */}
            <div className="flex flex-col items-center mt-2">
              <div className="w-24 h-24 relative">
                <button
                  onClick={() => handleButtonClick("up")}
                  className="absolute top-0 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-gray-700 text-white flex items-center justify-center hover:brightness-110 active:scale-95 transition-all"
                >
                  <ArrowUp size={18} />
                </button>
                <button
                  onClick={() => handleButtonClick("left")}
                  className="absolute top-1/2 left-0 transform -translate-y-1/2 w-8 h-8 bg-gray-700 text-white flex items-center justify-center hover:brightness-110 active:scale-95 transition-all"
                >
                  <ArrowLeft size={18} />
                </button>
                <button
                  onClick={() => handleButtonClick("ok")}
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-gray-900 text-white rounded-full flex items-center justify-center shadow-md hover:brightness-110 active:scale-95 transition-all"
                >
                  OK
                </button>
                <button
                  onClick={() => handleButtonClick("right")}
                  className="absolute top-1/2 right-0 transform -translate-y-1/2 w-8 h-8 bg-gray-700 text-white flex items-center justify-center hover:brightness-110 active:scale-95 transition-all"
                >
                  <ArrowRight size={18} />
                </button>
                <button
                  onClick={() => handleButtonClick("down")}
                  className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-gray-700 text-white flex items-center justify-center hover:brightness-110 active:scale-95 transition-all"
                >
                  <ArrowDown size={18} />
                </button>
              </div>
            </div>
            
            {/* Menu/Exit buttons */}
            <div className="flex justify-between mt-2 mx-8">
              <button
                onClick={() => handleButtonClick("menu")}
                className="w-10 h-10 bg-gray-900 rounded-full flex items-center justify-center text-white text-xs shadow hover:brightness-110 active:scale-95 transition-all"
              >
                MENU
              </button>
              <button
                onClick={() => handleButtonClick("exit")}
                className="w-10 h-10 bg-gray-900 rounded-full flex items-center justify-center text-white text-xs shadow hover:brightness-110 active:scale-95 transition-all"
              >
                EXIT
              </button>
            </div>
            
            {/* Volume and feature buttons */}
            <div className="flex justify-around mt-2 mx-4">
              <div className="flex flex-col items-center">
                <button
                  onClick={() => handleButtonClick("vol+")}
                  className="w-8 h-8 bg-gray-900 rounded-t-md flex items-center justify-center text-white text-xs shadow hover:brightness-110 active:scale-95 transition-all"
                >
                  +
                </button>
                <div className="w-8 flex items-center justify-center bg-gray-800 text-white text-xs py-1">
                  VOL
                </div>
                <button
                  onClick={() => handleButtonClick("vol-")}
                  className="w-8 h-8 bg-gray-900 rounded-b-md flex items-center justify-center text-white text-xs shadow hover:brightness-110 active:scale-95 transition-all"
                >
                  -
                </button>
              </div>
              
              <button
                onClick={() => handleButtonClick("fav")}
                className="w-8 h-8 bg-gray-900 rounded-md flex items-center justify-center text-white text-xs shadow hover:brightness-110 active:scale-95 transition-all"
              >
                FAV
              </button>
              
              <div className="flex">
                <button
                  onClick={() => handleButtonClick("play")}
                  className="w-8 h-8 bg-gray-900 rounded-l-md flex items-center justify-center text-white shadow hover:brightness-110 active:scale-95 transition-all"
                >
                  <Play size={14} />
                </button>
                <button
                  onClick={() => handleButtonClick("pause")}
                  className="w-8 h-8 bg-gray-900 rounded-r-md flex items-center justify-center text-white shadow hover:brightness-110 active:scale-95 transition-all"
                >
                  <Pause size={14} />
                </button>
              </div>
            </div>
            
            {/* Number pad */}
            <div className="grid grid-cols-3 gap-2 mt-2 mx-4">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
                <button
                  key={num}
                  onClick={() => handleButtonClick(num.toString())}
                  className="w-8 h-8 bg-gray-900 rounded-md flex items-center justify-center text-white shadow hover:brightness-110 active:scale-95 transition-all"
                  title={`Кнопка ${num}`}
                >
                  {num}
                </button>
              ))}
              <button
                onClick={() => handleButtonClick("tvr")}
                className="w-8 h-8 bg-gray-900 rounded-md flex items-center justify-center text-white text-xs shadow hover:brightness-110 active:scale-95 transition-all"
              >
                TV/R
              </button>
              <button
                onClick={() => handleButtonClick("0")}
                className="w-8 h-8 bg-gray-900 rounded-md flex items-center justify-center text-white shadow hover:brightness-110 active:scale-95 transition-all"
              >
                0
              </button>
              <button
                onClick={() => handleButtonClick("sat")}
                className="w-8 h-8 bg-gray-900 rounded-md flex items-center justify-center text-white text-xs shadow hover:brightness-110 active:scale-95 transition-all"
              >
                SAT
              </button>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="bg-black/5 backdrop-blur-sm p-4 rounded-lg shadow-md relative">
        <img 
          src={remoteImages[remoteType]}
          alt={`Пульт ${remoteType}`}
          className="h-auto max-h-96 mx-auto object-contain opacity-85"
        />
        {renderRemoteButtons()}
      </div>
      <div className="mt-4 text-center text-sm">
        <p>Выберите кнопку на пульте для управления телевизором</p>
        <p className="text-gray-600 mt-1">Все кнопки активны и реагируют на нажатие</p>
      </div>
    </div>
  );
};

export default RemoteDisplay;
