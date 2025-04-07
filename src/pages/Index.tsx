
import { useState, useEffect } from 'react';
import NavMenu from '@/components/NavMenu';
import WelcomeScreen from '@/components/WelcomeScreen';
import ContentSection from '@/components/ContentSection';
import HelpSystem from '@/components/HelpSystem';

const Index = () => {
  const [welcomeCompleted, setWelcomeCompleted] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const handleWelcomeComplete = () => {
    setWelcomeCompleted(true);
    localStorage.setItem('hasVisitedBefore', 'true');
  };

  useEffect(() => {
    const isReturningUser = localStorage.getItem('hasVisitedBefore');
    if (isReturningUser) {
      setWelcomeCompleted(true);
    }
  }, []);

  return (
    <div className="min-h-screen">
      {!welcomeCompleted && (
        <WelcomeScreen onEnter={handleWelcomeComplete} />
      )}
      
      {welcomeCompleted && (
        <>
          <NavMenu activeSection={activeSection} onSectionChange={setActiveSection} />
          
          <ContentSection id="home" title="Главная" isActive={activeSection === 'home'}>
            <p className="text-lg">
              Добро пожаловать на сайт технической поддержки. Здесь вы найдете полезную информацию о наших услугах.
            </p>
          </ContentSection>
          
          <ContentSection id="about" title="О нас" isActive={activeSection === 'about'}>
            <p className="text-lg">
              Мы команда специалистов, готовых помочь вам с любыми техническими проблемами.
            </p>
          </ContentSection>
          
          <ContentSection id="services" title="Услуги" isActive={activeSection === 'services'}>
            <HelpSystem />
          </ContentSection>
        </>
      )}
    </div>
  );
};

export default Index;
