import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createArtist, deleteArtist, fetchData, publishedArtist } from './artistThunk.ts';
import { Artist } from '../../types';

export interface ArtistState {
  artists: Artist[];
  fetchLoad: boolean;
  createLoad: boolean;
  deleteLoad: string;
  publishedArtistLoad: string;
}

const initialState: ArtistState = {
  artists: [],
  fetchLoad: false,
  createLoad: false,
  deleteLoad: '',
  publishedArtistLoad: '',
};

export const artistSlice = createSlice({
  name: 'artist',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchData.pending, (state: ArtistState) => {
      state.fetchLoad = true;
    });
    builder.addCase(fetchData.fulfilled, (state: ArtistState, action: PayloadAction<Artist[]>) => {
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

    builder.addCase(deleteArtist.pending, (state: ArtistState, action) => {
      state.deleteLoad = action.meta.arg || '';
    });
    builder.addCase(deleteArtist.fulfilled, (state: ArtistState) => {
      state.deleteLoad = '';
    });
    builder.addCase(deleteArtist.rejected, (state: ArtistState) => {
      state.deleteLoad = '';
    });

    builder.addCase(publishedArtist.pending, (state: ArtistState, action) => {
      state.publishedArtistLoad = action.meta.arg || '';
    });
    builder.addCase(publishedArtist.fulfilled, (state: ArtistState) => {
      state.publishedArtistLoad = '';
    });
    builder.addCase(publishedArtist.rejected, (state: ArtistState) => {
      state.publishedArtistLoad = '';
    });
  },
});

export const artistReducer = artistSlice.reducer;
