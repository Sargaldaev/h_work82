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

export const deleteTrack = createAsyncThunk<void, string>('track/deleteTrack', async (_id) => {
  await axiosApi.delete(`/tracks/${_id}`);
});

export const publishedTrack = createAsyncThunk<void, string>('track/published', async (_id) => {
  await axiosApi.patch(`/tracks/${_id}/togglePublished`);
});
