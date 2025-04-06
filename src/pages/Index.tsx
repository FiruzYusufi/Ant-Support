
import React, { useState, useEffect } from 'react';
import WelcomeScreen from '../components/WelcomeScreen';
import NavMenu from '../components/NavMenu';
import ContentSection from '../components/ContentSection';

const Index = () => {
  const [showWelcome, setShowWelcome] = useState(true);
  const [activeSection, setActiveSection] = useState('home');

  const handleWelcomeComplete = () => {
    setShowWelcome(false);
    localStorage.setItem('hasVisitedBefore', 'true');
  };

  const handleSectionChange = (section: string) => {
    setActiveSection(section);
    // Smooth scroll to section
    document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background">
      {showWelcome && <WelcomeScreen onEnter={handleWelcomeComplete} />}
      
      <div className={`transition-opacity duration-500 ${showWelcome ? 'opacity-0' : 'opacity-100'}`}>
        <NavMenu 
          activeSection={activeSection} 
          onSectionChange={handleSectionChange} 
        />

        <main>
          <ContentSection 
            id="home" 
            title="Главная" 
            isActive={activeSection === 'home'}
          >
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h1 className="text-4xl font-bold mb-4">Добро пожаловать на наш сайт</h1>
                <p className="text-lg text-gray-700 mb-6">
                  Мы рады приветствовать вас на нашем веб-сайте. Здесь вы найдете всю необходимую информацию о наших услугах и предложениях.
                </p>
                <button 
                  onClick={() => handleSectionChange('services')}
                  className="bg-primary hover:bg-primary/90 text-white font-medium px-6 py-2 rounded-lg"
                >
                  Наши услуги
                </button>
              </div>
              <div className="bg-gray-200 h-64 rounded-lg flex items-center justify-center">
                <span className="text-gray-500">Изображение</span>
              </div>
            </div>
          </ContentSection>

          <ContentSection 
            id="about" 
            title="О нас" 
            isActive={activeSection === 'about'}
          >
            <div className="prose max-w-none">
              <p className="text-lg mb-4">
                Наша компания была основана с целью предоставления высококачественных услуг нашим клиентам.
              </p>
              <p className="text-lg mb-4">
                Мы специализируемся на предоставлении инновационных решений, которые помогают нашим клиентам достигать своих целей.
              </p>
              <p className="text-lg">
                Наша команда состоит из опытных профессионалов, готовых помочь вам в решении ваших задач.
              </p>
            </div>
          </ContentSection>

          <ContentSection 
            id="services" 
            title="Наши услуги" 
            isActive={activeSection === 'services'}
          >
            <div className="grid md:grid-cols-3 gap-6">
              {[1, 2, 3].map((item) => (
                <div key={item} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                  <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mb-4">
                    <div className="w-6 h-6 bg-primary rounded-full"></div>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Услуга {item}</h3>
                  <p className="text-gray-600">
                    Описание услуги, которую мы предлагаем. Здесь можно добавить подробную информацию о том, что включает в себя данная услуга.
                  </p>
                </div>
              ))}
            </div>
          </ContentSection>
        </main>

        <footer className="bg-gray-800 text-white py-8 mt-12">
          <div className="container mx-auto px-4 text-center">
            <p>&copy; 2025. Все права защищены.</p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Index;
