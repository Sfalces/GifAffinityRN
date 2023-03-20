import React from 'react';
import { Image } from 'react-native';
import { Gif } from '../interfaces/interfaces';

  interface Props {
    gif: Gif;
  }


export const GifCard = ({ gif }: Props) => {
  return <Image
            alt={gif.title}
            source={{uri:gif.url}}
          />;
};

