import { Platform } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import { Gif } from '../domain/Gif';
import { GifRepository } from '../domain/GifRepository';
import { gifAffinityApi } from '../shared/api/gifAffinityApi';

interface GifDto {
  title: string;
  url: string;
  tags: string[];
  id: string;
}

export const apiGifRepository: GifRepository = {
  searchGifs: async (search: string, limit: number): Promise<Gif[]> => {
    const iosUrl = 'localhost:4000';
    const androidUrl = '10.0.2.2:4000';
    const SERVER = Platform.OS === 'android' && DeviceInfo.isEmulatorSync() ? androidUrl : iosUrl;
    const url = `http://${SERVER}/memes/search?limit=${limit}&search=${search}`;
    const response = await gifAffinityApi.get<GifDto[]>(url);
    return response.data;
  },
};
