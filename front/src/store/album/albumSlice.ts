import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Album, AlbumInfo } from '../../types';
import { fetchDataAlbum, fetchDataAlbumInfo } from './albumThunk.ts';

export interface ArtistState {
  albums: Album[];
  albumsInfo: AlbumInfo | null;
  fetchLoad: boolean;
}

const initialState: ArtistState = {
  albums: [],
  albumsInfo: null,
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
    builder.addCase(fetchDataAlbum.fulfilled, (state: ArtistState, action: PayloadAction<Album[]>) => {
      state.fetchLoad = false;
      state.albums = action.payload;
    });
    builder.addCase(fetchDataAlbum.rejected, (state: ArtistState) => {
      state.fetchLoad = false;
    });

    builder.addCase(fetchDataAlbumInfo.pending, (state: ArtistState) => {
      state.fetchLoad = true;
    });
    builder.addCase(fetchDataAlbumInfo.fulfilled, (state: ArtistState, action: PayloadAction<AlbumInfo>) => {
      state.fetchLoad = false;
      state.albumsInfo = action.payload || null;
    });
    builder.addCase(fetchDataAlbumInfo.rejected, (state: ArtistState) => {
      state.fetchLoad = false;
    });
  },

});

export const albumReducer = albumSlice.reducer;
