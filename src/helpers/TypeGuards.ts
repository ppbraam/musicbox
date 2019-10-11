import TranslationBindings, { AvailableTranslations } from '../translations/Translator';

const isAvailableTranslation = (arg?: string): arg is AvailableTranslations => (arg ? Object.keys(TranslationBindings).find(
  (iterate): boolean => iterate === arg,
) !== undefined : false);

export {
  isAvailableTranslation,
};
