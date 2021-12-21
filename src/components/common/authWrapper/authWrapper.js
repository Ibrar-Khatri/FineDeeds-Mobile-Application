import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

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

let style = StyleSheet.create({
  contentContainerStyle: {
    justifyContent: 'center',
    flexGrow: 1,
    backgroundColor: '#fff',
  },
});
