
import React from 'react';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface ErrorMenuProps {
  onSelectError: (errorType: string) => void;
}

const ErrorMenu = ({ onSelectError }: ErrorMenuProps) => {
  return (
    <div className="error-menu p-4 bg-black/10 backdrop-blur-sm rounded-lg shadow-md border border-gray-200">
      <h3 className="text-lg font-medium mb-3 text-gray-800">Выберите ошибку или режим:</h3>
      
      <RadioGroup defaultValue="" onValueChange={onSelectError}>
        <div className="flex items-center space-x-2 mb-2">
          <RadioGroupItem value="" id="no_error" />
          <Label htmlFor="no_error" className="cursor-pointer">Нет ошибки</Label>
        </div>
        
        <div className="flex items-center space-x-2 mb-2">
          <RadioGroupItem value="no_signal" id="no_signal" />
          <Label htmlFor="no_signal" className="cursor-pointer">Нет сигнала</Label>
        </div>
        
        <div className="flex items-center space-x-2 mb-2">
          <RadioGroupItem value="channels_encoded" id="channels_encoded" />
          <Label htmlFor="channels_encoded" className="cursor-pointer">Каналы закодированы</Label>
        </div>
        
        <div className="flex items-center space-x-2 mb-2">
          <RadioGroupItem value="no_channels" id="no_channels" />
          <Label htmlFor="no_channels" className="cursor-pointer">Каналы не настроены</Label>
        </div>
        
        <div className="flex items-center space-x-2 mb-2">
          <RadioGroupItem value="channel_search" id="channel_search" />
          <Label htmlFor="channel_search" className="cursor-pointer">Режим поиска каналов</Label>
        </div>
        
        <div className="flex items-center space-x-2 mb-2">
          <RadioGroupItem value="menu_settings" id="menu_settings" />
          <Label htmlFor="menu_settings" className="cursor-pointer">Меню настроек</Label>
        </div>
        
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="weak_signal" id="weak_signal" />
          <Label htmlFor="weak_signal" className="cursor-pointer">Слабый сигнал</Label>
        </div>
        
        <div className="flex items-center space-x-2 mt-2">
          <RadioGroupItem value="hdmi" id="hdmi" />
          <Label htmlFor="hdmi" className="cursor-pointer">HDMI режим</Label>
        </div>
        
        <div className="flex items-center space-x-2 mt-2">
          <RadioGroupItem value="sleep_timer" id="sleep_timer" />
          <Label htmlFor="sleep_timer" className="cursor-pointer">Таймер сна</Label>
        </div>
      </RadioGroup>
    </div>
  );
};

export default ErrorMenu;
