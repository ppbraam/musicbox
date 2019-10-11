import {
  useContext, useEffect, useState,
} from 'react';
import LanguageContext from '../context/LanguageContext';
import { isAvailableTranslation } from '../helpers/TypeGuards';
import TranslationBindings, { TranslationKeys } from '../translations/Translator';

const useTranslator = () => {
  const { language } = useContext(LanguageContext);
  const [translations, setTranslations] = useState<TranslationKeys>(TranslationBindings[language]);

  useEffect((): void => {
    if (!isAvailableTranslation(language)) {
      throw new Error(`Language ${language} is not defined, make sure to add this language to the TranslationBindings`);
    }

    setTranslations(TranslationBindings[language]);
  }, [language]);

  function translate<A extends Partial<TranslationKeys>>(keys: [A], variables: {[key: string]: string}): string;
  function translate<A extends keyof TranslationKeys, B extends keyof TranslationKeys[A]>(keys: [A, B], variables?: {[key: string]: string}): string;
  function translate<A extends keyof TranslationKeys, B extends keyof TranslationKeys[A], C extends keyof TranslationKeys[A][B]>(keys: [A, B, C], variables?: {[key: string]: string}): string;
  function translate<A extends keyof TranslationKeys, B extends keyof TranslationKeys[A], C extends keyof TranslationKeys[A][B], D extends keyof TranslationKeys[A][B][C]>(keys: [A, B, C, D], variables?: {[key: string]: string}): string;
  function translate<A extends keyof TranslationKeys, B extends keyof TranslationKeys[A], C extends keyof TranslationKeys[A][B], D extends keyof TranslationKeys[A][B][C], E extends keyof TranslationKeys[A][B][C][D]>(keys: [A, B, C, D, E], variables?: {[key: string]: string}): string;
  function translate(path: string[], variables?: {[key: string]: string}): string {
    let result = translations[path[0]];

    const replaceOptions = (translation: string, options: {[key: string]: string} = {}): string => translation.replace(/:(\w+)/gi, (word: string): string => {
      const key = word.replace(/^:/, '');

      if (options[key] === undefined || options[key] === null) {
        return '';
      }

      return options[key];
    }).trim();

    for (let i = 0; i <= path.length; i += 1) {
      if (typeof result === 'string') {
        return replaceOptions(result, variables);
      }

      if (result[path[i]]) {
        result = result[path[i]];
      }
    }

    return '';
  }

  return translate;
};

export default useTranslator;
