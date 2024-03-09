import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Album, AlbumInfo } from '../../types';
import {
  createAlbum,
  deleteAlbum,
  fetchDataAlbum,
  fetchDataAlbumAll,
  fetchDataAlbumInfo,
  publishedAlbum
} from './albumThunk.ts';

export interface AlbumState {
  albums: Album[];
  albumsAll: Album[];
  albumsInfo: AlbumInfo | null;
  fetchLoad: boolean;
  createLoad: boolean;
  deleteAlbumLoad: string;
  publishedAlbumLoad: string;
}

const initialState: AlbumState = {
  albums: [],
  albumsAll: [],
  albumsInfo: null,
  fetchLoad: false,
  createLoad: false,
  deleteAlbumLoad: '',
  publishedAlbumLoad: '',
};

export const albumSlice = createSlice({
  name: 'album',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchDataAlbum.pending, (state: AlbumState) => {
      state.fetchLoad = true;
    });
    builder.addCase(fetchDataAlbum.fulfilled, (state: AlbumState, action: PayloadAction<Album[]>) => {
      state.fetchLoad = false;
      state.albums = action.payload;
    });
    builder.addCase(fetchDataAlbum.rejected, (state: AlbumState) => {
      state.fetchLoad = false;
    });


    builder.addCase(fetchDataAlbumInfo.pending, (state: AlbumState) => {
      state.fetchLoad = true;
    });
    builder.addCase(fetchDataAlbumInfo.fulfilled, (state: AlbumState, action: PayloadAction<AlbumInfo>) => {
      state.fetchLoad = false;
      state.albumsInfo = action.payload || null;
    });
    builder.addCase(fetchDataAlbumInfo.rejected, (state: AlbumState) => {
      state.fetchLoad = false;
    });


    builder.addCase(createAlbum.pending, (state: AlbumState) => {
      state.createLoad = true;
    });
    builder.addCase(createAlbum.fulfilled, (state: AlbumState) => {
      state.createLoad = false;
    });
    builder.addCase(createAlbum.rejected, (state: AlbumState) => {
      state.createLoad = false;
    });


    builder.addCase(fetchDataAlbumAll.pending, (state: AlbumState) => {
      state.fetchLoad = true;
    });
    builder.addCase(fetchDataAlbumAll.fulfilled, (state: AlbumState, action: PayloadAction<Album[]>) => {
      state.fetchLoad = false;
      state.albumsAll = action.payload;
    });
    builder.addCase(fetchDataAlbumAll.rejected, (state: AlbumState) => {
      state.fetchLoad = false;
    });


    builder.addCase(deleteAlbum.pending, (state: AlbumState, action) => {
      state.deleteAlbumLoad = action.meta.arg || '';
    });
    builder.addCase(deleteAlbum.fulfilled, (state: AlbumState) => {
      state.deleteAlbumLoad = '';
    });
    builder.addCase(deleteAlbum.rejected, (state: AlbumState) => {
      state.deleteAlbumLoad = '';
    });


    builder.addCase(publishedAlbum.pending, (state: AlbumState, action) => {
      state.publishedAlbumLoad = action.meta.arg || '';
    });
    builder.addCase(publishedAlbum.fulfilled, (state: AlbumState) => {
      state.publishedAlbumLoad = '';
    });
    builder.addCase(publishedAlbum.rejected, (state: AlbumState) => {
      state.publishedAlbumLoad = '';
    });

  },

});

export const albumReducer = albumSlice.reducer;
