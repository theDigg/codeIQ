import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  editorSettings: {},
};

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setSettings: (state, action) => {
      state.settings = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setSettings } = settingsSlice.actions;

export default settingsSlice.reducer;
