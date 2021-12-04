import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Foundation';
import style from './cardTitleStyle';
export default function CardTitle() {
  return (
    <View style={style.mainView}>
      <Text style={style.titleStyle}>STORIES THAT INSPIRE</Text>
      <TouchableOpacity style={style.linkAndTextView}>
        <Icon name="refresh" color="#f06d06" size={18} />
        <Text style={style.textStyle}>SEE ALL</Text>
      </TouchableOpacity>
    </View>
  );
}
