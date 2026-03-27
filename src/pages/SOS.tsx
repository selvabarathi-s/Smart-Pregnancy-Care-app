import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useUser } from '../context/UserContext';
import { Phone, MessageSquare, MapPin, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';

export const SOS: React.FC = () => {
  const { t } = useLanguage();
  const { user } = useUser();
  const [status, setStatus] = useState<'idle' | 'sending' | 'calling'>('idle');
  const navigate = useNavigate();

  const handleSOS = () => {
    setStatus('sending');
    // Simulate sending SMS with location
    setTimeout(() => {
      setStatus('calling');
      // In a real mobile app, we'd use a plugin. Here we use tel: links
      const contacts = [user?.husbandContact, ...(user?.emergencyContacts || [])].filter(Boolean);
      if (contacts.length > 0) {
        window.location.href = `tel:${contacts[0]}`;
      }
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-red-50 flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background Pulse */}
      <motion.div 
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute w-96 h-96 bg-red-200 rounded-full opacity-20"
      />

      <div className="z-10 text-center space-y-8">
        <h1 className="text-4xl font-black text-red-600 uppercase tracking-widest">{t('sos')}</h1>
        <p className="text-xl text-red-800 font-medium">{t('sos_desc')}</p>

        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={handleSOS}
          className="w-64 h-64 bg-red-600 rounded-full shadow-2xl flex items-center justify-center border-8 border-white group"
        >
          <Phone size={80} className="text-white group-active:animate-bounce" />
        </motion.button>

        <div className="h-20 flex flex-col items-center justify-center">
          {status === 'sending' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2 text-red-600 font-bold">
              <MapPin className="animate-bounce" /> {t('sending_sms')}
            </motion.div>
          )}
          {status === 'calling' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2 text-red-600 font-bold">
              <Phone className="animate-pulse" /> {t('calling_contacts')}
            </motion.div>
          )}
        </div>

        <button 
          onClick={() => navigate('/dashboard')}
          className="flex items-center gap-2 mx-auto bg-white px-8 py-3 rounded-full text-red-600 font-bold shadow-md hover:shadow-lg transition-all"
        >
          {t('dashboard')} <ArrowRight size={20} />
        </button>
      </div>

      {/* Quick Action Bar */}
      <div className="absolute bottom-10 flex gap-8">
        <div className="flex flex-col items-center gap-2">
          <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-lg text-red-500">
            <MessageSquare size={24} />
          </div>
          <span className="text-xs font-bold text-red-800 uppercase">SMS</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-lg text-red-500">
            <MapPin size={24} />
          </div>
          <span className="text-xs font-bold text-red-800 uppercase">Location</span>
        </div>
      </div>
    </div>
  );
};
