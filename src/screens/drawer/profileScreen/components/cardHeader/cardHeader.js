import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Octicons';
import {normalize} from '../../../../../responsive/responsive';
import {ResponsiveText} from '../../../../../components/common/common';

export default function ProfileScreenCardsHeader(props) {
  const {
    title,
    screenName,
    initialRouteName,
    headerTitle,
    onPress,
    volunteerId,
  } = props;
  let navigation = useNavigation();

  function navigateTo() {
    screenName &&
      initialRouteName &&
      navigation.navigate(screenName, {
        initialRouteName: initialRouteName,
        title: headerTitle,
        volunteerId: volunteerId,
      });
  }
  return (
    <View style={style.titleAndLinkView}>
      <ResponsiveText style={style.titleStyle} size={14}>
        {title}
      </ResponsiveText>
      {onPress ? (
        <TouchableOpacity onPress={onPress}>
          <Icon name="pencil" size={normalize(15)} color="#f06d06" />
        </TouchableOpacity>
      ) : (
        screenName && (
          <TouchableOpacity onPress={navigateTo}>
            <ResponsiveText style={style.linkStyle} size={12}>
              Sell all
            </ResponsiveText>
          </TouchableOpacity>
        )
      )}
    </View>
  );
}

const style = StyleSheet.create({
  titleAndLinkView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  titleStyle: {
    fontFamily: 'Montserrat-Bold',
    color: '#212529',
    marginBottom: 15,
  },
  linkStyle: {
    fontFamily: 'Montserrat-Bold',
    color: '#f06d06',
    marginBottom: 15,
  },
});
