import React from 'react';
import {View, StyleSheet} from 'react-native';

export default function ProfileScreenCardWrapper(props) {
  const {children} = props;
  return <View style={style.cardView}>{children}</View>;
}

let style = StyleSheet.create({
  cardView: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#fff',
    marginBottom: 20,
    padding: 20,
    borderRadius: 10,
  },
});
