import React, { FC } from 'react';
import {View, TextInput,StyleSheet,Dimensions, KeyboardTypeOptions} from 'react-native';
import Images from '../config/Images';
import {colors} from '../config/styles';

const {height, width} = Dimensions.get('window');

type TextInputCustomProps = {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  secureTextEntry?: boolean,
  keyboardType?:  undefined | KeyboardTypeOptions 
}

const TextInputCustom: FC<TextInputCustomProps> = ({
  value,
  onChangeText,
  placeholder,
  secureTextEntry,
  keyboardType= 'default'
}) => {
  return (
    <TextInput
      style={styles.input}
      value={value}
      keyboardType={keyboardType}
      onChangeText={onChangeText}
      placeholder={placeholder}
      placeholderTextColor={'#777'}
      secureTextEntry={secureTextEntry}
    />
  );
};

TextInputCustom.defaultProps = {
  secureTextEntry: false
}
  

const styles = StyleSheet.create({
  input: {
    borderRadius: 100,
        color: colors.blackColor,
        paddingHorizontal: 20,
        width: width/1.5,
        backgroundColor: colors.textinputColor,
        marginVertical: 10,
        height: 40,
        
  },
});

export default TextInputCustom;
