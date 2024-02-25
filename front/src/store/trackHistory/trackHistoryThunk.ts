import axiosApi from '../../axiosApi.ts';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../../app/store.ts';
import { Track, TrackHistory } from '../../types';


export const historyTrackData = createAsyncThunk<TrackHistory[], undefined, { state: RootState }>(
  'historyTrack/historyTrackData',
  async (_, thunkAPI) => {

    const userToken = thunkAPI.getState().user.user?.token;
    const {data} = await axiosApi.get<TrackHistory[]>(`/track_histories`, {
      headers: {
        'Authorization': userToken
      }
    });
    return data;
  }
);

export const historyTrackPost = createAsyncThunk<Track, string, { state: RootState }>(
  'historyTrack/historyTrackPost',
  async (id, thunkAPI) => {

    const userToken = thunkAPI.getState().user.user?.token;
    const {data} = await axiosApi.post<Track>(`/track_histories`, {track: id}, {
      headers: {
        'Authorization': userToken
      }
    });
    return data;
  }
);