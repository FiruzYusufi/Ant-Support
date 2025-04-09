
import React, { useState } from 'react';
import { toast } from 'sonner';

interface RemoteDisplayProps {
  remoteType: string;
  selectedError: string;
}

const RemoteDisplay = ({ remoteType, selectedError }: RemoteDisplayProps) => {
  const [tvMessage, setTvMessage] = useState<string | null>(null);
  const [powerState, setPowerState] = useState<boolean>(true);
  const [channel, setChannel] = useState<number>(1);
  const [volume, setVolume] = useState<number>(50);
  const [showMenu, setShowMenu] = useState<boolean>(false);
  
  const remoteImages: {[key: string]: string} = {
    'OpenBox': '/images/openbox.jpg',
    'HDBox': '/images/hdbox.jpg',
    'Uclan': '/images/uclan.jpg'
  };

  const remoteInstructions: {[key: string]: string} = {
    'OpenBox': "Используйте красные и цветные кнопки для доступа к специальным функциям. Нажмите OK для выбора канала.",
    'HDBox': "На пульте HDBox нажмите 'MENU' для доступа к настройкам или используйте цифры для выбора канала.",
    'Uclan': "Пульт Uclan позволяет быстро перенастроить каналы через кнопки навигации и меню."
  };

  const handleButtonClick = (buttonName: string) => {
    // Если выбрана ошибка "Нет сигнала", большинство кнопок не будут работать
    if (selectedError === "no_signal" && !["power", "menu", "exit"].includes(buttonName)) {
      setTvMessage("Нет сигнала");
      toast("Нет сигнала. Сначала устраните проблему с сигналом.");
      return;
    }

    // Если выбрана ошибка "Каналы закодированы", некоторые функции будут ограничены
    if (selectedError === "channels_encoded" && ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"].includes(buttonName)) {
      setTvMessage("Канал закодирован");
      toast("Этот канал закодирован. Необходима подписка.");
      return;
    }

    // Обработка кнопок в зависимости от их функции
    switch (buttonName) {
      case "power":
        setPowerState(!powerState);
        setTvMessage(powerState ? "Выключение..." : "Включение...");
        toast(powerState ? "ТВ выключается" : "ТВ включается");
        setTimeout(() => setTvMessage(null), 2000);
        break;
      
      case "menu":
        setShowMenu(!showMenu);
        setTvMessage(showMenu ? null : "Меню");
        break;
      
      case "exit":
        setShowMenu(false);
        setTvMessage(null);
        toast("Выход из меню");
        break;
      
      case "ok":
        toast("Подтверждено");
        break;
      
      case "vol+":
        if (volume < 100) {
          setVolume(volume + 5);
          setTvMessage(`Громкость: ${volume + 5}`);
          setTimeout(() => setTvMessage(null), 1500);
        }
        break;
      
      case "vol-":
        if (volume > 0) {
          setVolume(volume - 5);
          setTvMessage(`Громкость: ${volume - 5}`);
          setTimeout(() => setTvMessage(null), 1500);
        }
        break;
      
      case "p+":
      case "ch+":
        setChannel(channel + 1);
        setTvMessage(`Канал: ${channel + 1}`);
        setTimeout(() => setTvMessage(null), 1500);
        break;
      
      case "p-":
      case "ch-":
        if (channel > 1) {
          setChannel(channel - 1);
          setTvMessage(`Канал: ${channel - 1}`);
          setTimeout(() => setTvMessage(null), 1500);
        }
        break;
      
      case "epg":
        setTvMessage("Программа передач");
        toast("Открыта программа передач");
        break;
      
      default:
        // Если это цифровая кнопка
        if (!isNaN(Number(buttonName))) {
          setChannel(Number(buttonName));
          setTvMessage(`Канал: ${buttonName}`);
          setTimeout(() => setTvMessage(null), 1500);
        } else {
          toast(`Нажата кнопка: ${buttonName}`);
        }
    }
  };

  // Рендеринг кнопок в зависимости от типа пульта
  const renderRemoteButtons = () => {
    switch (remoteType) {
      case "OpenBox":
        return (
          <div className="absolute inset-0 flex flex-col">
            <div className="flex justify-between mt-4 mx-4">
              <button
                onClick={() => handleButtonClick("power")}
                className="w-8 h-8 bg-red-600 rounded-full"
                title="Кнопка питания"
              ></button>
              <button
                onClick={() => handleButtonClick("mute")}
                className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center text-xs"
                title="Без звука"
              >OK</button>
            </div>
            
            <div className="grid grid-cols-3 gap-2 mt-6 mx-4">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
                <button
                  key={num}
                  onClick={() => handleButtonClick(num.toString())}
                  className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center"
                  title={`Кнопка ${num}`}
                >
                  {num}
                </button>
              ))}
              <button
                onClick={() => handleButtonClick("back")}
                className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-xs"
              >
                Б/П
              </button>
              <button
                onClick={() => handleButtonClick("0")}
                className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center"
              >
                0
              </button>
              <button
                onClick={() => handleButtonClick("recall")}
                className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-xs"
              >
                ↩
              </button>
            </div>
            
            <div className="flex justify-between mt-4 mx-8">
              <button
                onClick={() => handleButtonClick("menu")}
                className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center text-white text-xs"
              >
                MENU
              </button>
              <button
                onClick={() => handleButtonClick("info")}
                className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center text-white text-xs"
              >
                i
              </button>
              <button
                onClick={() => handleButtonClick("exit")}
                className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center text-white text-xs"
              >
                EXIT
              </button>
            </div>
            
            <div className="flex flex-col items-center mt-6">
              <div className="w-24 h-24 relative">
                <button
                  onClick={() => handleButtonClick("up")}
                  className="absolute top-0 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-blue-500 text-white flex items-center justify-center"
                >
                  ▲
                </button>
                <button
                  onClick={() => handleButtonClick("left")}
                  className="absolute top-1/2 left-0 transform -translate-y-1/2 w-8 h-8 bg-blue-500 text-white flex items-center justify-center"
                >
                  ◀
                </button>
                <button
                  onClick={() => handleButtonClick("ok")}
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center"
                >
                  OK
                </button>
                <button
                  onClick={() => handleButtonClick("right")}
                  className="absolute top-1/2 right-0 transform -translate-y-1/2 w-8 h-8 bg-blue-500 text-white flex items-center justify-center"
                >
                  ▶
                </button>
                <button
                  onClick={() => handleButtonClick("down")}
                  className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-blue-500 text-white flex items-center justify-center"
                >
                  ▼
                </button>
              </div>
            </div>
            
            <div className="flex justify-between mt-6 mx-4">
              <button
                onClick={() => handleButtonClick("p-")}
                className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center text-xs"
              >
                P-
              </button>
              <button
                onClick={() => handleButtonClick("p+")}
                className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center text-xs"
              >
                P+
              </button>
            </div>
            
            <div className="grid grid-cols-4 gap-2 mt-6 mx-4">
              <button
                onClick={() => handleButtonClick("red")}
                className="w-8 h-8 bg-red-600 rounded-full"
                title="Красная кнопка"
              ></button>
              <button
                onClick={() => handleButtonClick("green")}
                className="w-8 h-8 bg-green-600 rounded-full"
                title="Зеленая кнопка"
              ></button>
              <button
                onClick={() => handleButtonClick("yellow")}
                className="w-8 h-8 bg-yellow-500 rounded-full"
                title="Желтая кнопка"
              ></button>
              <button
                onClick={() => handleButtonClick("blue")}
                className="w-8 h-8 bg-blue-600 rounded-full"
                title="Синяя кнопка"
              ></button>
            </div>
          </div>
        );
      
      case "HDBox":
        return (
          <div className="absolute inset-0 flex flex-col">
            <div className="flex justify-between mt-4 mx-4">
              <button
                onClick={() => handleButtonClick("power")}
                className="w-8 h-8 bg-red-600 rounded-full"
                title="Кнопка питания"
              ></button>
              <button
                onClick={() => handleButtonClick("tvradio")}
                className="w-12 h-8 bg-gray-700 rounded-md flex items-center justify-center text-white text-xs"
              >
                TV/RADIO
              </button>
              <button
                onClick={() => handleButtonClick("mute")}
                className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center text-white text-xs"
              >
                OK
              </button>
            </div>
            
            <div className="grid grid-cols-3 gap-2 mt-6 mx-4">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
                <button
                  key={num}
                  onClick={() => handleButtonClick(num.toString())}
                  className="w-8 h-8 bg-gray-800 rounded-md flex items-center justify-center text-white"
                  title={`Кнопка ${num}`}
                >
                  {num}
                </button>
              ))}
              <button
                onClick={() => handleButtonClick("lang")}
                className="w-10 h-8 bg-gray-800 rounded-md flex items-center justify-center text-white text-xs"
              >
                LANG
              </button>
              <button
                onClick={() => handleButtonClick("0")}
                className="w-8 h-8 bg-gray-800 rounded-md flex items-center justify-center text-white"
              >
                0
              </button>
              <button
                onClick={() => handleButtonClick("list")}
                className="w-10 h-8 bg-gray-800 rounded-md flex items-center justify-center text-white text-xs"
              >
                LIST
              </button>
            </div>
            
            <div className="flex justify-between mt-4 mx-6">
              <button
                onClick={() => handleButtonClick("back")}
                className="w-12 h-8 bg-gray-900 rounded-full flex items-center justify-center text-white text-xs"
              >
                BACK
              </button>
              <button
                onClick={() => handleButtonClick("info")}
                className="w-12 h-8 bg-gray-900 rounded-full flex items-center justify-center text-white text-xs"
              >
                INFO
              </button>
            </div>
            
            <div className="flex justify-between mt-2 mx-6">
              <button
                onClick={() => handleButtonClick("menu")}
                className="w-12 h-8 bg-gray-900 rounded-full flex items-center justify-center text-white text-xs"
              >
                MENU
              </button>
              <button
                onClick={() => handleButtonClick("exit")}
                className="w-12 h-8 bg-gray-900 rounded-full flex items-center justify-center text-white text-xs"
              >
                EXIT
              </button>
            </div>
            
            <div className="flex flex-col items-center mt-4">
              <div className="w-24 h-24 relative">
                <button
                  onClick={() => handleButtonClick("up")}
                  className="absolute top-0 left-1/2 transform -translate-x-1/2 w-8 h-8 text-white flex items-center justify-center"
                >
                  ▲
                </button>
                <button
                  onClick={() => handleButtonClick("left")}
                  className="absolute top-1/2 left-0 transform -translate-y-1/2 w-8 h-8 text-white flex items-center justify-center"
                >
                  ◀
                </button>
                <button
                  onClick={() => handleButtonClick("ok")}
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-gray-900 text-white rounded-full flex items-center justify-center"
                >
                  OK
                </button>
                <button
                  onClick={() => handleButtonClick("right")}
                  className="absolute top-1/2 right-0 transform -translate-y-1/2 w-8 h-8 text-white flex items-center justify-center"
                >
                  ▶
                </button>
                <button
                  onClick={() => handleButtonClick("down")}
                  className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 h-8 text-white flex items-center justify-center"
                >
                  ▼
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-4 gap-2 mt-6 mx-4">
              <button
                onClick={() => handleButtonClick("aspect")}
                className="w-10 h-8 bg-red-600 rounded-md flex items-center justify-center text-white text-xs"
              >
                ASPECT
              </button>
              <button
                onClick={() => handleButtonClick("epg")}
                className="w-10 h-8 bg-green-600 rounded-md flex items-center justify-center text-white text-xs"
              >
                EPG
              </button>
              <button
                onClick={() => handleButtonClick("option")}
                className="w-10 h-8 bg-yellow-500 rounded-md flex items-center justify-center text-white text-xs"
              >
                OPTION
              </button>
              <button
                onClick={() => handleButtonClick("sleep")}
                className="w-10 h-8 bg-blue-600 rounded-md flex items-center justify-center text-white text-xs"
              >
                SLEEP
              </button>
            </div>
          </div>
        );
      
      case "Uclan":
        return (
          <div className="absolute inset-0 flex flex-col">
            <div className="flex justify-between mt-4 mx-4">
              <button
                onClick={() => handleButtonClick("power")}
                className="w-8 h-8 bg-red-600 rounded-md"
                title="Кнопка питания"
              ></button>
              <button
                onClick={() => handleButtonClick("mute")}
                className="w-8 h-8 bg-gray-800 rounded-md flex items-center justify-center text-white text-xs"
                title="Без звука"
              >
                🔊
              </button>
            </div>
            
            <div className="flex justify-between mt-4 mx-4">
              <button
                onClick={() => handleButtonClick("prev")}
                className="w-8 h-8 bg-gray-800 rounded-md flex items-center justify-center text-white text-xs"
              >
                ◀◀
              </button>
              <button
                onClick={() => handleButtonClick("rec")}
                className="w-8 h-8 bg-red-600 rounded-md flex items-center justify-center text-white text-xs"
              >
                ●
              </button>
              <button
                onClick={() => handleButtonClick("stop")}
                className="w-8 h-8 bg-gray-800 rounded-md flex items-center justify-center text-white text-xs"
              >
                ■
              </button>
              <button
                onClick={() => handleButtonClick("next")}
                className="w-8 h-8 bg-gray-800 rounded-md flex items-center justify-center text-white text-xs"
              >
                ▶▶
              </button>
            </div>
            
            <div className="grid grid-cols-4 gap-2 mt-4 mx-4">
              <button
                onClick={() => handleButtonClick("audio")}
                className="w-10 h-8 bg-red-500 rounded-md flex items-center justify-center text-white text-xs"
              >
                AUDIO
              </button>
              <button
                onClick={() => handleButtonClick("ttx")}
                className="w-10 h-8 bg-green-600 rounded-md flex items-center justify-center text-white text-xs"
              >
                TTX
              </button>
              <button
                onClick={() => handleButtonClick("zoom")}
                className="w-10 h-8 bg-yellow-500 rounded-md flex items-center justify-center text-white text-xs"
              >
                ZOOM
              </button>
              <button
                onClick={() => handleButtonClick("sub")}
                className="w-10 h-8 bg-blue-600 rounded-md flex items-center justify-center text-white text-xs"
              >
                SUB
              </button>
            </div>
            
            <div className="flex justify-between mt-4 mx-8">
              <button
                onClick={() => handleButtonClick("info")}
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-white text-xs"
              >
                INFO
              </button>
              <button
                onClick={() => handleButtonClick("recall")}
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-white text-xs"
              >
                RECALL
              </button>
            </div>
            
            <div className="flex flex-col items-center mt-2">
              <div className="w-24 h-24 relative">
                <button
                  onClick={() => handleButtonClick("up")}
                  className="absolute top-0 left-1/2 transform -translate-x-1/2 w-8 h-8 text-white flex items-center justify-center"
                >
                  ▲
                </button>
                <button
                  onClick={() => handleButtonClick("left")}
                  className="absolute top-1/2 left-0 transform -translate-y-1/2 w-8 h-8 text-white flex items-center justify-center"
                >
                  ◀
                </button>
                <button
                  onClick={() => handleButtonClick("ok")}
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-gray-900 text-white rounded-full flex items-center justify-center"
                >
                  OK
                </button>
                <button
                  onClick={() => handleButtonClick("right")}
                  className="absolute top-1/2 right-0 transform -translate-y-1/2 w-8 h-8 text-white flex items-center justify-center"
                >
                  ▶
                </button>
                <button
                  onClick={() => handleButtonClick("down")}
                  className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 h-8 text-white flex items-center justify-center"
                >
                  ▼
                </button>
              </div>
            </div>
            
            <div className="flex justify-between mt-2 mx-8">
              <button
                onClick={() => handleButtonClick("menu")}
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-white text-xs"
              >
                MENU
              </button>
              <button
                onClick={() => handleButtonClick("exit")}
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-white text-xs"
              >
                EXIT
              </button>
            </div>
            
            <div className="grid grid-cols-3 gap-y-2 gap-x-4 mt-4 mx-auto">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
                <button
                  key={num}
                  onClick={() => handleButtonClick(num.toString())}
                  className="w-8 h-8 bg-gray-800 rounded-md flex items-center justify-center text-white"
                  title={`Кнопка ${num}`}
                >
                  {num}
                </button>
              ))}
              <button
                onClick={() => handleButtonClick("tvr")}
                className="w-8 h-8 bg-gray-800 rounded-md flex items-center justify-center text-white text-xs"
              >
                TV/R
              </button>
              <button
                onClick={() => handleButtonClick("0")}
                className="w-8 h-8 bg-gray-800 rounded-md flex items-center justify-center text-white"
              >
                0
              </button>
              <button
                onClick={() => handleButtonClick("sat")}
                className="w-8 h-8 bg-gray-800 rounded-md flex items-center justify-center text-white text-xs"
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
      <div className="bg-white p-4 rounded-lg shadow-md relative">
        <img 
          src={remoteImages[remoteType]}
          alt={`Пульт ${remoteType}`}
          className="h-auto max-h-96 mx-auto object-contain opacity-75"
        />
        {renderRemoteButtons()}
      </div>
      <p className="mt-4 text-center text-sm">{remoteInstructions[remoteType]}</p>
    </div>
  );
};

export default RemoteDisplay;
