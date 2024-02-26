export interface Artist {
  _id: string;
  name: string;
  image: string | null;
}

export interface Album {
  _id:string;
  name: string;
  artist: string;
  image: string | null;
  releaseYear: number;
}

export interface Track {
  _id: string;
  name: string;
  album: Album;
  duration: string;
  songNumber: number;
  youTube:string
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
  username: string;
  password: string;
  token: string;
}

export interface Login {
  username: string;
  password: string;
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

