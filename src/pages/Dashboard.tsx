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
  AlertCircle,
  CreditCard
} from 'lucide-react';

export const Dashboard: React.FC = () => {
  const { t, language } = useLanguage();
  const { user, logout } = useUser();
  const currentWeek = usePregnancyWeek();
  const navigate = useNavigate();

  const modules = [
    { id: 'yoga', title: t('yoga_exercise'), icon: <Activity />, color: 'bg-blue-500', path: '/module/yoga' },
    { id: 'schemes', title: t('gov_schemes'), icon: <ShieldCheck />, color: 'bg-green-500', path: '/module/schemes' },
    { id: 'care', title: t('mother_baby_care'), icon: <Baby />, color: 'bg-purple-500', path: '/module/care' },
    { id: 'health', title: t('health_services'), icon: <Hospital />, color: 'bg-orange-500', path: '/module/health' },
    { id: 'safe', title: t('safe_card'), icon: <CreditCard />, color: 'bg-amber-500', path: '/safe-card' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-rose-50 to-cyan-50 pb-12">
      <div className="mx-auto max-w-2xl px-4 pt-5">
        <div className="bg-pink-600 p-6 rounded-3xl shadow-2xl text-white border border-pink-300">
          <div className="flex justify-between items-start gap-4 mb-4">
            <div>
              <p className="text-xs tracking-widest uppercase opacity-90">{t('app_title')}</p>
              <h1 className="text-3xl font-extrabold leading-tight">{user?.name || t('dashboard')}</h1>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => navigate('/sos')}
                className="bg-red-500 hover:bg-red-600 p-3 rounded-2xl shadow-lg"
                title="SOS"
              >
                <AlertCircle size={24} />
              </button>
              <button
                onClick={() => {
                  logout();
                  navigate('/');
                }}
                className="bg-white text-pink-600 hover:bg-gray-100 p-3 rounded-2xl shadow-lg border-2 border-white"
                title={t('logout')}
              >
                {t('logout')}
              </button>
            </div>
          </div>

          <div className="bg-white/20 backdrop-blur-md p-4 rounded-2xl flex items-center justify-between">
            <div className="text-center p-3 bg-white rounded-2xl shadow-inner">
              <div className="text-3xl font-bold text-pink-600">{currentWeek}</div>
              <p className="text-xs uppercase tracking-wider text-pink-800">{t('current_week')}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-white/90">{t('dashboard')}</p>
              <p className="text-2xl font-black">{language === 'ta' ? `${currentWeek}-வது வாரம்` : `Week ${currentWeek}`}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-6">
          {modules.map((mod, i) => (
            <motion.button
              key={mod.id}
              whileTap={{ scale: 0.96 }}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              onClick={() => navigate(mod.path)}
              className="bg-white p-4 sm:p-5 rounded-2xl shadow-lg border border-gray-100 flex flex-col items-center justify-center text-center transition-all hover:-translate-y-1 hover:shadow-2xl"
            >
              <div className={`w-12 h-12 sm:w-14 sm:h-14 ${mod.color} rounded-xl flex items-center justify-center text-white shadow-md mb-2`}>
                {React.cloneElement(mod.icon as React.ReactElement, { size: 22 })}
              </div>
              <span className="text-xs sm:text-sm font-semibold text-gray-700">{mod.title}</span>
            </motion.button>
          ))}
        </div>

        <div className="mt-6 p-5 bg-white rounded-2xl shadow-lg border border-gray-100">
          <h3 className="text-lg font-bold text-pink-600">{t('daily_tip_title')}</h3>
          <p className="text-slate-600 mt-2 text-sm leading-relaxed">{language === 'ta' ? 'இன்று அதிக தண்ணீர் குடிக்க மறக்காதீர்கள். இது உங்கள் ஆரோக்கியத்திற்கு நல்லது.' : 'Drink at least 8 glasses of water today and take a short walk for better pregnancy health.'}</p>
        </div>
      </div>
    </div>
  );
};
