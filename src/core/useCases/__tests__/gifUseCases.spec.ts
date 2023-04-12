import { GifRepository } from '../../domain/GifRepository';
import { mock } from 'jest-mock-extended';
import { gifUseCases  } from '../gifUseCases';

class Dummy {
  id: string;
  title: string;
  tags: string[];
  url: string;

  constructor(id: string, title: string, tags: string[], url: string) {
    this.id = id;
    this.title = title;
    this.tags = tags;
    this.url = url;
  }
}

describe('Gif use case', () => {
  it('return no gifs for searchGifs', async () => {
    const gifRepository = mock<GifRepository>();
    gifRepository.searchGifs.mockResolvedValue([]);

    const gifs = await gifUseCases(gifRepository).searchGifs({search: 'dog', limit: 10});
    expect(gifs).toHaveLength(0);
  });
  it('return una lista de gifs for searchGifs', async () => {
    const gifRepository = mock<GifRepository>();
    const Dummy1 = new Dummy('1', '', [], '');
    const Dummy2 = new Dummy('2', '', [], '');
    const Dummy3 = new Dummy('3', '', [], '');
    const Dummy4 = new Dummy('4', '', [], '');
    gifRepository.searchGifs.mockResolvedValue([Dummy1, Dummy2, Dummy3, Dummy4]);

    const gifs = await gifUseCases(gifRepository).searchGifs({search: '', limit: 10});
    expect(gifs).toHaveLength(4);
  });
});
