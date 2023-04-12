import { useState } from 'react';
import { Platform } from 'react-native';
import { gifAffinityApi } from '../../core/shared/api/gifAffinityApi';
import DeviceInfo from 'react-native-device-info';
import { Gif } from '../../core/domain/Gif';

// export const SERVER = 'localhost:4000';

const iosUrl = 'localhost:4000';
const androidUrl = '10.0.2.2:4000';
const SERVER = Platform.OS === 'android' && DeviceInfo.isEmulatorSync() ? androidUrl : iosUrl;

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
