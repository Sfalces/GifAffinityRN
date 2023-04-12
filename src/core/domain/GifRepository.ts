import { Gif } from './Gif';

export interface GifRepository {
  searchGifs(search: string, limit: number): Promise<Gif[]>;
}
