import {Translation} from "../context/LanguageContext";
import Dutch from './Dutch';
import English from './English';


const TranslationBindings = {
  en: English,
  nl: Dutch,
};

export interface TranslationKeys extends Translation {
  language: string;
  home: {
    title: string;
    toggleLanguage: string;
  };
  user: {
    guest: string;
    userId: string;
    greeting: string;
    settings: {
      darkMode: string;
      subscribeToMailingList: string;
      // ...etc
    };
  };
}

export type AvailableTranslations = keyof typeof TranslationBindings;

export default TranslationBindings;
