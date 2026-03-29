import React from 'react';
import { useUser } from '../context/UserContext';
import { useLanguage } from '../context/LanguageContext';
import { useNavigate } from 'react-router-dom';

export const SafeCard: React.FC = () => {
  const { user } = useUser();
  const { t, language } = useLanguage();
  const navigate = useNavigate();

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="text-center">{t('home_login_prompt')}</div>
      </div>
    );
  }

  const payload = encodeURIComponent(JSON.stringify({
    name: user.name,
    age: user.age,
    week: user.initialWeek,
    husbandContact: user.husbandContact,
    emergencyContacts: user.emergencyContacts,
  }));

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-lg mx-auto bg-white p-6 rounded-3xl shadow-xl">
        <h1 className="text-2xl font-bold mb-4">{t('safe_card')}</h1>
        <p className="text-sm text-gray-500 mb-4">{t('safe_card_desc')}</p>

        <div className="space-y-3">
          <p><span className="font-semibold">{t('name')}:</span> {user.name}</p>
          <p><span className="font-semibold">{t('age')}:</span> {user.age}</p>
          <p><span className="font-semibold">{t('pregnancy_week')}:</span> {user.initialWeek}</p>
          <p><span className="font-semibold">{t('husband_contact')}:</span> {user.husbandContact}</p>
          <p><span className="font-semibold">{t('emergency_contacts')}:</span> {user.emergencyContacts.join(', ')}</p>
        </div>

        <div className="mt-6 text-center">
          <img
            src={`https://api.qrserver.com/v1/create-qr-code/?data=${payload}&size=180x180`}
            alt="QR Code"
            className="mx-auto mb-4 border rounded-xl"
          />
          <a
            href={`https://api.qrserver.com/v1/create-qr-code/?data=${payload}&size=400x400`}
            download="safe_card_qr.png"
            className="inline-block px-5 py-2 bg-blue-600 text-white rounded-xl font-semibold"
          >
            {t('download_report')}
          </a>
        </div>

        <button
          onClick={() => navigate('/dashboard')}
          className="mt-6 w-full bg-pink-500 text-white py-3 rounded-xl font-bold"
        >
          {t('dashboard')}
        </button>
      </div>
    </div>
  );
};
