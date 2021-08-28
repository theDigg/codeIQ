// import { Meteor } from 'meteor/meteor';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  challenges: [],
  challenge: {},
  results: {},
};

export const golfSlice = createSlice({
  name: 'golf',
  initialState,
  reducers: {
    setChallenges: (state, action) => {
      state.challenges = action.payload;
    },
    setChallenge: (state, action) => {
      state.challenge = action.payload;
    },
    setResults: (state, action) => {
      state.results = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setChallenges, setChallenge, setResults } = golfSlice.actions;

export default golfSlice.reducer;
