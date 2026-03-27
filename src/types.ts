export type Language = 'en' | 'ta';

export interface UserData {
  name: string;
  age: number;
  initialWeek: number;
  registrationDate: string; // ISO string
  husbandContact: string;
  emergencyContacts: string[];
  language: Language;
}

export interface ContentItem {
  title: { en: string; ta: string };
  description: { en: string; ta: string };
  icon?: string;
  category?: string;
}

export interface YogaExercise extends ContentItem {
  steps: { en: string[]; ta: string[] };
  benefits: { en: string; ta: string };
}

export interface GovScheme extends ContentItem {
  eligibility: { en: string; ta: string };
  howToApply: { en: string; ta: string };
}
