import React, {
  FC,
  ReactElement,
  useContext,
  useState,
} from 'react';
import { Route, Switch } from 'react-router';
import LanguageContext from './context/LanguageContext';
import { isAvailableTranslation } from './helpers/TypeGuards';
import Routes from './Routes';
import { AvailableTranslations } from './translations/Translator';


const App: FC = (): ReactElement => {
  const [language, setLanguage] = useState<AvailableTranslations>(
    isAvailableTranslation(process.env.REACT_APP_LANGUAGE) ? process.env.REACT_APP_LANGUAGE : 'nl',
  );

  const languageContext = useContext(LanguageContext);
  // eslint-disable-next-line prefer-destructuring
  languageContext.setLanguage = setLanguage;
  languageContext.language = language;

  return (
    // <Menu />
    <Switch>
      {Routes.map((route): ReactElement => <Route {...route} key={route.key} />)}
    </Switch>
    // <Footer />
  );
};


export default App;
