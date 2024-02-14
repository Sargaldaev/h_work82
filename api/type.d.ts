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
  releaseYear: string;
}

export interface TrackCreate {
  name: string;
  album: Schema.Types.ObjectId;
  duration: string;
}



export interface Track_history {
  user: user
  track: mongoose.Types.ObjectId;
  datetime: Date;
}


interface UserMethods {
  checkPassword(password: string): Promise<boolean>;

  generateToken(): void;
}

type UserModel = Model<UserFields, {}, UserMethods>;