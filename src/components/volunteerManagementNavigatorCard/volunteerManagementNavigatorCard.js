import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {ResponsiveText} from '..';
import {
  normalize,
  widthPercentageToDP as vw,
} from '../../responsive/responsive';

export default function VolunteerManagementNavigatorCard(props) {
  const {objId, objType, title, screenName, navigation} = props;
  return (
    <TouchableOpacity
      style={style.requestMainView}
      onPress={() =>
        navigation.push('volunteer-management-screen', {
          initialRouteName: screenName,
          objId: objId,
          objType: objType,
          title: title,
        })
      }>
      <ResponsiveText size={14} style={style.requestText}>
        {title}
      </ResponsiveText>
      <Icon name="rightcircleo" size={normalize(18)} />
    </TouchableOpacity>
  );
}

let style = StyleSheet.create({
  requestMainView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: vw(3),
    borderRadius: 8,
    borderColor: '#eaeaea',
    borderWidth: 1,
    marginTop: vw(3),
    marginBottom: vw(3),
  },
  requestText: {
    fontFamily: 'Montserrat-Regular',
    color: '#000',
  },
});
