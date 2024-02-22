import { Track } from '../../types';
import { createSlice } from '@reduxjs/toolkit';
import { fetchDataTrack } from './trackThunk';

export interface TrackState {
  tracks: Track[];
  fetchLoadTrack: boolean;
}

const initialState: TrackState = {
  tracks: [],
  fetchLoadTrack: false,
};

export const trackSlice = createSlice({
  name: 'track',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchDataTrack.pending, (state: TrackState) => {
      state.fetchLoadTrack = true;
    });
    builder.addCase(fetchDataTrack.fulfilled, (state: TrackState, action) => {
      state.fetchLoadTrack = false;
      state.tracks = action.payload;
    });
    builder.addCase(fetchDataTrack.rejected, (state: TrackState) => {
      state.fetchLoadTrack = false;
    });
  },
});

export const trackReducer = trackSlice.reducer;
