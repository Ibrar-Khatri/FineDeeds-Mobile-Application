import React from 'react';
import {Text} from 'react-native';
import {View, ImageBackground} from 'react-native';
import moment from 'moment';
import RenderS3Image from '../../renderS3Image/renderS3Image';
import style from './activitiesCardStyle';
import Icon from 'react-native-vector-icons/Entypo';
import { heightPercentageToDP as vh } from '../../../../responsive/responsive';
export default function ActivitiesCard(props) {
  let {data} = props;
  return (
    <View style={style.activitiesMainView}>
      <RenderS3Image
        style={style.bgImageView}
        resizeMode="cover"
        s3Key={data?.activityId && `ACTIVITY/${data?.activityId}.webp`}>
        <ImageBackground
          source={require('../../../../assets/images/rounded.png')}
          style={style.dateCardImage}
          resizeMode="cover">
          <Text style={style.dateStyle}>
            {moment(data?.startDate).format('DD')}
          </Text>
          <View style={style.lineBetMonthAndDate} />
          <Text style={style.dateStyle}>
            {moment(data?.startDate).format('MMM')}
          </Text>
        </ImageBackground>
        <View style={style.startingOn}>
          <Text style={style.startingOnText}>
            {`Starting on ${moment(data?.startDate).format('MM/DD/YYYY')}`}
          </Text>
        </View>
      </RenderS3Image>
      <View style={style.cardBody}>
        <Text style={style.activityTitle}>{data?.activityName}</Text>
        <Text style={style.activityDec} numberOfLines={2}>
          {data?.activityDescription}
        </Text>
        <View style={style.locationView}>
          <Icon name="location-pin" color="#f06d06" size={vh(2.2)} />
          <Text style={style.locationText}>{` ${data?.activityAddress}`}</Text>
        </View>
        <Text numberOfLines={1}>
          <Text style={style.causes}>Casues</Text>
          <Text style={style.causesItem}>{` ${data?.activityCauses.join(
            ', ',
          )}`}</Text>
        </Text>
      </View>
    </View>
  );
}
