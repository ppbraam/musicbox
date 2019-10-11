import { createContext } from 'react';
import { AvailableTranslations } from '../translations/Translator';

export interface Translation {
  [key: string]: string | Translation;
}

interface LanguageContextType {
  language: AvailableTranslations;
  setLanguage: (translation: AvailableTranslations) => void;
}

const LanguageContextDefaultValue: LanguageContextType = {
  language: 'nl',
  setLanguage: (): void => {},
};

const LanguageContext = createContext<LanguageContextType>(LanguageContextDefaultValue);

export default LanguageContext;
