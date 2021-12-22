import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {TouchableOpacity, View, StyleSheet} from 'react-native';
import ResponsiveText from '../../../common/responsiveText/responsiveText';
import {heightPercentageToDP as vh} from '../../../../responsive/responsive';

export default function CardTitle(props) {
  const {title, headerTitle, showLink, screenName, initialRouteName} = props;
  let navigation = useNavigation();

  function navigateTo() {
    navigation.navigate(screenName, {
      initialRouteName: initialRouteName,
      title: headerTitle,
    });
  }
  return (
    <View style={style.mainView}>
      <ResponsiveText style={style.titleStyle} size={16}>
        {title}
      </ResponsiveText>
      {showLink && (
        <TouchableOpacity style={style.linkAndTextView} onPress={navigateTo}>
          <ResponsiveText style={style.textStyle} size={10}>
            SEE ALL
          </ResponsiveText>
        </TouchableOpacity>
      )}
    </View>
  );
}

let style = StyleSheet.create({
  mainView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: vh(2),
    marginTop: vh(5),
  },
  titleStyle: {
    fontFamily: 'Montserrat-Regular',
    color: '#212529',
  },
  linkAndTextView: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  textStyle: {
    fontFamily: 'Montserrat-Bold',
    color: '#f06d06',
    marginLeft: 7,
  },
});
