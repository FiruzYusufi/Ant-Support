
import React from 'react';
import { Button } from '@/components/ui/button';

interface RemoteSelectionProps {
  onSelectRemote: (remoteType: string) => void;
}

const RemoteSelection = ({ onSelectRemote }: RemoteSelectionProps) => {
  const remotes = [
    { 
      id: 'OpenBox', 
      name: 'OpenBox', 
      image: '/lovable-uploads/64b3e7a7-593e-444b-8020-cc0203022c1c.png',
      description: 'Пульт для спутникового ресивера OpenBox с доступом к 120+ каналам'
    },
    { 
      id: 'HDBox', 
      name: 'HDBox', 
      image: '/lovable-uploads/6126de2f-146b-46b7-9b74-7f3e24dd4394.png',
      description: 'Пульт для цифрового ресивера HDBox с поддержкой HD каналов и медиаплеера'
    },
    { 
      id: 'Uclan', 
      name: 'Uclan', 
      image: '/lovable-uploads/892127b7-c67e-44b2-a005-f579a19850ca.png',
      description: 'Пульт для спутникового ресивера Uclan с расширенными функциями записи'
    },
  ];

  return (
    <div className="mt-6 animate-fade-in">
      <h3 className="text-xl font-semibold mb-6">Выберите пульт:</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {remotes.map((remote) => (
          <div 
            key={remote.id}
            className="bg-black/5 backdrop-blur-sm rounded-lg p-6 shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer border border-gray-200 hover:border-gray-300 transform hover:-translate-y-1"
            onClick={() => onSelectRemote(remote.id)}
          >
            <div className="aspect-[2/3] bg-gray-100 rounded flex items-center justify-center mb-4">
              <img 
                src={remote.image} 
                alt={`Пульт ${remote.name}`} 
                className="max-h-full max-w-full h-60 object-contain"
              />
            </div>
            <h4 className="text-center font-medium text-lg">{remote.name}</h4>
            <p className="text-center text-gray-600 text-sm mt-2">{remote.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RemoteSelection;
