import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Foundation';
import {widthPercentageToDP as vw} from '../../../../responsive/responsive';
import style from './cardTitleStyle';
export default function CardTitle(props) {
  let {title, showLink} = props;
  return (
    <View style={style.mainView}>
      <Text style={style.titleStyle}>{title}</Text>
      {showLink && (
        <TouchableOpacity style={style.linkAndTextView}>
          <Icon name="refresh" color="#f06d06" size={vw(4)} />
          <Text style={style.textStyle}>SEE ALL</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
