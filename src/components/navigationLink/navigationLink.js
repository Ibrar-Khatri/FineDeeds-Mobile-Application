import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useNavigationState} from '@react-navigation/native';
import {ResponsiveText} from '../index';
import {widthPercentageToDP as vw} from '../../responsive/responsive';

export default function NavigationLink(props) {
  const {text, displayName, screenName, navigation, routeName} = props;
  const routes = useNavigationState(state => state);

  function onPress() {
    if (routes.routeNames.includes(routeName)) {
      navigation.navigate(routeName);
    } else {
      navigation.navigate(screenName, {initialRouteName: routeName});
    }
  }

  return (
    <View style={style.linkView}>
      <ResponsiveText style={style.text1} size={12}>
        {text}
      </ResponsiveText>
      <ResponsiveText style={style.text2} onPress={onPress} size={12}>
        {displayName}
      </ResponsiveText>
    </View>
  );
}

let style = StyleSheet.create({
  linkView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  text1: {
    color: 'black',
    fontWeight: '300',
    fontSize: vw(3.5),
  },
  text2: {
    color: '#f06d06',
    fontSize: vw(3.5),
    fontWeight: '300',
    paddingLeft: 5,
  },
});
