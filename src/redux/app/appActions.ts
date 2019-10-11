import actionCreatorFactory from 'typescript-fsa';
import { FetchPersonType } from '../../fetches/reqresApi';

const actionCreator = actionCreatorFactory('App');

export const setLoading = actionCreator<
{ loading: boolean }
>('SET_LOADING');

export const getPersonExample = actionCreator.async<
{ personId: number },
{ person: FetchPersonType }
>('SET_PEOPLE');
