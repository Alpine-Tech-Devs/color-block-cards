import React from 'react';
import { Text, StyleSheet, TextProps } from 'react-native';

interface CustomTextProps extends TextProps {}

const CustomText: React.FC<CustomTextProps> = ({ style, ...props }) => {
  return <Text style={[styles.defaultText, style]} {...props} />;
};

const styles = StyleSheet.create({
  defaultText: {
    fontFamily: 'Cinzel',
  },
});

export default CustomText;