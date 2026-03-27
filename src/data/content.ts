import { YogaExercise, GovScheme, ContentItem } from '../types';

export const yogaExercises: YogaExercise[] = [
  {
    title: { en: 'Deep Breathing', ta: 'ஆழ்ந்த சுவாசம்' },
    description: { en: 'Relaxes the mind and body', ta: 'மனம் மற்றும் உடலை ரிலாக்ஸ் செய்கிறது' },
    benefits: { en: 'Reduces stress and improves oxygen flow', ta: 'மன அழுத்தத்தைக் குறைத்து ஆக்ஸிஜன் ஓட்டத்தை மேம்படுத்துகிறது' },
    steps: {
      en: ['Sit comfortably', 'Inhale slowly through nose', 'Exhale slowly through mouth'],
      ta: ['வசதியாக உட்காரவும்', 'மூக்கு வழியாக மெதுவாக சுவாசிக்கவும்', 'வாய் வழியாக மெதுவாக வெளியேற்றவும்']
    }
  },
  {
    title: { en: 'Cat-Cow Stretch', ta: 'பூனை-பசு நீட்சி' },
    description: { en: 'Relieves back pain', ta: 'முதுகு வலியைக் குறைக்கிறது' },
    benefits: { en: 'Strengthens the spine', ta: 'முதுகெலும்பை பலப்படுத்துகிறது' },
    steps: {
      en: ['Get on all fours', 'Arch your back up', 'Lower your belly down'],
      ta: ['நான்கு கால்களிலும் நிற்கவும்', 'முதுகை மேலே வளைக்கவும்', 'வயிற்றைக் கீழே இறக்கவும்']
    }
  }
];

export const govSchemes: GovScheme[] = [
  {
    title: { en: 'Dr. Muthulakshmi Reddy Maternity Benefit Scheme', ta: 'டாக்டர் முத்துலட்சுமி ரெட்டி மகப்பேறு நலத் திட்டம்' },
    description: { en: 'Financial assistance for pregnant women', ta: 'கர்ப்பிணிப் பெண்களுக்கு நிதியுதவி' },
    eligibility: { en: 'Pregnant women above 19 years', ta: '19 வயதுக்கு மேற்பட்ட கர்ப்பிணிப் பெண்கள்' },
    howToApply: { en: 'Contact nearest PHC or VHN', ta: 'அருகிலுள்ள PHC அல்லது VHN ஐத் தொடர்பு கொள்ளவும்' }
  },
  {
    title: { en: 'Pradhan Mantri Matru Vandana Yojana (PMMVY)', ta: 'பிரதம மந்திரி மாத்ரு வந்தனா யோஜனா' },
    description: { en: 'Cash incentive for first-time mothers', ta: 'முதல்முறை தாய்மார்களுக்கு ஊக்கத்தொகை' },
    eligibility: { en: 'First-time pregnant women', ta: 'முதல்முறை கர்ப்பிணிப் பெண்கள்' },
    howToApply: { en: 'Apply at Anganwadi centers', ta: 'அங்கன்வாடி மையங்களில் விண்ணப்பிக்கவும்' }
  }
];

export const careTips: ContentItem[] = [
  {
    title: { en: 'Healthy Diet', ta: 'ஆரோக்கியமான உணவு' },
    description: { en: 'Eat plenty of green vegetables and fruits', ta: 'ஏராளமான பச்சை காய்கறிகள் மற்றும் பழங்களை உண்ணுங்கள்' }
  }
];

export const healthServices: ContentItem[] = [
  {
    title: { en: '108 Ambulance', ta: '108 ஆம்புலன்ஸ்' },
    description: { en: 'Emergency medical transport', ta: 'அவசர மருத்துவ போக்குவரத்து' }
  },
  {
    title: { en: '102 Maternity Helpline', ta: '102 மகப்பேறு உதவி எண்' },
    description: { en: 'Support for pregnant women', ta: 'கர்ப்பிணிப் பெண்களுக்கு ஆதரவு' }
  },
  {
    title: { en: 'Primary Health Center (PHC)', ta: 'ஆரம்ப சுகாதார நிலையம் (PHC)' },
    description: { en: 'Visit for regular checkups', ta: 'வழக்கமான பரிசோதனைகளுக்குச் செல்லவும்' }
  }
];
