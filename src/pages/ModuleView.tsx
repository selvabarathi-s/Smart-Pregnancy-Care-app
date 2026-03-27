import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { yogaExercises, govSchemes, careTips, healthServices } from '../data/content';
import { ArrowLeft, PhoneCall } from 'lucide-react';
import { motion } from 'motion/react';

export const ModuleView: React.FC = () => {
  const { type } = useParams<{ type: string }>();
  const { t, language } = useLanguage();
  const navigate = useNavigate();

  let content: any[] = [];
  let title = '';

  switch (type) {
    case 'yoga':
      content = yogaExercises;
      title = t('yoga_exercise');
      break;
    case 'schemes':
      content = govSchemes;
      title = t('gov_schemes');
      break;
    case 'care':
      content = careTips;
      title = t('mother_baby_care');
      break;
    case 'health':
      content = healthServices;
      title = t('health_services');
      break;
    default:
      content = [];
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white p-6 flex items-center gap-4 sticky top-0 z-10 shadow-sm">
        <button onClick={() => navigate('/dashboard')} className="p-2 hover:bg-gray-100 rounded-full">
          <ArrowLeft />
        </button>
        <h1 className="text-xl font-bold text-gray-800">{title}</h1>
      </div>

      <div className="p-6 space-y-6">
        {content.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white p-6 rounded-3xl shadow-md border border-gray-100"
          >
            <h2 className="text-lg font-bold text-pink-600 mb-2">{item.title[language]}</h2>
            <p className="text-gray-600 mb-4">{item.description[language]}</p>
            
            {item.steps && (
              <div className="space-y-2">
                <p className="font-bold text-sm text-gray-500 uppercase">{language === 'ta' ? 'படிகள்' : 'Steps'}</p>
                {item.steps[language].map((step: string, idx: number) => (
                  <div key={idx} className="flex gap-3 items-start">
                    <span className="bg-pink-100 text-pink-600 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span className="text-gray-700">{step}</span>
                  </div>
                ))}
              </div>
            )}

            {type === 'health' && (
              <button 
                onClick={() => window.location.href = `tel:${item.title.en.match(/\d+/)?.[0] || '108'}`}
                className="mt-4 w-full bg-orange-500 text-white py-3 rounded-2xl font-bold flex items-center justify-center gap-2"
              >
                <PhoneCall size={20} /> {language === 'ta' ? 'அழைக்கவும்' : 'Call Now'}
              </button>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};
