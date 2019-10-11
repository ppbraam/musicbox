import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { getPersonExample, setLoading } from './appActions';
import { FetchPersonType } from '../../fetches/reqresApi';

export type AppState = Readonly<{
  loading: boolean;
  person?: FetchPersonType;
  personExampleFailed?: {};
}>;

const initialState: AppState = {
  loading: false,
};

const appReducer = reducerWithInitialState(initialState)
  .case(setLoading, (state, payload) => ({
    ...state, loading: payload.loading,
  }))
  .case(getPersonExample.done, (state, payload) => ({
    ...state, person: payload.result.person,
  }))
  .case(getPersonExample.failed, (state, payload) => ({
    ...state, personExampleFailed: payload.error,
  }))
  .build();


export default appReducer;
