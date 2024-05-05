import React from 'react';
import { View, StyleSheet, TextInput, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

import { colors } from '../config/styles'; // Assuming colors is defined in a TypeScript file

const { width,height } = Dimensions.get('window');

interface SearchProps {
  onChange: (text: string) => void; // Function to handle text changes
  value: string; // Current value of the search input
}

export const Search: React.FC<SearchProps> = ({ onChange, value }) => {
  return (
    <View>
      <View style={styles.mainStyles}>
        <TextInput
          placeholder={'Search'}
          onChangeText={onChange}
          value={value}
          placeholderTextColor={'#345c74'}
          style={{ fontSize: 16, width: width / 1.5,height:height/16, color: colors.blackColor }}
        />
        <Icon name="search1" size={20} color={colors.blackColor} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainStyles: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingLeft: 15,
    borderRadius: 20,
    marginTop: height/30,
  },
});
