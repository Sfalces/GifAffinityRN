import React from 'react';
import { View } from 'react-native';
import { GifList } from '../components/GifList';
import { Header } from '../components/Header';
import { SearchBar } from '../components/SearchBar';
import { useState } from 'react';
import { useDebouncedValue } from '../hooks/useDebouncedValue';
import { useGifs } from '../hooks/useGifs';


export const HomeScreen = () => {

  const [search, setSearch] = useState('');

  const debouncedValue = useDebouncedValue(search);

  const {gifs, loadGifs, nextPage} = useGifs(debouncedValue);

  return (
    <View>
      <Header />
      <SearchBar
        search={ search }
        onSearch= { setSearch }
      />
      <GifList
        search= { search }
        debouncedValue= { debouncedValue }
        gifs= { gifs }
        loadGifs= { loadGifs }
        nextPage = { nextPage }
     />
    </View>
  );
};
