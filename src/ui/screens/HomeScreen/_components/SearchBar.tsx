import React from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
// import  Icon  from 'react-native-vector-icons/Ionicons';


interface Props {
  text: string;
  onSearch: (text: string) => void;
}

export const SearchBar = ({ text, onSearch }: Props) => {

  const cleanSearchBar = () =>{
    onSearch('');
  };

  return (
    <View
      style={styles.textBackground}
    >
      <TextInput
        value={text}
        placeholder="¿Que quieres buscar?"
        onChangeText={onSearch}
        style={styles.textInput}
        autoCapitalize="none"
        autoCorrect={false}
        testID={'searchBar'}
      />
      <TouchableOpacity
        onPress={() => cleanSearchBar()}
      >
      {/* <Icon
          name= "close-outline"
          color= "grey"
          size={30}
        /> */}
      </TouchableOpacity>
    </View>
  );
};

export const styles = StyleSheet.create({
  container: {
  },
  textBackground: {
    marginHorizontal: 20,
    backgroundColor: '#F3F1F3',
    borderRadius: 50,
    height: 40,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,

  },
  textInput:{
    flex: 1,
    fontSize: 18,
  },
});
