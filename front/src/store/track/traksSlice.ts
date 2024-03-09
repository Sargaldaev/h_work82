import { Track } from '../../types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createTrack, deleteTrack, fetchDataTrack, publishedTrack } from './trackThunk';

export interface TrackState {
  tracks: Track[];
  createLoad: boolean,
  urlYoutube: string,
  fetchLoadTrack: boolean,
  deleteLoadTrack: string,
  publishedTrackLoad: string,
}

const initialState: TrackState = {
  tracks: [],
  urlYoutube: '',
  createLoad: false,
  fetchLoadTrack: false,
  deleteLoadTrack: '',
  publishedTrackLoad: ''
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


    builder.addCase(createTrack.pending, (state: TrackState) => {
      state.createLoad = true;
    });
    builder.addCase(createTrack.fulfilled, (state: TrackState) => {
      state.createLoad = false;
    });
    builder.addCase(createTrack.rejected, (state: TrackState) => {
      state.createLoad = false;
    });


    builder.addCase(deleteTrack.pending, (state: TrackState, action) => {
      state.deleteLoadTrack = action.meta.arg || '';
    });
    builder.addCase(deleteTrack.fulfilled, (state: TrackState) => {
      state.deleteLoadTrack = '';
    });
    builder.addCase(deleteTrack.rejected, (state: TrackState) => {
      state.deleteLoadTrack = '';
    });



    builder.addCase(publishedTrack.pending, (state: TrackState, action) => {
      state.publishedTrackLoad = action.meta.arg || '';
    });
    builder.addCase(publishedTrack.fulfilled, (state: TrackState) => {
      state.publishedTrackLoad = '';
    });
    builder.addCase(publishedTrack.rejected, (state: TrackState) => {
      state.publishedTrackLoad = '';
    });
  },
});

export const trackReducer = trackSlice.reducer;
export const {onPlayYouTube, onClose} = trackSlice.actions;
