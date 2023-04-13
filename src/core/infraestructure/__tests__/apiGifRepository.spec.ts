import DeviceInfo from 'react-native-device-info';
import { apiGifRepository } from '../apiGifRepository';
import { gifAffinityApi } from '../../shared/api/gifAffinityApi';
import { gifs } from '../../shared/mocks/gifList';

jest.mock('react-native-device-info', () => ({isEmulatorSync:jest.fn()}));
jest.mock('react-native', () => ({Platform:{OS: 'android'}}));


describe('Gif apiRepository', () => {

  it('should call get method', async () => {

    jest.spyOn(DeviceInfo, 'isEmulatorSync').mockReturnValue(true);
    jest.spyOn(gifAffinityApi, 'get').mockResolvedValue({ data: gifs });

    await apiGifRepository.searchGifs('dog', 10);

    expect(gifAffinityApi.get).toHaveBeenCalled();
  });
  it('should call get method using android url', async () => {

    jest.spyOn(gifAffinityApi, 'get').mockResolvedValue({ data: gifs });
    jest.spyOn(DeviceInfo, 'isEmulatorSync').mockReturnValue(true);

    await apiGifRepository.searchGifs('dog', 10);

    expect(gifAffinityApi.get).toHaveBeenCalledWith('http://10.0.2.2:4000/memes/search?limit=10&search=dog');

  });
  it('should call get method using IOS url', async () => {

    jest.spyOn(gifAffinityApi, 'get').mockResolvedValue({ data: gifs });
    jest.spyOn(DeviceInfo, 'isEmulatorSync').mockReturnValue(false);

    await apiGifRepository.searchGifs('dog', 10);

    expect(gifAffinityApi.get).toHaveBeenCalledWith('http://localhost:4000/memes/search?limit=10&search=dog');

  });
});
