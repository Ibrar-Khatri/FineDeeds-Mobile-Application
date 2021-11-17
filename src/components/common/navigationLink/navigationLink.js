import React from 'react';
import {Text, View} from 'react-native';
import style from './navigationLinkStyle';
import {useNavigationState} from '@react-navigation/native';

export default function NavigationLink(props) {
  let {text, displayName, screenName, navigation, routeName} = props;
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
      <Text style={style.text1}>{text}</Text>
      <Text style={style.text2} onPress={onPress}>
        {displayName}
      </Text>
    </View>
  );
}
