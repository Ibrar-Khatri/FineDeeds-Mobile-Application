import React from 'react';
import {Center, Spinner, VStack, HStack, Heading} from 'native-base';
import {View, Text} from 'react-native';
import style from './spinnerStyle';

export default function CustomSpinner(props) {
  let {size, color} = props;
  return (
    <View style={style.spinnerStyle}>
      <HStack space={2} alignItems="center">
        <Spinner size={size} color={color} />
        {/* <Heading color="primary.500" fontSize="md">
          Loading
        </Heading> */}
      </HStack>
    </View>
  );
}
