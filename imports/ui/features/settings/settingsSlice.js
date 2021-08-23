import { createSlice } from '@reduxjs/toolkit';
import highline from '../../themes/editor/highline.json';

const initialEditorSettings = localStorage.getItem('editorSettings') ? JSON.parse(localStorage.getItem('editorSettings')) : {};
const initialEditorTheme = localStorage.getItem('editorTheme') ? JSON.parse(localStorage.getItem('editorTheme')) : { name: 'highline', value: highline };

const initialState = {
  editorSettings: initialEditorSettings,
  editorTheme: initialEditorTheme
};

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setSettings: (state, action) => {
      state.editorSettings = action.payload;
      localStorage.setItem('editorSettings', JSON.stringify(action.payload));
    },
    setEditorTheme: (state, action) => {
      state.editorTheme = action.payload
      localStorage.setItem('editorTheme', JSON.stringify(action.payload));
    }
  },
});

// Action creators are generated for each case reducer function
export const { setSettings, setEditorTheme } = settingsSlice.actions;

export default settingsSlice.reducer;
