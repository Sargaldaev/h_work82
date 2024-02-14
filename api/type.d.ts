import {Schema} from 'mongoose';

export interface UserFields {
  username: string;
  password: string;
  token:string;
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