
import React from 'react';

interface RemoteSelectionProps {
  onSelectRemote: (remoteType: string) => void;
}

const RemoteSelection = ({ onSelectRemote }: RemoteSelectionProps) => {
  return (
    <div id="remote-selection" className="mt-6">
      <h3 className="text-xl font-semibold mb-4">Выберите пульт:</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button 
          onClick={() => onSelectRemote('OpenBox')} 
          className="p-4 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
        >
          OpenBox
        </button>
        <button 
          onClick={() => onSelectRemote('HDBox')} 
          className="p-4 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
        >
          HDBox
        </button>
        <button 
          onClick={() => onSelectRemote('Uclan')} 
          className="p-4 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
        >
          Uclan
        </button>
      </div>
    </div>
  );
};

export default RemoteSelection;
