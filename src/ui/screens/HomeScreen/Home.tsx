/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { GifList, GifListRef } from './_components/GifList';
import { Header } from '../../../_components/Header';
import { SearchBar } from './_components/SearchBar';
import { useDebouncedValue } from '../../_hooks/useDebouncedValue';
import { gifUseCases } from '../../../core/useCases/gifUseCases';
import { apiGifRepository } from '../../../core/infraestructure/apiGifRepository';
import { useQuery } from 'react-query';


const { searchGifs } = gifUseCases(apiGifRepository);

export const Home = () => {


  const listRef = useRef<GifListRef>();

  const goTop = () => {
    listRef.current?.GoTop();
  };

  const [searchText, setSearch] = useState('');

  const [page, setPage] = useState(20);

  const debouncedText = useDebouncedValue(searchText);

  const { data: gifs } = useQuery(
    ['gifs', debouncedText, page],
    () => searchGifs({ search: searchText, limit: page }),
    {
      keepPreviousData: true,
    }
  );

  useEffect(() => {
    setPage(20);
    goTop();
  }, [debouncedText]);

  if (gifs === undefined) {
    return <ActivityIndicator style={styles.loader} size="large" />;
  }


  return (
    <View style= {{flex: 1}}>
      <Header />
      <SearchBar
        text={ searchText }
        onSearch= { setSearch }
      />
      <GifList
        gifs= { gifs }
        onNextPage= {() => setPage( page + 20 )}
        debouncedText= { debouncedText }
        ref={listRef}
     />
    </View>
  );
};

const styles = StyleSheet.create({
  loader: {
    flex: 1,
  },
});
