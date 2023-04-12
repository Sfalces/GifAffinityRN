import { gifs } from './gifList';

export const gifUseCases = () => ({
  searchGifs: jest.fn().mockResolvedValue({
    data: gifs,
  }),
});
