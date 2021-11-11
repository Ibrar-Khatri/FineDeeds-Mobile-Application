import {useNavigation} from '@react-navigation/core';
import React, {useState} from 'react';
import {View, Image, Text, TouchableOpacity} from 'react-native';
import style from './inputFieldsHeaderStyle';

export default function InputFieldsHeader(props) {
  let {title, subTitle} = props;
  let navigation = useNavigation();

  function onPressIcon() {
    navigation.reset({
      index: 0,
      routes: [{name: 'drawer'}],
    });
  }

  return (
    <View style={style.mianView}>
      <TouchableOpacity onPress={onPressIcon}>
        <Image
          source={require('../../../assets/images/fineDeedLogo.png')}
          style={style.fineDeedsLogo}
          resizeMode="cover"
        />
      </TouchableOpacity>
      <Text style={style.title}>{title}</Text>
      <Text style={style.subTitle}>{subTitle}</Text>
    </View>
  );
}
