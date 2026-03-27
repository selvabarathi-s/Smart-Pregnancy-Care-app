import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useUser } from '../context/UserContext';
import { usePregnancyWeek } from '../hooks/usePregnancyWeek';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  Activity, 
  Heart, 
  ShieldCheck, 
  Baby, 
  Hospital,
  AlertCircle
} from 'lucide-react';

export const Dashboard: React.FC = () => {
  const { t, language } = useLanguage();
  const { user } = useUser();
  const currentWeek = usePregnancyWeek();
  const navigate = useNavigate();

  const modules = [
    { id: 'yoga', title: t('yoga_exercise'), icon: <Activity />, color: 'bg-blue-500', path: '/module/yoga' },
    { id: 'schemes', title: t('gov_schemes'), icon: <ShieldCheck />, color: 'bg-green-500', path: '/module/schemes' },
    { id: 'care', title: t('mother_baby_care'), icon: <Baby />, color: 'bg-purple-500', path: '/module/care' },
    { id: 'health', title: t('health_services'), icon: <Hospital />, color: 'bg-orange-500', path: '/module/health' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-pink-600 p-8 rounded-b-[3rem] shadow-xl text-white">
        <div className="flex justify-between items-center mb-6">
          <div>
            <p className="text-pink-100 text-lg">{t('app_title')}</p>
            <h1 className="text-3xl font-bold">{user?.name}</h1>
          </div>
          <button 
            onClick={() => navigate('/')}
            className="bg-red-500 p-3 rounded-2xl shadow-lg animate-pulse"
          >
            <AlertCircle size={28} />
          </button>
        </div>

        {/* Week Tracker */}
        <div className="bg-white/20 backdrop-blur-md p-6 rounded-3xl flex items-center gap-6">
          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-pink-600 text-3xl font-black shadow-inner">
            {currentWeek}
          </div>
          <div>
            <p className="text-pink-100 font-medium uppercase tracking-wider">{t('current_week')}</p>
            <h2 className="text-2xl font-bold">{language === 'ta' ? `${currentWeek}-வது வாரம்` : `Week ${currentWeek}`}</h2>
          </div>
        </div>
      </div>

      {/* Grid Modules */}
      <div className="p-6 grid grid-cols-2 gap-6 -mt-6">
        {modules.map((mod, i) => (
          <motion.button
            key={mod.id}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            onClick={() => navigate(mod.path)}
            className="bg-white p-6 rounded-[2.5rem] shadow-lg flex flex-col items-center gap-4 text-center group transition-all hover:shadow-2xl"
          >
            <div className={`w-16 h-16 ${mod.color} rounded-2xl flex items-center justify-center text-white shadow-lg`}>
              {React.cloneElement(mod.icon as React.ReactElement, { size: 32 })}
            </div>
            <span className="text-gray-700 font-bold text-sm leading-tight">{mod.title}</span>
          </motion.button>
        ))}
      </div>

      {/* Daily Tip */}
      <div className="p-6">
        <div className="bg-pink-50 p-6 rounded-[2.5rem] border-2 border-pink-100 flex gap-4 items-start">
          <div className="bg-pink-200 p-3 rounded-2xl text-pink-600">
            <Heart size={24} fill="currentColor" />
          </div>
          <div>
            <h3 className="font-bold text-pink-800 mb-1">Daily Health Tip</h3>
            <p className="text-pink-700 text-sm leading-relaxed">
              {language === 'ta' 
                ? 'இன்று அதிக தண்ணீர் குடிக்க மறக்காதீர்கள். இது உங்கள் ஆரோக்கியத்திற்கு நல்லது.' 
                : 'Don\'t forget to drink more water today. It is good for your health.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
