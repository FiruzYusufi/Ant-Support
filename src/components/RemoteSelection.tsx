
import React from 'react';
import { Button } from '@/components/ui/button';

interface RemoteSelectionProps {
  onSelectRemote: (remoteType: string) => void;
}

const RemoteSelection = ({ onSelectRemote }: RemoteSelectionProps) => {
  const remotes = [
    { id: 'OpenBox', name: 'OpenBox', image: '/images/openbox.jpg' },
    { id: 'HDBox', name: 'HDBox', image: '/images/hdbox.jpg' },
    { id: 'Uclan', name: 'Uclan', image: '/images/uclan.jpg' },
  ];

  return (
    <div className="mt-6 animate-fade-in">
      <h3 className="text-xl font-semibold mb-6">Выберите пульт:</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {remotes.map((remote) => (
          <div 
            key={remote.id}
            className="bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => onSelectRemote(remote.id)}
          >
            <div className="aspect-[2/3] bg-gray-100 rounded flex items-center justify-center mb-3">
              <img 
                src={remote.image} 
                alt={`Пульт ${remote.name}`} 
                className="max-h-full max-w-full object-contain"
              />
            </div>
            <h4 className="text-center font-medium">{remote.name}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RemoteSelection;
