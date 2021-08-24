import { configureStore } from '@reduxjs/toolkit';
import monitorReducersEnhancer from '../enhancers/monitorReducers';
import loggerMiddleware from '../middleware/logger';
import rootReducer from './reducers';

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(loggerMiddleware),
  enhancers: [monitorReducersEnhancer],
});

if (process.env.NODE_ENV !== 'production' && module.hot) {
  module.hot.accept();
}

export default store;
