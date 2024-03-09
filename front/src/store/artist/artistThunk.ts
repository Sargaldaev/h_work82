import axiosApi from '../../axiosApi.ts';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { Artist, ArtistCreate } from '../../types';

export const fetchData = createAsyncThunk<Artist[]>(
  'Artist/fetchData', async () => {
    const {data} = await axiosApi.get<Artist[]>('/artists');
    return data;
  });

export const createArtist = createAsyncThunk<void, ArtistCreate>(
  'artist/createArtist',
  async (artist) => {
    const formData = new FormData();
    formData.append('name', artist.name);
    if (artist.description) {
      formData.append('description', artist.description);
    }
    if (artist.image) {
      formData.append('image', artist.image);
    }
    await axiosApi.post('/artists', formData);
  },
);

export const deleteArtist = createAsyncThunk<void, string>('artist/delete', async (_id) => {
  await axiosApi.delete(`/artists/${_id}`);
});

export const publishedArtist = createAsyncThunk<void, string>('artist/published', async (_id) => {
  await axiosApi.patch(`/artists/${_id}/togglePublished`);
});