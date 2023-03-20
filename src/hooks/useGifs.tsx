import { useState } from 'react';
import { gifAffinityApi } from '../api/gifAffinityApi';
import { Gif } from '../interfaces/interfaces';

export const SERVER = 'localhost:4000';

export const useGifs = (search: string) => {

  const [ gifs, setGif ] = useState<Gif[]>([]);

  const [page, setPage] = useState(20);


  const url = (`http://${SERVER}/memes/search?limit=${page}&search=${search}`);


  const loadGifs = async () => {
    const resp = await gifAffinityApi.get<Gif[]>(url);
    setGif(resp.data);
    setPage(page + 20);
  };

  const nextPage = async() => {
    const resp = await gifAffinityApi.get<Gif[]>(url);
    setGif(resp.data);
    setPage(page + 20);
  };

  return {
    gifs,
    loadGifs,
    nextPage,
  };
};
