import axiosApi from '../../axiosApi.ts';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { Album, AlbumInfo } from '../../types';

export const fetchDataAlbum = createAsyncThunk<Album[], string>(
  'album/fetchDataAlbum',
  async (id) => {
    const {data} = await axiosApi.get<Album[]>(`/albums?artist=${id}`);
    return data;
  },
);

export const fetchDataAlbumInfo = createAsyncThunk<AlbumInfo, string>(
  'album/fetchDataAlbumInfo',
  async (id) => {
    const { data } = await axiosApi.get<AlbumInfo>(`/albums/${id}`);
    return data;
  },
);