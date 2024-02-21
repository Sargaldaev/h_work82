import { createSlice } from '@reduxjs/toolkit';
import { fetchData } from './artistThunk.ts';
import { Artist } from '../../types';

export interface ArtistState {
  artists: Artist[];
  fetchLoad: boolean;
}

const initialState: ArtistState = {
  artists: [],
  fetchLoad: false,
};

export const artistSlice = createSlice({
  name: 'artist',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchData.pending, (state: ArtistState) => {
      state.fetchLoad = true;
    });

    builder.addCase(fetchData.fulfilled, (state: ArtistState, action) => {
      state.fetchLoad = false;
      state.artists = action.payload;
    });

    builder.addCase(fetchData.rejected, (state: ArtistState) => {
      state.fetchLoad = false;
    });
  },
});

export const artistReducer = artistSlice.reducer;
