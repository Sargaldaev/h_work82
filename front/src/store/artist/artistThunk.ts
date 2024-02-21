import axiosApi from '../../axiosApi.ts';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { Artist } from '../../types';

export const fetchData = createAsyncThunk<Artist[]>(
  'Artist/fetchData', async () => {
    const {data} = await axiosApi.get<Artist[]>('/artists');
    return data;
  });
