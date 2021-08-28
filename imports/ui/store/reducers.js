import { combineReducers } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import golfReducer from '../features/golf/golfSlice';
import roomsReducer from '../features/rooms/roomsSlice';
import settingsReducer from '../features/settings/settingsSlice';

export default combineReducers({
  auth: authReducer,
  golf: golfReducer,
  rooms: roomsReducer,
  settings: settingsReducer,
});
