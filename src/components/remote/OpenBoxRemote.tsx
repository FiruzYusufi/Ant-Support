
import React from 'react';
import { Power, VolumeX, ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from 'lucide-react';
import RemoteButton from './RemoteButton';

interface OpenBoxRemoteProps {
  onButtonClick: (buttonName: string) => void;
}

const OpenBoxRemote = ({ onButtonClick }: OpenBoxRemoteProps) => {
  return (
    <div className="absolute inset-0 flex flex-col">
      {/* Power row */}
      <div className="flex justify-between mt-4 mx-4">
        <RemoteButton
          onClick={() => onButtonClick("power")}
          className="w-8 h-8 bg-red-600 rounded-full"
          title="Кнопка питания"
          icon={Power}
        />
        <RemoteButton
          onClick={() => onButtonClick("mute")}
          className="w-8 h-8 bg-gray-800 rounded-full"
          title="Без звука"
          icon={VolumeX}
        />
      </div>

      {/* Number buttons */}
      <div className="grid grid-cols-3 gap-2 mt-6 mx-4">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
          <RemoteButton
            key={num}
            onClick={() => onButtonClick(num.toString())}
            title={`Кнопка ${num}`}
          >
            {num}
          </RemoteButton>
        ))}
        <RemoteButton onClick={() => onButtonClick("tvradio")} className="w-8 h-8 bg-gray-900">
          TV/R
        </RemoteButton>
        <RemoteButton onClick={() => onButtonClick("0")}>0</RemoteButton>
        <RemoteButton onClick={() => onButtonClick("recall")} className="w-8 h-8 bg-gray-900">
          ↩
        </RemoteButton>
      </div>

      {/* Navigation */}
      <div className="flex flex-col items-center mt-6">
        <div className="w-24 h-24 relative">
          <RemoteButton
            onClick={() => onButtonClick("up")}
            className="absolute top-0 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-blue-600"
            icon={ArrowUp}
          />
          <RemoteButton
            onClick={() => onButtonClick("left")}
            className="absolute top-1/2 left-0 transform -translate-y-1/2 w-8 h-8 bg-blue-600"
            icon={ArrowLeft}
          />
          <RemoteButton
            onClick={() => onButtonClick("ok")}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-blue-700 rounded-full"
          >
            OK
          </RemoteButton>
          <RemoteButton
            onClick={() => onButtonClick("right")}
            className="absolute top-1/2 right-0 transform -translate-y-1/2 w-8 h-8 bg-blue-600"
            icon={ArrowRight}
          />
          <RemoteButton
            onClick={() => onButtonClick("down")}
            className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-blue-600"
            icon={ArrowDown}
          />
        </div>
      </div>

      {/* Color buttons */}
      <div className="grid grid-cols-4 gap-2 mt-6 mx-4">
        {["red", "green", "yellow", "blue"].map((color) => (
          <RemoteButton
            key={color}
            onClick={() => onButtonClick(color)}
            className={`w-8 h-8 bg-${color === "red" ? "red-600" : color === "green" ? "green-600" : color === "yellow" ? "yellow-500" : "blue-600"} rounded-full`}
            title={`${color.charAt(0).toUpperCase() + color.slice(1)} кнопка`}
          />
        ))}
      </div>
    </div>
  );
};

export default OpenBoxRemote;
