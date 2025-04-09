
import React from 'react';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface ErrorMenuProps {
  onSelectError: (errorType: string) => void;
}

const ErrorMenu = ({ onSelectError }: ErrorMenuProps) => {
  return (
    <div className="error-menu p-4 bg-white rounded-lg shadow-md">
      <h3 className="text-lg font-medium mb-3">Выберите ошибку или режим:</h3>
      
      <RadioGroup defaultValue="" onValueChange={onSelectError}>
        <div className="flex items-center space-x-2 mb-2">
          <RadioGroupItem value="" id="no_error" />
          <Label htmlFor="no_error">Нет ошибки</Label>
        </div>
        
        <div className="flex items-center space-x-2 mb-2">
          <RadioGroupItem value="no_signal" id="no_signal" />
          <Label htmlFor="no_signal">Нет сигнала</Label>
        </div>
        
        <div className="flex items-center space-x-2 mb-2">
          <RadioGroupItem value="channels_encoded" id="channels_encoded" />
          <Label htmlFor="channels_encoded">Каналы закодированы</Label>
        </div>
        
        <div className="flex items-center space-x-2 mb-2">
          <RadioGroupItem value="no_channels" id="no_channels" />
          <Label htmlFor="no_channels">Каналы не настроены</Label>
        </div>
        
        <div className="flex items-center space-x-2 mb-2">
          <RadioGroupItem value="channel_search" id="channel_search" />
          <Label htmlFor="channel_search">Режим поиска каналов</Label>
        </div>
        
        <div className="flex items-center space-x-2 mb-2">
          <RadioGroupItem value="menu_settings" id="menu_settings" />
          <Label htmlFor="menu_settings">Меню настроек</Label>
        </div>
        
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="weak_signal" id="weak_signal" />
          <Label htmlFor="weak_signal">Слабый сигнал</Label>
        </div>
      </RadioGroup>
    </div>
  );
};

export default ErrorMenu;
