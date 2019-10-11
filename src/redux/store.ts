import {
  applyMiddleware, compose, createStore, Store,
} from 'redux';
import createSagaMiddleware from 'redux-saga';
import reducers from './reducers';
import rootSaga from './sagas';


const sagaMiddleware = createSagaMiddleware();

const createEnhancer = () => {
  if (process.env.IS_BROWSER && process.env.NODE_ENV === 'development') {
    return compose(
      applyMiddleware(sagaMiddleware),
      // @ts-ignore
        window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f, // eslint-disable-line
    );
  }

  return applyMiddleware(sagaMiddleware);
};

export const runSaga = async (): Promise<any> => sagaMiddleware.run(rootSaga);

export const configureStore = async (preloadedState: Record<string, any> = {}): Promise<Store> => {
  const enhancer = await createEnhancer();
  const store = createStore(reducers, preloadedState, enhancer);

  await runSaga();

  return store;
};
