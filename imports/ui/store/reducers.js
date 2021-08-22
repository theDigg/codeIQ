import { combineReducers } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import roomsReducer from '../features/rooms/roomsSlice';


export default combineReducers({
  auth: authReducer,
  rooms: roomsReducer,
});
