import axiosApi from '../../axiosApi.ts';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { Track, TrackHistory } from '../../types';

export const historyTrackData = createAsyncThunk<TrackHistory[], undefined>(
  'historyTrack/historyTrackData',
  async () => {
    const { data } = await axiosApi.get<TrackHistory[]>(`/track_histories`);
    return data;
  },
);

export const historyTrackPost = createAsyncThunk<Track, string>(
  'historyTrack/historyTrackPost',
  async (id) => {
    const { data } = await axiosApi.post<Track>(`/track_histories`, { track: id });
    return data;
  },
);
