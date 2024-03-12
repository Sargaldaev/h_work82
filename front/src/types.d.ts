export interface Artist {
  _id: string;
  user:string;
  name: string;
  image: string | null;
  isPublished:boolean;
}

export interface ArtistCreate {
  name: string;
  description: string | null;
  image: File | null;
}

export interface Album {
  user:string;
  _id: string;
  name: string;
  artist: Artist;
  image: string | null;
  releaseYear: number;
  isPublished:boolean;
}

export interface AlbumCreate {
  name: string;
  artist: string;
  image: File | null;
  releaseYear: string;
}

export interface Track {
  _id: string;
  user:string;
  name: string;
  album: Album;
  duration: string;
  songNumber: number;
  youTube: string;
  isPublished:boolean;
}

export interface TrackCreate {
  name: string;
  album: string;
  duration: string;
  songNumber: string;
  youTube: string;
}


export interface AlbumInfo {
  _id: string;
  name: string;
  artist: Artist;
  image: string | null;
  releaseYear: string;
}

export interface TrackHistory {
  _id: string;
  user: string;
  track: Track;
  datetime: string;
}

export interface Register {
  username: string;
  password: string;
}

export interface User {
  _id: string;
  role:string;
  displayName:string;
  username: string;
  password: string;
  token: string;
}

export interface Login {
  username: string;
  password: string;
}

export interface RegisterResponse {
  message: string;
  user: User;
}

export interface ValidationError {
  errors: {
    [key: string]: {
      name: string;
      message: string;
    };
  };
  message: string;
  name: string;
  _message: string;
}

export interface GlobalError {
  error: string;
}

