import React from 'react';
import {useNavigation} from '@react-navigation/core';
import {View, Image, TouchableOpacity, StyleSheet} from 'react-native';
import {ResponsiveText} from '../index';
import {widthPercentageToDP as vw} from '../../responsive/responsive';

export default function InputFieldsHeader(props) {
  const {title, subTitle, loading} = props;
  let navigation = useNavigation();

  function onPressIcon() {
    !loading &&
      navigation.reset({
        index: 0,
        routes: [{name: 'drawer'}],
      });
  }

  return (
    <View style={style.mianView}>
      <TouchableOpacity onPress={onPressIcon}>
        <Image
          source={require('../../assets/images/fineDeedLogo.png')}
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

let style = StyleSheet.create({
  mianView: {
    display: 'flex',
    alignItems: 'center',
    marginLeft: vw(7),
    marginRight: vw(7),
  },
  fineDeedsLogo: {
    height: vw(12),
    width: vw(12),
  },
  title: {
    fontSize: vw(9),
    color: 'black',
    fontFamily: 'Merriweather-Bold',
    paddingTop: 20,
    paddingBottom: 20,
    textAlign: 'center',
  },
  subTitle: {
    color: '#212529',
    fontWeight: '300',
    textAlign: 'center',
  },
});
