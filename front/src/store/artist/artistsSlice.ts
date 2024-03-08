import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createArtist, fetchData } from './artistThunk.ts';
import { Artist } from '../../types';

export interface ArtistState {
  artists: Artist[];
  fetchLoad: boolean;
  createLoad: boolean;
}

const initialState: ArtistState = {
  artists: [],
  fetchLoad: false,
  createLoad:false
};

export const artistSlice = createSlice({
  name: 'artist',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchData.pending, (state: ArtistState) => {
      state.fetchLoad = true;
    });
    builder.addCase(fetchData.fulfilled, (state: ArtistState, action:PayloadAction<Artist[]>) => {
      state.fetchLoad = false;
      state.artists = action.payload;
    });
    builder.addCase(fetchData.rejected, (state: ArtistState) => {
      state.fetchLoad = false;
    });


    builder.addCase(createArtist.pending, (state: ArtistState) => {
      state.createLoad = true;
    });
    builder.addCase(createArtist.fulfilled, (state: ArtistState) => {
      state.createLoad = false;
    });
    builder.addCase(createArtist.rejected, (state: ArtistState) => {
      state.createLoad = false;
    });

  },
});

export const artistReducer = artistSlice.reducer;
