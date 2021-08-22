import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentRoom: {},
  rooms: [],
};

export const roomsSlice = createSlice({
  name: 'rooms',
  initialState,
  reducers: {
    setRooms: (state, action) => {
      state.rooms = action.payload;
    },
    setCurrentRoom: (state, action) => {
      state.currentRoom = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setRooms, setCurrentRoom } = roomsSlice.actions;

export default roomsSlice.reducer;
