import { createSlice } from '@reduxjs/toolkit';

const initialEditorSettings = localStorage.getItem('editorSettings') ? JSON.parse(localStorage.getItem('editorSettings')) : {};

const initialState = {
  editorSettings: initialEditorSettings,
};

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setSettings: (state, action) => {
      state.editorSettings = action.payload;
      localStorage.setItem('editorSettings', JSON.stringify(action.payload));
    },
  },
});

// Action creators are generated for each case reducer function
export const { setSettings } = settingsSlice.actions;

export default settingsSlice.reducer;
