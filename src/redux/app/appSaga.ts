import { Action } from 'redux';
import { SagaIterator } from 'redux-saga';
import { call, put, takeLatest } from 'redux-saga/effects';
import { isType } from 'typescript-fsa';
import {fetchPerson, FetchPersonType} from '../../fetches/reqresApi';
import { getPersonExample, setLoading } from './appActions';

export function* getPerson(action: Action): Iterable<Action> {
  if (!isType(action, getPersonExample.started)) {
    return;
  }

  yield put(setLoading({ loading: true }));

  try {
    const bar = (yield call(() => fetchPerson(action.payload.personId))) as unknown as Response;
    const json = (yield call(() => bar.json())) as unknown as { data: FetchPersonType };

    yield put(getPersonExample.done({
      params: action.payload,
      result: {
        person: json.data,
      },
    }));
  } catch (e) {
    yield put(getPersonExample.failed({
      error: {
        message: 'Failed to fetch',
      },
      params: action.payload,
    }));
  }

  yield put(setLoading({ loading: false }));
}

export default function* appWatcher(): SagaIterator {
  yield takeLatest(setLoading, (action => setLoading(action.payload)));
  yield takeLatest(getPersonExample.started, getPerson);
  yield takeLatest(getPersonExample.done, (action => getPersonExample.done(action.payload)));
  yield takeLatest(getPersonExample.failed, (action => getPersonExample.failed(action.payload)));
}
