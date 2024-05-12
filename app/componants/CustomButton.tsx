import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { colors } from '../config/styles';

interface CustomButtonProps {
  title: string;
  onPress: () => void;
  buttonStyle: any,
  disabled: boolean
}

const CustomButton: React.FC<CustomButtonProps> = ({ title, onPress, buttonStyle, disabled=false }) => (
  <TouchableOpacity style={[styles.button,buttonStyle]} onPress={onPress} disabled={disabled}>
    <Text style={styles.buttonText}>{title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    width: '100%',
    height: 40,
    borderRadius: 30,
    backgroundColor: colors.btnFillColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    color: '#FFFFFF',
  },
});

export default CustomButton;
