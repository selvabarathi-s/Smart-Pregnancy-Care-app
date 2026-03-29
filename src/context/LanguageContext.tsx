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
  'home_welcome_desc': { en: 'Welcome to the Smart Pregnancy Care Platform. Track your pregnancy journey, get health tips, and access services quickly.', ta: 'ஸ்மார்ட் கர்ப்பகால பராமரிப்பு மேடையில் வரவேற்கின்றோம். உங்கள் கர்ப்பகால பயணத்தை கண்காணித்து, சுகாதார குறிப்புகளைப் பெற்று, சேவைகளை விரைவாக அணுகவும்.' },
  'home_login_prompt': { en: 'Register or login to unlock all features.', ta: 'அனைத்து அம்சங்களையும் பயன்படுத்த பதிவு அல்லது உள்நுழைக.' },
  'welcome_back': { en: 'Welcome back,', ta: 'திரும்ப வருக' },
  'safe_card': { en: 'Safe Card', ta: 'பாதுகாப்பு அட்டை' },
  'login': { en: 'Login', ta: 'உள்நுழைவு' },
  'login_hint': { en: 'Tap continue to enter your dashboard.', ta: 'தொடரவும் உங்கள் டாஷ்போர்டிற்கு செல்ல.' },
  'login_no_user': { en: 'No registered account found. Please register first.', ta: 'பதிவு செய்யப்பட்ட கணக்கு இல்லை. தயவுசெய்து முதலில் பதிவு செய்யவும்.' },
  'login_button': { en: 'Continue', ta: 'தொடரவும்' },
  'logout': { en: 'Log out', ta: 'வெளியேறு' },
  'sos_button': { en: 'Send SOS', ta: 'SOS அனுப்பு' },
  'whatsapp_sos': { en: 'Sending WhatsApp and call as backup...', ta: 'WhatsApp அனுப்புகிறது மற்றும் துணை அழைப்பு...' },  
  // Registration
  'name': { en: 'Name', ta: 'பெயர்' },
  'age': { en: 'Age', ta: 'வயது' },
  'pregnancy_week': { en: 'Current Pregnancy Week', ta: 'தற்போதைய கர்ப்ப வாரம்' },
  'husband_contact': { en: 'Husband/Guardian Contact', ta: 'கணவர்/பாதுகாவலர் தொடர்பு' },
  'emergency_contacts': { en: 'Emergency Contacts (3)', ta: 'அவசர கால தொடர்புகள் (3)' },
  'select_language': { en: 'Select Language', ta: 'மொழியைத் தேர்ந்தெடுக்கவும்' },
  'already_registered': { en: 'Already registered?', ta: 'ஏற்கனவே பதிவு செய்துள்ளீர்களா?' },
  
  // Dashboard
  'current_week': { en: 'Current Week', ta: 'தற்போதைய வாரம்' },
  'yoga_exercise': { en: 'Yoga & Exercise', ta: 'யோகா மற்றும் உடற்பயிற்சி' },
  'gov_schemes': { en: 'Govt Schemes', ta: 'அரசு திட்டங்கள்' },
  'mother_baby_care': { en: 'Mother & Baby Care', ta: 'தாய் மற்றும் சேய் பராமரிப்பு' },
  'health_services': { en: 'Health Services', ta: 'சுகாதார சேவைகள்' },
  'daily_tip_title': { en: 'Daily Health Tip', ta: 'தினசரி சுகாதார குறிப்புகள்' },
  
  // SOS
  'sos_desc': { en: 'Press for immediate help', ta: 'உடனடி உதவிக்கு அழுத்தவும்' },
  'sending_sms': { en: 'Sending WhatsApp message with live location...', ta: 'உண்மை நேர இடத்துடன் WhatsApp செய்தி அனுப்புகிறது...' },
  'calling_contacts': { en: 'Calling emergency contacts...', ta: 'அவசர கால தொடர்புகள் அழைக்கப்படுகின்றன...' },
  'location_unavailable': { en: 'Location not available; sending default emergency alert.', ta: 'இடம் கிடைக்கவில்லை; இயல்புநிலை அவசர அறிவிப்பு அனுப்பப்படுகிறது.' },
  'safe_card_desc': { en: 'Your digital safe card contains key personal and emergency information for quick access by health workers.', ta: 'உங்கள் டிஜிட்டல் பாதுகாப்பு அட்டையில் உடனடி அணுகலுக்கான முக்கிய தனிப்பட்ட மற்றும் அவசரத் தகவல்கள் உள்ளன.' },
  'download_report': { en: 'Download QR Report', ta: 'QR அறிக்கையை பதிவிறக்கு' },
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
