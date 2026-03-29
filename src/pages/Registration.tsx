import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useUser } from '../context/UserContext';
import { UserData, Language } from '../types';
import { useNavigate } from 'react-router-dom';

export const Registration: React.FC = () => {
  const { t, setLanguage, language } = useLanguage();
  const { registerUser } = useUser();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<Partial<UserData>>({
    language: language,
    emergencyContacts: ['', '', '']
  });

  const handleSave = () => {
    if (formData.name && formData.age && formData.initialWeek) {
      const fullData: UserData = {
        ...formData as UserData,
        registrationDate: new Date().toISOString(),
        language: language
      };
      registerUser(fullData);
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-pink-50 p-6 font-sans">
      <h1 className="text-3xl font-bold text-pink-600 mb-8 text-center">{t('registration')}</h1>
      
      <div className="space-y-6 max-w-md mx-auto bg-white p-8 rounded-3xl shadow-xl">
        {/* Language Selection */}
        <div>
          <label className="block text-sm font-semibold text-gray-600 mb-2">{t('select_language')}</label>
          <div className="flex gap-4">
            <button 
              onClick={() => setLanguage('en')}
              className={`flex-1 py-3 rounded-xl border-2 transition-all ${language === 'en' ? 'bg-pink-500 text-white border-pink-500 shadow-lg' : 'bg-white text-pink-500 border-pink-200'}`}
            >
              English
            </button>
            <button 
              onClick={() => setLanguage('ta')}
              className={`flex-1 py-3 rounded-xl border-2 transition-all ${language === 'ta' ? 'bg-pink-500 text-white border-pink-500 shadow-lg' : 'bg-white text-pink-500 border-pink-200'}`}
            >
              தமிழ்
            </button>
          </div>
        </div>

        {/* Basic Info */}
        <div className="space-y-4">
          <input 
            type="text" 
            placeholder={t('name')}
            className="w-full p-4 rounded-xl border-2 border-pink-100 focus:border-pink-400 outline-none"
            onChange={e => setFormData({...formData, name: e.target.value})}
          />
          <input 
            type="number" 
            placeholder={t('age')}
            className="w-full p-4 rounded-xl border-2 border-pink-100 focus:border-pink-400 outline-none"
            onChange={e => setFormData({...formData, age: parseInt(e.target.value)})}
          />
          <input 
            type="number" 
            placeholder={t('pregnancy_week')}
            className="w-full p-4 rounded-xl border-2 border-pink-100 focus:border-pink-400 outline-none"
            onChange={e => setFormData({...formData, initialWeek: parseInt(e.target.value)})}
          />
        </div>

        {/* Contacts */}
        <div className="space-y-4">
          <input 
            type="tel" 
            placeholder={t('husband_contact')}
            className="w-full p-4 rounded-xl border-2 border-pink-100 focus:border-pink-400 outline-none"
            onChange={e => setFormData({...formData, husbandContact: e.target.value})}
          />
          <p className="text-sm font-semibold text-gray-500 mt-4">{t('emergency_contacts')}</p>
          {[0, 1, 2].map(i => (
            <input 
              key={i}
              type="tel" 
              placeholder={`${t('sos')} ${i+1}`}
              className="w-full p-4 rounded-xl border-2 border-pink-100 focus:border-pink-400 outline-none"
              onChange={e => {
                const contacts = [...(formData.emergencyContacts || [])];
                contacts[i] = e.target.value;
                setFormData({...formData, emergencyContacts: contacts});
              }}
            />
          ))}
        </div>

        <button 
          onClick={handleSave}
          className="w-full bg-pink-600 text-white py-4 rounded-2xl text-xl font-bold shadow-xl hover:bg-pink-700 active:scale-95 transition-all mt-8"
        >
          {t('save')}
        </button>

        <div className="text-center mt-3 text-sm text-gray-500">
          {t('already_registered')} 
          <button
            onClick={() => navigate('/login')}
            className="text-pink-600 font-semibold underline"
          >
            {t('login')}
          </button>
        </div>
      </div>
    </div>
  );
};
