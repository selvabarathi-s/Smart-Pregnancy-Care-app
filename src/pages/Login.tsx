import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { useLanguage } from '../context/LanguageContext';

export const Login: React.FC = () => {
  const { user } = useUser();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const handleLogin = () => {
    if (user) {
      navigate('/dashboard');
    } else {
      navigate('/register');
    }
  };

  return (
    <div className="min-h-screen bg-teal-50 p-6 flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-8 space-y-4">
        <h1 className="text-2xl font-bold text-teal-700">{t('login')}</h1>
        {user ? (
          <>
            <p className="text-gray-600">{t('welcome_back')} {user.name}</p>
            <p className="text-sm text-gray-500">{t('login_hint')}</p>
          </>
        ) : (
          <p className="text-gray-600">{t('login_no_user')}</p>
        )}
        <button
          onClick={handleLogin}
          className="w-full py-3 bg-teal-600 text-white rounded-xl font-semibold"
        >
          {t('login_button')}
        </button>
      </div>
    </div>
  );
};