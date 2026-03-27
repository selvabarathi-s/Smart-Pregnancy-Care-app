import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language } from '../types';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<string, Record<Language, string>> = {
  // Common
  'app_title': { en: 'Smart Pregnancy Care', ta: 'ஸ்மார்ட் கர்ப்பகால பராமரிப்பு' },
  'sos': { en: 'SOS - Emergency', ta: 'SOS - அவசரநிலை' },
  'dashboard': { en: 'Dashboard', ta: 'முகப்பு' },
  'registration': { en: 'Registration', ta: 'பதிவு' },
  'save': { en: 'Save', ta: 'சேமி' },
  'loading': { en: 'Loading...', ta: 'ஏற்றுகிறது...' },
  
  // Registration
  'name': { en: 'Name', ta: 'பெயர்' },
  'age': { en: 'Age', ta: 'வயது' },
  'pregnancy_week': { en: 'Current Pregnancy Week', ta: 'தற்போதைய கர்ப்ப வாரம்' },
  'husband_contact': { en: 'Husband/Guardian Contact', ta: 'கணவர்/பாதுகாவலர் தொடர்பு' },
  'emergency_contacts': { en: 'Emergency Contacts (3)', ta: 'அவசர கால தொடர்புகள் (3)' },
  'select_language': { en: 'Select Language', ta: 'மொழியைத் தேர்ந்தெடுக்கவும்' },
  
  // Dashboard
  'current_week': { en: 'Current Week', ta: 'தற்போதைய வாரம்' },
  'yoga_exercise': { en: 'Yoga & Exercise', ta: 'யோகா மற்றும் உடற்பயிற்சி' },
  'gov_schemes': { en: 'Govt Schemes', ta: 'அரசு திட்டங்கள்' },
  'mother_baby_care': { en: 'Mother & Baby Care', ta: 'தாய் மற்றும் சேய் பராமரிப்பு' },
  'health_services': { en: 'Health Services', ta: 'சுகாதார சேவைகள்' },
  
  // SOS
  'sos_desc': { en: 'Press for immediate help', ta: 'உடனடி உதவிக்கு அழுத்தவும்' },
  'sending_sms': { en: 'Sending SMS with location...', ta: 'இருப்பிடத்துடன் SMS அனுப்பப்படுகிறது...' },
  'calling_contacts': { en: 'Calling emergency contacts...', ta: 'அவசர கால தொடர்புகள் அழைக்கப்படுகின்றன...' },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('app_language');
    return (saved as Language) || 'en';
  });

  useEffect(() => {
    localStorage.setItem('app_language', language);
  }, [language]);

  const t = (key: string) => {
    return translations[key]?.[language] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within LanguageProvider');
  return context;
};
