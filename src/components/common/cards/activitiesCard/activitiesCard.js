import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {View, ImageBackground} from 'react-native';
import moment from 'moment';
import RenderS3Image from '../../renderS3Image/renderS3Image';
import style from './activitiesCardStyle';
import Icon from 'react-native-vector-icons/Entypo';
import {heightPercentageToDP as vh} from '../../../../responsive/responsive';
import ResponsiveText from '../../responsiveText/responsiveText';
import {useNavigation} from '@react-navigation/native';

export default function ActivitiesCard(props) {
  let navigation = useNavigation();
  let {data} = props;
  return (
    <TouchableOpacity
      style={style.activitiesMainView}
      activeOpacity={0.7}
      onPress={() =>
        navigation.navigate('detail-screen', {
          initialRouteName: 'activity_detail',
          data: data,
          title: data?.activityName,
        })
      }>
      <RenderS3Image
        style={style.bgImageView}
        resizeMode="cover"
        s3Key={data?.activityId && `ACTIVITY/${data?.activityId}.webp`}>
        <ImageBackground
          source={require('../../../../assets/images/rounded.png')}
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
        <ResponsiveText style={style.activityTitle} size={13}>
          {data?.activityName}
        </ResponsiveText>
        <ResponsiveText style={style.activityDec} numberOfLines={2} size={10}>
          {data?.activityDescription}
        </ResponsiveText>
        <View style={style.locationView}>
          <Icon name="location-pin" color="#f06d06" size={vh(2.2)} />
          <ResponsiveText
            style={style.locationText}
            size={11}>{` ${data?.activityAddress}`}</ResponsiveText>
        </View>
        <Text numberOfLines={1}>
          <ResponsiveText style={style.causes} size={13}>
            Casues
          </ResponsiveText>
          <ResponsiveText
            style={style.causesItem}
            size={11}>{` ${data?.activityCauses?.join(', ')}`}</ResponsiveText>
        </Text>
      </View>
    </TouchableOpacity>
  );
}
