import mongoose, { Schema } from 'mongoose';
import user from './models/User';

export interface UserFields {
  username: string;
  displayName: string;
  googleID?: string;
  githubID?: string;
  avatar?: string;
  password: string;
  token: string;
  role: string;
}

export interface ArtistCreate {
  user: user;
  name: string;
  image: string | null;
  description: string | null;
  isPublished: boolean;
}

export interface AlbumCreate {
  user: user;
  name: string;
  artist: string;
  image: string | null;
  releaseYear: number;
  isPublished: boolean;
}

export interface TrackCreate {
  user: user;
  name: string;
  album: Schema.Types.ObjectId;
  duration: string;
  songNumber: number;
  youTube: string;
  isPublished: boolean;
}

export interface TrackMutation {
  name: string;
  album: AlbumsPostMutation;
  duration?: string;
  songNumber?: number;
}

export interface Track_history {
  user: user;
  track: mongoose.Types.ObjectId;
  datetime: Date;
}

export interface TrackHistoryMutationOne {
  _id: mongoose.Types.ObjectId;
  user: mongoose.Types.ObjectId;
  track: TrackCreate;
  datetime: Date;
}

export interface TrackHistoryMutation {
  _id: mongoose.Types.ObjectId;
  user?: mongoose.Types.ObjectId;
  track: TrackMutation;
  datetime: Date;
}

export interface AlbumsPostMutation {
  name?: string;
  artist: ArtistCreate;
  image?: string | null;
  releaseYear?: number;
}
