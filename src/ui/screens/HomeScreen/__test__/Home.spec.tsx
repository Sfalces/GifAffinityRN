import React from 'react';
import { render, screen } from '@testing-library/react-native';
import { Home } from '../Home';
import { QueryClient, QueryClientProvider } from 'react-query';
import { gifs } from '../../../../core/shared/mocks/gifList';
import { gifAffinityApi } from '../../../../core/shared/api/gifAffinityApi';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 0,
      retry: false,
    },
  },
});

const renderHome = () => {
  return render(
    <QueryClientProvider client={queryClient}>
      <Home />
    </QueryClientProvider>
  );
};

jest.mock('react-native-device-info', () => ({isEmulatorSync:jest.fn()}));

describe('Home', () => {
  it('the logo of the app is visible', async () => {

    jest.spyOn(gifAffinityApi, 'get').mockResolvedValue({ data: gifs });

    renderHome();

    const logo = await screen.findByTestId(/logo/);
    expect(logo).toBeDefined();
  });
  it('searchBar is visible', async () => {

    jest.spyOn(gifAffinityApi, 'get').mockResolvedValue({ data: gifs });

    renderHome();

    const searchBar = await screen.findByTestId(/searchBar/);
    expect(searchBar).toBeDefined();
  });
  it('should render a title for the gif list', async () => {

    jest.spyOn(gifAffinityApi, 'get').mockResolvedValue({ data: gifs });

    renderHome();

    const title =  await screen.findByText(/Listado de gifs/i);
    expect(title).toBeDefined();
  });
  it('should render a gif list', async () => {

    jest.spyOn(gifAffinityApi, 'get').mockResolvedValue({ data: gifs });

    renderHome();

    const gif =  await screen.findAllByTestId(/gifItem:*/i);
    expect(gif).toHaveLength(8);
  });
  it('should render the first gif of gif list', async () => {

    jest.spyOn(gifAffinityApi, 'get').mockResolvedValue({ data: gifs });

    renderHome();

    const gif = await screen.findByTestId(/gifItem:git-merge1/i);
    expect(gif).toBeDefined();
  });
});
