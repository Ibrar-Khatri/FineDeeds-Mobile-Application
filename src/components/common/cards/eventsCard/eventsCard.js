import React from 'react';
import {Dimensions, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {View, ImageBackground} from 'react-native';
import moment from 'moment';
import Icon from 'react-native-vector-icons/Entypo';
import {useNavigation} from '@react-navigation/native';
import {RenderS3Image, ResponsiveText, CardWrapper} from '../../common';
import {
  widthPercentageToDP as vw,
  heightPercentageToDP as vh,
} from '../../../../responsive/responsive';
import {
  renderCurrencySign,
  renderDay,
  renderMonth,
} from '../../../../shared/services/helper';
import {Progress} from 'native-base';

let screenWidth = Dimensions.get('window').width;

export default function EventCard(props) {
  let navigation = useNavigation();
  const {data} = props;

  function navigateTo() {
    navigation.navigate('detail-screen', {
      initialRouteName: 'activity_detail',
      data: data,
      title: data?.activityName,
    });
  }
  console.log(data);
  const checkType = objectT => objectT === 'GENERAL' || objectT === 'ONLINE';
  let organization = data?.organization;
  let targetFunds = data?.targetFunds;
  let raisedAmount = data?.raisedAmount || 0;

  return (
    <CardWrapper activeOpacity={0.7} onPress={navigateTo}>
      <View style={style.activitiesMainView}>
        <RenderS3Image
          style={style.bgImageView}
          resizeMode="cover"
          s3Key={data && `EVENT/${data?.eventId}.webp`}>
          <ImageBackground
            source={require('../../../../assets/images/rounded.png')}
            style={style.dateCardImage}
            resizeMode="cover">
            <ResponsiveText style={style.dateStyle} size={12}>
              {renderDay(data?.startDate)}
            </ResponsiveText>
            <View style={style.lineBetMonthAndDate} />
            <ResponsiveText style={style.dateStyle} size={12}>
              {renderMonth(data?.startDate)}
            </ResponsiveText>
          </ImageBackground>
        </RenderS3Image>
        <View style={style.cardBody}>
          <ResponsiveText style={style.activityTitle} size={14}>
            {data?.title}
          </ResponsiveText>
          <ResponsiveText style={style.activityDec} numberOfLines={3} size={12}>
            {data?.description}
          </ResponsiveText>
          {checkType(data?.objType) ? (
            <View style={style.locationView}>
              <Icon name="location-pin" color="#f06d06" size={vh(2.2)} />
              {data?.online ? (
                <>
                  {/* <a
                    href={event ? event?.online.link : '#'}
                    target="_blank"
                    rel="noopener noreferrer">
                    {event?.online.platform}
                  </a> */}
                </>
              ) : (
                <ResponsiveText style={style.locationText} size={12}>
                  {' '}
                  {data?.city && `${data.city} ,`}
                  {data?.country && `${data.country} `}
                </ResponsiveText>
              )}
            </View>
          ) : (
            <View>
              <ResponsiveText size={16} style={style.goalTextStyle}>
                Goal
              </ResponsiveText>
              <Progress
                colorScheme="orange"
                value={(raisedAmount / Number(targetFunds)) * 100}
                style={style.progressStyle}
              />
              <ResponsiveText size={13} style={style.raisedAmountText}>
                <ResponsiveText size={13} style={style.raisedAmountDark}>
                  {`${renderCurrencySign('eur')} ${raisedAmount} raised `}
                </ResponsiveText>
                {`of ${renderCurrencySign('eur')} ${targetFunds}`}
              </ResponsiveText>
            </View>
          )}
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
  cardBody: {
    padding: vw(3),
  },
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
  progressStyle: {
    backgroundColor: '#e9ecef',
    marginBottom: vw(2),
    marginTop: vw(2),
  },
  goalTextStyle: {
    fontFamily: 'Montserrat-SemiBold',
    color: '#6c757d',
    alignSelf: 'flex-end',
  },
  raisedAmountText: {
    fontFamily: 'Montserrat-Regular',
    color: '#000',
    alignSelf: 'flex-end',
  },
  raisedAmountDark: {
    fontFamily: 'Montserrat-Bold',
  },
});
