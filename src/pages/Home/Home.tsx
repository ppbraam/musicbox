import React, {
  ChangeEvent,
  FC,
  ReactElement,
  useState,
} from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { connect, DispatchProp } from 'react-redux';
import { RouteComponentProps } from 'react-router';

import useTranslator from '../../hooks/useTranslator';
import { getPersonExample } from '../../redux/app/appActions';
import { Reducers } from '../../redux/reducers';

import { LanguageSwitcher } from '../../components';
import { UserBadge } from '../../containers';

import './Home.scss';


interface MapStateToPropsType {
  personExampleFailed?: {};
}

type HomeProps = RouteComponentProps & DispatchProp & MapStateToPropsType;


const Home: FC<HomeProps> = ({ dispatch }): ReactElement => {
  const [userId, setUserId] = useState<number>();
  const translate = useTranslator();

  const handleUserSelect = (e: ChangeEvent<HTMLInputElement>): void => setUserId(Number(e.target.value));

  return (
    <main className="home-page">
      <HelmetProvider>
        <title>Boilerplate</title>
        <meta name="description" content="Boilerplate with react and typescript" />
      </HelmetProvider>
      <section className="container">
        <h1 className="home-page__title">
          {translate(['home', 'title'])}
        </h1>
        <UserBadge />
        <label>
          {translate(['user', 'userId'])}
          <input
            type="number"
            className="home-page__user-selector home-page__user-selector--wider-margin"
            onChange={handleUserSelect}
          />
        </label>
        <button
          className="home-page__login-button"
          onClick={userId ? () => dispatch(getPersonExample.started({ personId: userId })) : undefined}
        >
          Login
        </button>
        <LanguageSwitcher />
      </section>
    </main>
  );
};


const mapStateToProps = (state: Reducers): MapStateToPropsType => ({
  personExampleFailed: state.appReducer.personExampleFailed,
});

export default connect(mapStateToProps)(Home);
