import axiosApi from '../../axiosApi.ts';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { Album } from '../../types';

export const fetchDataAlbum = createAsyncThunk<Album[], string>(
  'album/fetchDataAlbum',
  async (id) => {
    const {data} = await axiosApi.get<Album[]>(`/albums?artist=${id}`);
    return data;
  },
);