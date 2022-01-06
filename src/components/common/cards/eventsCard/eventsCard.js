import React from 'react';
import {Dimensions, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {View, ImageBackground} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';
import {RenderS3Image, ResponsiveText, CardWrapper} from '../../common';
import {
  widthPercentageToDP as vw,
  heightPercentageToDP as vh,
  normalize,
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
    navigation.push('detail-screen', {
      initialRouteName: 'event_detail',
      data: data,
      title: data?.title,
    });
  }
  const checkType = objectT => objectT === 'GENERAL' || objectT === 'ONLINE';
  let organization = data?.organization;
  let targetFunds = data?.targetFunds;
  let raisedAmount = data?.raisedAmount || 0;

  return (
    <CardWrapper activeOpacity={0.7} onPress={navigateTo}>
      <View style={style.eventCardMainView}>
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
        {data?.isPaid && (
          <ResponsiveText size={15} style={style.paidStyle}>
            Paid
          </ResponsiveText>
        )}

        <View style={style.cardBody}>
          <ResponsiveText style={style.eventTitle} size={14}>
            {data?.title}
          </ResponsiveText>
          <ResponsiveText style={style.eventDec} numberOfLines={3} size={12}>
            {data?.description}
          </ResponsiveText>
          {checkType(data?.objType) ? (
            <View style={style.locationView}>
              <Entypo
                name="location-pin"
                color="#f06d06"
                size={normalize(18)}
              />
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
                  {` ${data?.address}`}
                </ResponsiveText>
              )}
            </View>
          ) : (
            <View style={style.progressView}>
              <ResponsiveText size={15} style={style.goalTextStyle}>
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

          <View style={style.orgMainView}>
            <View style={style.orgNameAndImgView}>
              <RenderS3Image
                style={style.orgImageStyle}
                s3Key={
                  data &&
                  `ORGANIZATION/LOGO/${
                    organization && organization['orgId']
                  }.webp`
                }
              />
              <ResponsiveText size={14} style={style.orgNameStyle}>
                {organization && organization['orgName']
                  ? organization['orgName']
                  : 'Nonprofit'}
              </ResponsiveText>
            </View>
            {data && checkType(data?.objType) && (
              <ResponsiveText style={style.volunteersNeeded} size={14}>
                <FontAwesome name="user" color="#fd7e14" size={normalize(15)} />
                {`  ${data?.volunteersNeeded}`}
              </ResponsiveText>
            )}
          </View>
        </View>
      </View>
    </CardWrapper>
  );
}

let style = StyleSheet.create({
  eventCardMainView: {
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
  paidStyle: {
    backgroundColor: '#f06d06',
    position: 'absolute',
    alignSelf: 'flex-end',
    marginTop: vw(7),
    fontFamily: 'Montserrat-SemiBold',
    color: '#fff',
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    padding: vw(3),
    paddingTop: vw(1.5),
    paddingBottom: vw(1.5),
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
  eventTitle: {
    fontFamily: 'Montserrat-Bold',
    color: '#212529',
    paddingTop: 15,
    paddingBottom: 15,
  },
  eventDec: {
    color: '#737373',
    fontFamily: 'Montserrat-Regular',
    marginBottom: 8,
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
    marginBottom: 8,
    marginTop: 8,
  },
  progressView: {
    marginBottom: 10,
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
  orgMainView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  orgNameAndImgView: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  orgImageStyle: {
    height: normalize(30),
    width: normalize(30),
    borderRadius: 10,
  },
  orgNameStyle: {
    fontFamily: 'Montserrat-Bold',
    color: '#212529',
    marginLeft: 8,
  },
  volunteersNeeded:{
    color:'#212529'
  }
});
