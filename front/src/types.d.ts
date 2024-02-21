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
