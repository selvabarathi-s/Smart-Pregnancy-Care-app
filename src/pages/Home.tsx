import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useUser } from '../context/UserContext';
import { Activity, HeartPulse, ShieldCheck, Baby, Hospital, CreditCard } from 'lucide-react';

export const Home: React.FC = () => {
  const { t } = useLanguage();
  const { user } = useUser();
  const navigate = useNavigate();

  const modules = [
    { id: 'dashboard', title: t('dashboard'), icon: <Activity />, path: '/dashboard', color: 'bg-pink-500' },
    { id: 'health', title: t('health_services'), icon: <Hospital />, path: '/module/health', color: 'bg-orange-400' },
    { id: 'tracking', title: t('mother_baby_care'), icon: <Baby />, path: '/module/care', color: 'bg-purple-500' },
    { id: 'yoga', title: t('yoga_exercise'), icon: <HeartPulse />, path: '/module/yoga', color: 'bg-blue-500' },
    { id: 'schemes', title: t('gov_schemes'), icon: <ShieldCheck />, path: '/module/schemes', color: 'bg-green-500' },
    { id: 'safe', title: t('safe_card'), icon: <CreditCard />, path: '/safe-card', color: 'bg-amber-500' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-100 via-white to-cyan-100 p-4 sm:p-6">
      <div className="max-w-full sm:max-w-xl mx-auto bg-white shadow-2xl rounded-3xl p-6 sm:p-8 space-y-6">
        <h1 className="text-4xl font-black text-pink-700">{t('app_title')}</h1>
        <p className="text-gray-600 text-lg leading-relaxed">
          {t('home_welcome_desc')}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {modules.map(m => (
            <button
              key={m.id}
              onClick={() => {
                if (!user && m.id !== 'dashboard') {
                  navigate('/register');
                } else {
                  navigate(m.path);
                }
              }}
              className={`p-4 rounded-2xl shadow-md text-white font-semibold flex flex-col items-center gap-2 ${m.color}`}
            >
              <div className="w-10 h-10 flex items-center justify-center">{React.cloneElement(m.icon as React.ReactElement, { size: 22 })}</div>
              <span className="text-sm text-center">{m.title}</span>
            </button>
          ))}
        </div>

        <div className="flex justify-between items-center mt-4">
          {user ? (
            <p className="text-sm text-gray-600">{t('welcome_back')} <span className="font-bold">{user.name}</span></p>
          ) : (
            <p className="text-sm text-gray-600">{t('home_login_prompt')}</p>
          )}
          <button
            onClick={() => navigate(user ? '/dashboard' : '/register')}
            className="py-2 px-4 bg-pink-600 text-white rounded-xl shadow-lg hover:bg-pink-700 transition"
          >
            {user ? t('dashboard') : t('registration')}
          </button>
        </div>
      </div>
    </div>
  );
};
