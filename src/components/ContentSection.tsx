
import React from 'react';
import { cn } from '@/lib/utils';

interface ContentSectionProps {
  id: string;
  title: string;
  isActive: boolean;
  children: React.ReactNode;
}

const ContentSection = ({ id, title, isActive, children }: ContentSectionProps) => {
  return (
    <section 
      id={id} 
      className={cn(
        "py-12 transition-all duration-300", 
        isActive ? "opacity-100" : "opacity-0 h-0 overflow-hidden"
      )}
    >
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-6">{title}</h2>
        <div className="animate-fade-in">
          {children}
        </div>
      </div>
    </section>
  );
};

export default ContentSection;
