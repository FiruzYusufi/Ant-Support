
import React from 'react';
import { Power, VolumeX, ArrowUp, ArrowDown, ArrowLeft, ArrowRight, Play, Pause, SkipBack, SkipForward, Square } from 'lucide-react';
import RemoteButton from './RemoteButton';

interface UclanRemoteProps {
  onButtonClick: (buttonName: string) => void;
}

const UclanRemote = ({ onButtonClick }: UclanRemoteProps) => {
  return (
    <div className="absolute inset-0 flex flex-col">
      {/* Power row */}
      <div className="flex justify-between mt-4 mx-4">
        <RemoteButton
          onClick={() => onButtonClick("power")}
          className="w-8 h-8 bg-red-600"
          title="Кнопка питания"
          icon={Power}
        />
        <RemoteButton
          onClick={() => onButtonClick("mute")}
          className="w-8 h-8 bg-gray-900"
          title="Без звука"
          icon={VolumeX}
        />
      </div>

      {/* Media buttons */}
      <div className="flex justify-between mt-4 mx-4">
        <RemoteButton onClick={() => onButtonClick("prev")} icon={SkipBack} />
        <RemoteButton onClick={() => onButtonClick("rec")} className="w-8 h-8 bg-red-600">●</RemoteButton>
        <RemoteButton onClick={() => onButtonClick("stop")} icon={Square} />
        <RemoteButton onClick={() => onButtonClick("next")} icon={SkipForward} />
      </div>

      {/* Navigation */}
      <div className="flex flex-col items-center mt-4">
        <div className="w-24 h-24 relative">
          <RemoteButton
            onClick={() => onButtonClick("up")}
            className="absolute top-0 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-gray-700"
            icon={ArrowUp}
          />
          <RemoteButton
            onClick={() => onButtonClick("left")}
            className="absolute top-1/2 left-0 transform -translate-y-1/2 w-8 h-8 bg-gray-700"
            icon={ArrowLeft}
          />
          <RemoteButton
            onClick={() => onButtonClick("ok")}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-gray-900 rounded-full"
          >
            OK
          </RemoteButton>
          <RemoteButton
            onClick={() => onButtonClick("right")}
            className="absolute top-1/2 right-0 transform -translate-y-1/2 w-8 h-8 bg-gray-700"
            icon={ArrowRight}
          />
          <RemoteButton
            onClick={() => onButtonClick("down")}
            className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-gray-700"
            icon={ArrowDown}
          />
        </div>
      </div>
    </div>
  );
};

export default UclanRemote;
