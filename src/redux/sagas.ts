import { all, fork } from 'redux-saga/effects';
import appWatcher from './app/appSaga';

export default function* rootSaga() {
  yield all([
    fork(appWatcher),
  ]);
}
