import { createSlice } from '@reduxjs/toolkit';
import { Album } from '../../types';
import { fetchDataAlbum } from './albumThunk.ts';

export interface ArtistState {
  albums: Album[];
  fetchLoad: boolean;
}

const initialState: ArtistState = {
  albums: [],
  fetchLoad: false,
};

export const albumSlice = createSlice({
  name: 'album',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchDataAlbum.pending, (state: ArtistState) => {
      state.fetchLoad = true;
    });
    builder.addCase(fetchDataAlbum.fulfilled, (state: ArtistState, action) => {
      state.fetchLoad = false;
      state.albums = action.payload;
    });
    builder.addCase(fetchDataAlbum.rejected, (state: ArtistState) => {
      state.fetchLoad = false;
    });
  },

});

export const albumReducer = albumSlice.reducer;
