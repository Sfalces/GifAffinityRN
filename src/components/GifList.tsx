/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { FlatList, Text, View, ActivityIndicator, StyleSheet } from 'react-native';
import { useEffect } from 'react';
import { Gif } from '../interfaces/interfaces';
import { Dimensions } from 'react-native';
import FastImage from 'react-native-fast-image';


interface Props {
  search: string;
  debouncedValue: string;
  loadGifs: () => Promise<void>;
  nextPage: () => Promise<void>;
  gifs: Gif[];
}
const { width } = Dimensions.get('window');

export const GifList = ({ debouncedValue, loadGifs, nextPage, gifs  }: Props) => {


  useEffect(() => {
    loadGifs();
  }, [debouncedValue]);

  console.log(gifs.length);

  return (
    <View style={{...styles.gifList}}>

      <FlatList
        data= { gifs }
        keyExtractor= {( meme ) => meme.id}
        showsVerticalScrollIndicator= {false}
        showsHorizontalScrollIndicator= {false}
        numColumns= {2}
        ListHeaderComponent={(
          <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold'}}>
            Listado de Gifs
          </Text>
        )}
        renderItem= {( {item} ) => (
          <View>
            <FastImage
            style= {styles.gifImg}
              source={{
                uri: `${item.url}`,
                priority: FastImage.priority.high,
              }}
              resizeMode= { FastImage.resizeMode.cover}
            />
          </View>
        )}

        onEndReached= {nextPage}
        onEndReachedThreshold={0.4}

        ListFooterComponent={
          <ActivityIndicator
            style={{ height: 100}}
            size= { 20 }
            color= "grey"
          />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
    gifList: {
      flex: 1,
      width: width,
      marginHorizontal: 20,
      marginVertical: 20,
    },
    gifImg: {
      marginHorizontal: 20,
      marginVertical: 10,
      width: width / 2 - 60,
      aspectRatio: 1,
    },
});
