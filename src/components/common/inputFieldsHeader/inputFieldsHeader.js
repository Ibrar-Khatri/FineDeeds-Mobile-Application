import React from 'react';
import {useNavigation} from '@react-navigation/core';
import {View, Image, TouchableOpacity} from 'react-native';
import ResponsiveText from '../responsiveText/responsiveText';
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
          resizeMode="contain"
        />
      </TouchableOpacity>
      <ResponsiveText style={style.title} size={28}>
        {title}
      </ResponsiveText>
      <ResponsiveText style={style.subTitle} size={15}>
        {subTitle}
      </ResponsiveText>
    </View>
  );
}
