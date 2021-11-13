import {View} from 'native-base';
import React from 'react';
import style from './profileScreenCardWrapperStyle';

export default function ProfileScreenCardWrapper(props) {
  return <View style={style.cardView}>{props.children}</View>;
}
