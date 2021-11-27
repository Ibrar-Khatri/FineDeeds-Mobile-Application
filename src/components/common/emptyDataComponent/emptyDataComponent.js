import React from 'react';
import {View, Text} from 'react-native';
import {Image} from 'native-base';
import style from './emptyDataComponentStyle';

export default function EmptyDataComponent(props) {
  let {title} = props;
  return (
    <View style={style.imageAndTextView}>
      <Image
        source={require('../../../assets/images/empty-box.png')}
        alt="empty"
        size={60}
      />
      <Text style={style.textStyle}>{`No ${title}`}</Text>
    </View>
  );
}
