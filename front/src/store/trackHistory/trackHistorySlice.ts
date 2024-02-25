import { TrackHistory } from '../../types';
import { createSlice } from '@reduxjs/toolkit';
import { historyTrackData } from './trackHistoryThunk.ts';

export interface historyTrackState {
  trackHistory: TrackHistory[];
}

const initialState: historyTrackState = {
  trackHistory: [],
};

export const historyTrackSlice = createSlice({
  name: 'historyTrack',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(historyTrackData.fulfilled, (state: historyTrackState, action) => {
      state.trackHistory = action.payload;
    });

  },
});

export const historyTrackReducer = historyTrackSlice.reducer;
