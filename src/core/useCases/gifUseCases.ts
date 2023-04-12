import { Gif } from '../domain/Gif';
import { GifRepository } from '../domain/GifRepository';

export interface SearchGifsParams {
  search: string;
  limit: number;
}

export const gifUseCases = ( gifRepository: GifRepository) => ({

   searchGifs: async ({ search, limit }: SearchGifsParams): Promise<Gif[]> => {
    const gifs = await (await gifRepository.searchGifs(search, limit ));
    return gifs;
  },
});


