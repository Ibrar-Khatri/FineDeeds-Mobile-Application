import React from 'react';
import {ImageBackground, StyleSheet, TouchableOpacity} from 'react-native';
import {heightPercentageToDP as vh} from '../../../../responsive/responsive';
import {RenderS3Image, ResponsiveText} from '../../common';

export default function OrganizationCard(props) {
  const {data} = props;
  return (
    <TouchableOpacity style={style.mainView}>
      <RenderS3Image
        resizeMode="cover"
        style={style.bgImageStyle}
        s3Key={data && `ORGANIZATION/IMAGE/${data?.orgId}.webp`}>
        <ImageBackground
          source={require('../../../../assets/images/Rounded-Rectangle-3-copy-3@1X.png')}
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
    </TouchableOpacity>
  );
}

let style = StyleSheet.create({
  mainView: {
    margin: 10,
    borderRadius: 15,
    overflow: 'hidden',
  },
  bgImageStyle: {
    height: vh(30),
    width: vh(45),
  },
  imageStyle: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    padding: 20,
    height: vh(30),
    width: vh(45),
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
