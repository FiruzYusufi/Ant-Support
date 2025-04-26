
import React from 'react';
import { getMenuItems } from '@/utils/menuItems';

interface TVMenuProps {
  menuSelection: string;
  menuIndex: number;
}

const TVMenu = ({ menuSelection, menuIndex }: TVMenuProps) => {
  const menuItems = getMenuItems(menuSelection);
  
  return (
    <div className="text-white h-full p-4 overflow-auto">
      <h3 className="text-xl font-bold mb-4">
        {menuSelection === 'main' ? 'Главное меню' : 
        menuSelection === 'channels' ? 'Настройка каналов' :
        menuSelection === 'picture' ? 'Настройка изображения' :
        menuSelection === 'sound' ? 'Настройка звука' :
        menuSelection === 'time' ? 'Настройка времени' : 'Опции системы'}
      </h3>
      
      <ul className="space-y-2">
        {menuItems.map((item, index) => (
          <li 
            key={index} 
            className={`p-2 ${index === menuIndex ? 'bg-blue-700' : 'hover:bg-gray-800'} rounded-md transition-colors duration-150`}
          >
            {item}
          </li>
        ))}
      </ul>
      
      <div className="absolute bottom-4 right-4 text-sm text-gray-400">
        OK - выбрать | EXIT - назад
      </div>
    </div>
  );
};

export default TVMenu;
