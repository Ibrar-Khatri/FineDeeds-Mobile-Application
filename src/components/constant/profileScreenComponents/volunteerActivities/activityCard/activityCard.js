import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Dimensions, StyleSheet, TouchableOpacity, View} from 'react-native';
import {widthPercentageToDP as vw} from '../../../../../responsive/responsive';
import {RenderS3Image, ResponsiveText} from '../../../../common/common';

const screenWidth = Dimensions.get('window').width;

export default function ActivityCard(props) {
  const {data, volunteer} = props;
  const navigation = useNavigation();

  function navigateTo() {
    navigation.push('detail-screen', {
      initialRouteName: 'activity_detail',
      data: data,
      title: data?.activityName,
    });
  }

  return (
    <TouchableOpacity style={style.activityView} onPress={navigateTo}>
      <RenderS3Image
        resizeMode="contain"
        style={style.activityImageStyle}
        s3Key={`ACTIVITY/${data?.activityId}.webp`}
      />
      <View style={style.activityTitleAndPostedByView}>
        <ResponsiveText style={style.activityTitle} size={12}>
          {data.activityName}
        </ResponsiveText>
        <ResponsiveText style={style.activityPostedByText} size={12}>
          {volunteer.volunteerName}
        </ResponsiveText>
      </View>
    </TouchableOpacity>
  );
}

const style = StyleSheet.create({
  activityView: {
    width: vw(screenWidth < 480 ? 70 : 60),
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#dee2e6',
    paddingLeft: vw(5),
    margin: 5,
  },
  activityImageStyle: {
    height: vw(screenWidth < 480 ? 20 : 14),
    width: vw(screenWidth < 480 ? 20 : 14),
  },
  activityTitleAndPostedByView: {marginLeft: 15},
  activityTitle: {
    fontFamily: 'Montserrat-Bold',
    color: '#212529',
  },
  activityPostedByText: {
    fontFamily: 'Montserrat-Regular',
    color: '#212529',
  },
});
