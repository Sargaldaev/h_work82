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
}


export interface AlbumInfo {
  _id: string;
  name: string;
  artist: Artist;
  image: string | null;
  releaseYear: string;
}

