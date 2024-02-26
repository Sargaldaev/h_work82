import { Track } from '../../types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchDataTrack } from './trackThunk';

export interface TrackState {
  tracks: Track[];
  urlYoutube: string;
  fetchLoadTrack: boolean;
}

const initialState: TrackState = {
  tracks: [],
  urlYoutube: '',
  fetchLoadTrack: false,
};

export const trackSlice = createSlice({
  name: 'track',
  initialState,
  reducers: {
    onPlayYouTube: (state, action) => {
      state.urlYoutube = action.payload;
    },

    onClose: (state) => {
      state.urlYoutube = '';
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchDataTrack.pending, (state: TrackState) => {
      state.fetchLoadTrack = true;
    });
    builder.addCase(fetchDataTrack.fulfilled, (state: TrackState, action: PayloadAction<Track[]>) => {
      state.fetchLoadTrack = false;
      state.tracks = action.payload;
    });
    builder.addCase(fetchDataTrack.rejected, (state: TrackState) => {
      state.fetchLoadTrack = false;
    });
  },
});

export const trackReducer = trackSlice.reducer;
export const {onPlayYouTube, onClose} = trackSlice.actions;
