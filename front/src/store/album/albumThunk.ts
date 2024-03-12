import axiosApi from '../../axiosApi.ts';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { Album, AlbumCreate, AlbumInfo } from '../../types';

export const fetchDataAlbum = createAsyncThunk<Album[], string>(
  'album/fetchDataAlbum',
  async (id) => {
    const { data } = await axiosApi.get<Album[]>(`/albums?artist=${id}`);
    return data;
  },
);

export const fetchDataAlbumAll = createAsyncThunk<Album[]>('album/fetchDataAlbumAll', async () => {
  const { data } = await axiosApi.get<Album[]>(`/albums`);
  return data;
});

export const fetchDataAlbumInfo = createAsyncThunk<AlbumInfo, string>(
  'album/fetchDataAlbumInfo',
  async (id) => {
    const { data } = await axiosApi.get<AlbumInfo>(`/albums/${id}`);
    return data;
  },
);

export const createAlbum = createAsyncThunk<void, AlbumCreate>(
  'album/createAlbum',
  async (album) => {
    const formData = new FormData();
    formData.append('name', album.name);
    formData.append('artist', album.artist);
    formData.append('releaseYear', album.releaseYear);

    if (album.image) {
      formData.append('image', album.image);
    }
    await axiosApi.post('/albums', formData);
  },
);

export const deleteAlbum = createAsyncThunk<void, string>('album/delete', async (_id) => {
  await axiosApi.delete(`/albums/${_id}`);
});

export const publishedAlbum = createAsyncThunk<void, string>('album/published', async (_id) => {
  await axiosApi.patch(`/albums/${_id}/togglePublished`);
});
