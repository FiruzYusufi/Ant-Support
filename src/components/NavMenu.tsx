
import React, { useState } from 'react';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface NavMenuProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const NavMenu = ({ activeSection, onSectionChange }: NavMenuProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { id: 'home', label: 'Главная' },
    { id: 'about', label: 'О нас' },
    { id: 'services', label: 'Услуги' }
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white shadow-md py-4 sticky top-0 z-10">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <div className="text-primary font-bold text-2xl">Logo</div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button variant="ghost" onClick={toggleMenu}>
              <Menu />
            </Button>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            {menuItems.map(item => (
              <button
                key={item.id}
                onClick={() => onSectionChange(item.id)}
                className={cn(
                  "menu-item font-medium",
                  activeSection === item.id ? "text-primary" : "text-gray-600 hover:text-primary"
                )}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 animate-slide-up">
            <div className="flex flex-col space-y-4 py-2">
              {menuItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => {
                    onSectionChange(item.id);
                    setIsMenuOpen(false);
                  }}
                  className={cn(
                    "menu-item font-medium py-2",
                    activeSection === item.id ? "text-primary" : "text-gray-600 hover:text-primary"
                  )}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavMenu;
