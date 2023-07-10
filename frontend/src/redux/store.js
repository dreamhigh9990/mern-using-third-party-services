import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import rootReducer from './root-reducer';

const enableMiddleware = (...middlewares) => {
  if (process.env.NODE_ENV !== 'production') {
    return composeWithDevTools(applyMiddleware(...middlewares));
  }

  return compose(applyMiddleware(...middlewares));
};

let store;

const configureStore = initialState => {
  store = createStore(
    rootReducer,
    initialState,
    enableMiddleware(thunkMiddleware)
  );

  return store;
};

export default configureStore;

export const getStore = () => store;
