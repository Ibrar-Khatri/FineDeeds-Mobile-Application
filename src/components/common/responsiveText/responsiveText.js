import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {normalize} from '../../../responsive/responsive';

export default function ResponsiveText(props) {
  let {style, size, children, numberOfLines, onPress} = props;
  return (
    <Text
      numberOfLines={numberOfLines}
      style={[style, {fontSize: normalize(size)}]}
      onPress={onPress}
      >
      {children}
    </Text>
  );
}
