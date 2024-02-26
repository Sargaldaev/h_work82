import mongoose, {Model, Schema} from 'mongoose';
import user from './models/User';

export interface UserFields {
  username: string;
  password: string;
  token: string;
}

export interface ArtistCreate {
  name: string;
  image: string | null;
  description: string | null;
}

export interface AlbumCreate {
  name: string;
  artist: string;
  image: string | null;
  releaseYear: number;
}

export interface TrackCreate {
  name: string;
  album: Schema.Types.ObjectId;
  duration: string;
  songNumber:number;
  youTube: string;
}


export interface Track_history {
  user: user;
  track: mongoose.Types.ObjectId;
  datetime: Date;
}

export interface TrackHistoryMutationOne {
  _id: mongoose.Types.ObjectId;
  user: mongoose.Types.ObjectId;
  track: ITrackPost;
  datetime: Date;
}

export interface TrackHistoryMutation {
  _id: mongoose.Types.ObjectId;
  user?: mongoose.Types.ObjectId;
  track: ITrackMutation;
  datetime: Date;
}

export interface AlbumsPostMutation {
  name?: string;
  artist: IArtistPost;
  image?: string | null;
  releaseYear?: number;
}