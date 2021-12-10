import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import style from './authWrapperStyle';

export default function AuthWrapper(props) {
  let {children} = props;
  return (
    <KeyboardAwareScrollView
      bounces={false}
      contentContainerStyle={style.contentContainerStyle}>
      {children}
    </KeyboardAwareScrollView>
  );
}
