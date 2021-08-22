import { combineReducers } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import roomsReducer from '../features/rooms/roomsSlice';
import settingsReducer from '../features/settings/settingsSlice';


export default combineReducers({
  auth: authReducer,
  rooms: roomsReducer,
  settings: settingsReducer,
});
