import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Dimensions, ImageBackground, StyleSheet} from 'react-native';
import {
  heightPercentageToDP as vh,
  widthPercentageToDP as vw,
} from '../../../responsive/responsive';
import {RenderS3Image, ResponsiveText, CardWrapper} from '../../index';

let screenWidth = Dimensions.get('window').width;

export default function OrganizationCard(props) {
  const {data} = props;
  let navigation = useNavigation();

  function navigateTo() {
    navigation.push('detail-screen', {
      initialRouteName: 'organization_detail',
      data: data,
      title: data?.orgName,
    });
  }
  return (
    <CardWrapper onPress={navigateTo}>
      <RenderS3Image
        resizeMode="cover"
        s3Key={data && `ORGANIZATION/IMAGE/${data?.orgId}.webp`}>
        <ImageBackground
          source={require('../../../assets/images/Rounded-Rectangle-3-copy-3@1X.png')}
          resizeMode="cover"
          style={style.imageStyle}>
          <RenderS3Image
            s3Key={data && `ORGANIZATION/LOGO/${data?.orgId}.webp`}
            style={style.logoStyle}
          />
          <ResponsiveText size={14} style={style.orgName}>
            {data?.orgName}
          </ResponsiveText>
          <ResponsiveText size={12} style={style.orgDesc} numberOfLines={2}>
            {data?.description}
          </ResponsiveText>
        </ImageBackground>
      </RenderS3Image>
    </CardWrapper>
  );
}

let style = StyleSheet.create({
  imageStyle: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    padding: vw(5),
    width: vw(screenWidth > 480 ? 65 : 75),
  },
  logoStyle: {height: vh(9), width: vh(9)},
  orgName: {
    color: '#fff',
    fontFamily: 'Montserrat-Bold',
    marginTop: 10,
    marginBottom: 10,
  },
  orgDesc: {
    color: '#fff',
    fontFamily: 'Montserrat-Regular',
  },
});
