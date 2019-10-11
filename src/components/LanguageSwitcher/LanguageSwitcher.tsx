import React, {
  ChangeEvent,
  FC,
  FormEvent,
  ReactElement,
  useContext,
} from 'react';
import LanguageContext from '../../context/LanguageContext';
import TranslationBindings, { AvailableTranslations } from '../../translations/Translator';

import './LanguageSwitcher.scss';


const LanguageSwitcher: FC = (): ReactElement => {
  const { language, setLanguage } = useContext(LanguageContext);

  const languages = Object.keys(TranslationBindings) as AvailableTranslations[];

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => { e.preventDefault(); };
  const handleLanguageSelect = (e: ChangeEvent<HTMLSelectElement>): void => { setLanguage(e.target.value as AvailableTranslations); };

  return (
    <form onSubmit={handleSubmit} className="language-switcher">
      <select onChange={handleLanguageSelect} value={language}>
        {languages.map((iterateLanguage): ReactElement => (
          <option value={iterateLanguage} key={iterateLanguage}>
            {TranslationBindings[iterateLanguage].language}
          </option>
        ))}
      </select>
    </form>
  );
};


export default LanguageSwitcher;
