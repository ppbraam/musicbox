import { combineReducers } from 'redux';
import appReducer, { AppState } from './app/appReducer';

export interface Reducers {
  appReducer: AppState;
}

export default combineReducers<Reducers>({
  appReducer,
});
