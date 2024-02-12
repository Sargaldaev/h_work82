import mongoose from 'mongoose';

export interface IArtistCreate {
  name: string;
  image: string | null;
  description: string | null;
}

export interface IAlbumCreate {
  name: string;
  artist: string;
  image: string | null;
  releaseYear: string;
}

export interface ITrackCreate {
  name: string;
  album: mongoose.Types.ObjectId;
  duration: string;
}