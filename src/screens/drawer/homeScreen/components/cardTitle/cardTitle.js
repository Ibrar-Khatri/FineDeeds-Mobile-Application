import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {TouchableOpacity, View, StyleSheet} from 'react-native';
import {ResponsiveText} from '../../../../../components/common/common';
import {heightPercentageToDP as vh} from '../../../../../responsive/responsive';

export default function CardTitle(props) {
  const {title, subTitle, headerTitle, showLink, screenName, initialRouteName} =
    props;
  let navigation = useNavigation();

  function navigateTo() {
    navigation.push(screenName, {
      initialRouteName: initialRouteName,
      title: headerTitle,
    });
  }
  return (
    <View style={style.mainView}>
      {title && (
        <ResponsiveText style={style.titleStyle} size={12}>
          {title}
        </ResponsiveText>
      )}
      <View style={style.iconAndSubTitleView}>
        <ResponsiveText style={style.subTitleStyle} size={16}>
          {subTitle}
        </ResponsiveText>
        {showLink && (
          <TouchableOpacity style={style.linkAndTextView} onPress={navigateTo}>
            <ResponsiveText style={style.textStyle} size={10}>
              SEE ALL
            </ResponsiveText>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

let style = StyleSheet.create({
  mainView: {
    marginBottom: vh(2),
    marginTop: vh(5),
  },
  iconAndSubTitleView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleStyle: {
    fontFamily: 'Montserrat-Bold',
    color: '#212529',
  },
  subTitleStyle: {
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
