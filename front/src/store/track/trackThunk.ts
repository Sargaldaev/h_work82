import axiosApi from '../../axiosApi.ts';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { Track } from '../../types';

export const fetchDataTrack = createAsyncThunk<Track[], string>(
  'track/fetchDataTrack',
  async (id) => {
    const { data } = await axiosApi.get<Track[]>(`/tracks?album=${id}`);
    return data;
  },
);