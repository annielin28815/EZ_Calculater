import { applyMiddleware, compose, createStore } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';

// import createSensitiveStorage from 'redux-persist-sensitive-storage';
import localStorage from 'redux-persist/lib/storage';
import createSagaMiddleware from 'redux-saga';
import thunk from 'redux-thunk';

/**
 * This import defaults to localStorage for web and AsyncStorage for react-native.
 *
 * Keep in mind this storage *is not secure*. Do not use it to store sensitive information
 * (like API tokens, private and sensitive data, etc.).
 *
 * If you need to store sensitive information, use redux-persist-sensitive-storage.
 * NOTICE: sensitive-storage will not wipe data when removing app in iOS.
 * @see https://github.com/CodingZeal/redux-persist-sensitive-storage
 */

// Using sensitive persist storage.
// const sensitiveStorage = createSensitiveStorage({
//   keychainService: 'myKeychain',
//   sharedPreferencesName: 'mySharedPrefs',
// });

const persistConfig = {
  key: 'root',
  // Remove "asyncStorage" to use sensitive persist storage.
  storage: localStorage,
  version: 0,
  /**
   * Blacklist state that we do not need/want to persist
   */
  whitelist: [
    // 'appApi',
    // 'appAlert',
    // 'appState',
    // 'appRoute',
    // 'appApi',
    // 'auth',
  ],
};

export default (rootReducer, rootSaga) => {
  // Redux persist
  const persistedReducer = persistReducer(persistConfig, rootReducer);

  // Connect the sagas to the redux store
  const sagaMiddleware = createSagaMiddleware();

  // Add middleware here
  const middleware = [];
  middleware.push(sagaMiddleware);
  middleware.push(thunk);

  // Debug tool integration;
  let composeEnhancers = compose;
  if (global.__DEV__) {
    // Use it if Remote debugging with RNDebugger, otherwise use remote-redux-devtools
    // eslint-disable-next-line no-underscore-dangle
    composeEnhancers =
      (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ trace: true, traceLimit: 25 })) ||
      compose;
  }

  // Enable hot module replacement for reducers
  if (module.hot) {
    module.hot.accept(() => {
      const nextRootReducer = require('../Stores').default;
      store.replaceReducer(nextRootReducer);
    });
  }

  // Create the store
  const store = createStore(
    persistedReducer,
    composeEnhancers(applyMiddleware(...middleware)),
  );

  // Kick off the root saga
  sagaMiddleware.run(rootSaga);

  return {
    persistor: persistStore(store),
    store,
  };
};
