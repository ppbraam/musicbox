import React, {
  FC,
  ReactElement,
} from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { connect, DispatchProp } from 'react-redux';
import { RouteComponentProps } from 'react-router';

import { Reducers } from '../../redux/reducers';

import MusicBox from '../../containers/MusicBox/MusicBox';
import './Home.scss';


interface MapStateToPropsType {
  personExampleFailed?: {};
}

type HomeProps = RouteComponentProps & DispatchProp & MapStateToPropsType;


const Home: FC<HomeProps> = (): ReactElement => {
  return (
    <main className="home-page">
      <HelmetProvider>
        <title>Boilerplate</title>
        <meta name="description" content="Boilerplate with react and typescript" />
      </HelmetProvider>
      <MusicBox midiFile={'test'} />
    </main>
  );
};


const mapStateToProps = (state: Reducers): MapStateToPropsType => ({
  personExampleFailed: state.appReducer.personExampleFailed,
});

export default connect(mapStateToProps)(Home);
