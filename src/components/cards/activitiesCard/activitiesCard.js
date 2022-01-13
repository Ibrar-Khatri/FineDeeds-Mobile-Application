import React from 'react';
import {Dimensions, StyleSheet, Text} from 'react-native';
import {View, ImageBackground} from 'react-native';
import moment from 'moment';
import Icon from 'react-native-vector-icons/Entypo';
import {useNavigation} from '@react-navigation/native';
import {RenderS3Image, ResponsiveText, CardWrapper} from '../../index';
import {
  widthPercentageToDP as vw,
  heightPercentageToDP as vh,
} from '../../../responsive/responsive';

let screenWidth = Dimensions.get('window').width;

export default function ActivitiesCard(props) {
  let navigation = useNavigation();
  const {data} = props;

  function navigateTo() {
    navigation.push('detail-screen', {
      initialRouteName: 'activity_detail',
      data: data,
      title: data?.activityName,
    });
  }
  return (
    <CardWrapper activeOpacity={0.7} onPress={navigateTo}>
      <View style={style.activitiesMainView}>
        <RenderS3Image
          style={style.bgImageView}
          resizeMode="cover"
          s3Key={data?.activityId && `ACTIVITY/${data?.activityId}.webp`}>
          <ImageBackground
            source={require('../../../assets/images/rounded.png')}
            style={style.dateCardImage}
            resizeMode="cover">
            <ResponsiveText style={style.dateStyle} size={12}>
              {moment(data?.startDate).format('DD')}
            </ResponsiveText>
            <View style={style.lineBetMonthAndDate} />
            <ResponsiveText style={style.dateStyle} size={12}>
              {moment(data?.startDate).format('MMM')}
            </ResponsiveText>
          </ImageBackground>
          <View style={style.startingOn}>
            <ResponsiveText style={style.startingOnText} size={10}>
              {`Starting on ${moment(data?.startDate).format('MM/DD/YYYY')}`}
            </ResponsiveText>
          </View>
        </RenderS3Image>
        <View style={style.cardBody}>
          <ResponsiveText style={style.activityTitle} size={14}>
            {data?.activityName}
          </ResponsiveText>
          <ResponsiveText style={style.activityDec} numberOfLines={2} size={12}>
            {data?.activityDescription}
          </ResponsiveText>
          <View style={style.locationView}>
            <Icon name="location-pin" color="#f06d06" size={vh(2.2)} />
            <ResponsiveText
              style={style.locationText}
              size={12}>{` ${data?.activityAddress}`}</ResponsiveText>
          </View>
          <Text numberOfLines={1}>
            <ResponsiveText style={style.causes} size={14}>
              Casues
            </ResponsiveText>
            <ResponsiveText
              style={style.causesItem}
              size={12}>{` ${data?.activityCauses?.join(
              ', ',
            )}`}</ResponsiveText>
          </Text>
        </View>
      </View>
    </CardWrapper>
  );
}

let style = StyleSheet.create({
  activitiesMainView: {
    padding: vw(2),
  },
  bgImageView: {
    height: vh(24),
    width: vw(screenWidth > 480 ? 60 : 70),
    alignSelf: 'center',
    borderRadius: 15,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    overflow: 'hidden',
  },
  dateCardImage: {
    height: vh(10),
    width: vh(7),
    marginLeft: 25,
    marginTop: -10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dateStyle: {
    color: '#f06d06',
    fontFamily: 'Montserrat-Bold',
  },
  lineBetMonthAndDate: {
    width: '70%',
    borderBottomColor: '#d3d1d0',
    borderBottomWidth: 1,
    margin: 3,
  },
  startingOn: {
    backgroundColor: '#f1ae44',
    width: vw(45),
    padding: 5,
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    borderTopRightRadius: 15,
  },
  startingOnText: {
    color: '#fff',
    fontFamily: 'Montserrat-Bold',
    textAlignVertical: 'center',
  },
  // cardBody: {
  //   width: vh(39)
  // },
  activityTitle: {
    fontFamily: 'Montserrat-Bold',
    color: '#212529',
    paddingTop: 15,
    paddingBottom: 15,
  },
  activityDec: {
    color: '#737373',
    fontFamily: 'Montserrat-Regular',
  },
  locationView: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
    marginBottom: 15,
  },
  locationText: {
    textAlignVertical: 'center',
    fontFamily: 'Montserrat-SemiBold',
    color: '#212529',
  },
  causes: {
    fontFamily: 'Montserrat-SemiBold',
    color: '#212529',
  },
  causesItem: {
    color: '#737373',
    fontFamily: 'Montserrat-Regular',
  },
});