import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Album, AlbumInfo } from '../../types';
import { createAlbum, fetchDataAlbum, fetchDataAlbumAll, fetchDataAlbumInfo } from './albumThunk.ts';

export interface ArtistState {
  albums: Album[];
  albumsAll: Album[];
  albumsInfo: AlbumInfo | null;
  fetchLoad: boolean;
  createLoad: boolean;
}

const initialState: ArtistState = {
  albums: [],
  albumsAll: [],
  albumsInfo: null,
  fetchLoad: false,
  createLoad: false
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


    builder.addCase(createAlbum.pending, (state: ArtistState) => {
      state.createLoad = true;
    });
    builder.addCase(createAlbum.fulfilled, (state: ArtistState) => {
      state.createLoad = false;
    });
    builder.addCase(createAlbum.rejected, (state: ArtistState) => {
      state.createLoad = false;
    });


    builder.addCase(fetchDataAlbumAll.pending, (state: ArtistState) => {
      state.fetchLoad = true;
    });
    builder.addCase(fetchDataAlbumAll.fulfilled, (state: ArtistState, action: PayloadAction<Album[]>) => {
      state.fetchLoad = false;
      state.albumsAll = action.payload;
    });
    builder.addCase(fetchDataAlbumAll.rejected, (state: ArtistState) => {
      state.fetchLoad = false;
    });

  },

});

export const albumReducer = albumSlice.reducer;
