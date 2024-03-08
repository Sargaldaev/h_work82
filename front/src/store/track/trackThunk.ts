import axiosApi from '../../axiosApi.ts';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { Track, TrackCreate } from '../../types';

export const fetchDataTrack = createAsyncThunk<Track[], string>(
  'track/fetchDataTrack',
  async (id) => {
    const { data } = await axiosApi.get<Track[]>(`/tracks?album=${id}`);
    return data;
  },
);

export const createTrack = createAsyncThunk<void, TrackCreate>(
  'album/createTrack',
  async (track) => {
    await axiosApi.post('/tracks', track);
  },
);