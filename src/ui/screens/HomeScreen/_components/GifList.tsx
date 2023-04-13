/* eslint-disable react-native/no-inline-styles */
import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import { FlatList, Text, View, ActivityIndicator, StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';
import FastImage from 'react-native-fast-image';
import { Gif } from '../../../../core/domain/Gif';

export interface GifListRef {
  GoTop: () => void;
}

interface Props {
  gifs: Gif[];
  onNextPage: () => void;
  debouncedText: string;
}
const { width } = Dimensions.get('window');

export const GifList = forwardRef(({  gifs, onNextPage, debouncedText  }: Props, ref) => {

  const flatListRef = useRef<FlatList>(null);

  const GoTop = () =>{
    flatListRef.current?.scrollToIndex({ index: 0 });
  };

  useImperativeHandle(ref , () => ({
      GoTop,
  }));

  return (
    <View style={{...styles.gifList}}>

      <FlatList
        ref={flatListRef}
        data= { gifs }
        keyExtractor= {( meme ) => meme.id}
        showsVerticalScrollIndicator= {false}
        showsHorizontalScrollIndicator= {false}
        numColumns= {2}
        extraData={debouncedText}
        ListHeaderComponent={(
          <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold'}}>
            Listado de Gifs
          </Text>
        )}
        renderItem= {( {item} ) => (
          <View>
            <FastImage
            testID={`gifItem:${item.id}`}
            style= {styles.gifImg}
              source={{
                uri: `${item.url}`,
                priority: FastImage.priority.high,
              }}
              resizeMode= { FastImage.resizeMode.cover}
            />
          </View>
        )}

        onEndReached= {onNextPage}
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
});

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
