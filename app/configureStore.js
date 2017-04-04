/* eslint-disable global-require */
import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from './reducers';

const createStoreWithMiddleware = applyMiddleware(
  thunkMiddleware,
)(createStore);

export default function configureStore(initialState) {
  let store;

  console.log('initialState', initialState);

  if (typeof window !== 'undefined') {
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    store = createStore(rootReducer, initialState, composeEnhancers(
      applyMiddleware(thunkMiddleware),
    ));
    // store = createStoreWithMiddleware(rootReducer, initialState);
  } else {
    store = createStoreWithMiddleware(rootReducer, initialState);
  }

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./reducers', () => {
      const nextRootReducer = require('./reducers').default;
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}
