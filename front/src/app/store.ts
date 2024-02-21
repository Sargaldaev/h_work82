import { configureStore } from '@reduxjs/toolkit';
import { artistReducer } from '../store/artist/artistsSlice.ts';
import { albumReducer } from '../store/album/albumSlice.ts';

export const store = configureStore({
  reducer: {
    artist: artistReducer,
    album:albumReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
