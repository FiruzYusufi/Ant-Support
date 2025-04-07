
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';

interface WelcomeScreenProps {
  onEnter: () => void;
}

const WelcomeScreen = ({ onEnter }: WelcomeScreenProps) => {
  const [isVisible, setIsVisible] = useState(true);

  const handleEnterClick = () => {
    setIsVisible(false);
    setTimeout(() => {
      onEnter();
    }, 500);
  };

  return (
    <div className={`welcome-overlay fixed inset-0 z-50 flex items-center justify-center bg-background ${isVisible ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
      <div className="text-center max-w-md mx-auto px-4 animate-fade-in">
        <h1 className="text-4xl font-bold text-primary mb-4">Добро пожаловать</h1>
        <p className="text-xl mb-8">Мы рады видеть вас на нашем сайте технической поддержки!</p>
        <Button 
          onClick={handleEnterClick}
          className="bg-primary hover:bg-primary/90 text-white font-medium px-8 py-2 rounded-lg"
        >
          Начать
        </Button>
      </div>
    </div>
  );
};

export default WelcomeScreen;
