
import React from 'react';
import { LucideIcon } from 'lucide-react';

interface RemoteButtonProps {
  onClick: () => void;
  className?: string;
  title?: string;
  icon?: LucideIcon;
  children?: React.ReactNode;
}

const RemoteButton = ({ 
  onClick, 
  className = "w-8 h-8 bg-gray-800", 
  title,
  icon: Icon,
  children 
}: RemoteButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`${className} rounded-md flex items-center justify-center text-white shadow hover:brightness-110 active:scale-95 transition-all`}
      title={title}
    >
      {Icon && <Icon size={14} color="white" />}
      {children}
    </button>
  );
};

export default RemoteButton;
