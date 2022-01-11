import React from 'react';
import {Spinner, VStack, HStack, Heading} from 'native-base';
import {View, StyleSheet} from 'react-native';

export default function CustomSpinner(props) {
  const {size, color, center} = props;
  return (
    <View style={[style.spinnerStyle, center && style.centerView]}>
      <HStack space={2} alignItems="center">
        <Spinner size={size} color={color} />
        {/* <Heading color="primary.500" fontSize="md">
          Loading
        </Heading> */}
      </HStack>
    </View>
  );
}

let style = StyleSheet.create({
  spinnerStyle: {
    display: 'flex',
    alignSelf: 'center',
    marginTop: 20,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  centerView: {
    flex: 1,
    justifyContent: 'center',
  },
});
