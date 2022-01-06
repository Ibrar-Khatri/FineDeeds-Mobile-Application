import React from 'react';
import {Dimensions, StyleSheet, TouchableOpacity, View} from 'react-native';
import {widthPercentageToDP as vw} from '../../../../responsive/responsive';
import {RenderS3Image, ResponsiveText} from '../../common';

let screenWidth = Dimensions.get('window').width;

export default function HostCard(props) {
  const {data, host} = props;
  return (
    <TouchableOpacity style={style.profileView} activeOpacity={0.5}>
      <View style={style.profileImageView}>
        <RenderS3Image
          s3Key={`VOLUNTEER/${data?.volunteerId}.webp`}
          style={style.profileImage}
        />
      </View>
      <View style={style.volunteerNameView}>
        <ResponsiveText size={13} style={style.volunteerName}>
          {data?.volunteerName}
        </ResponsiveText>
        <ResponsiveText size={12} style={style.volunteerHost}>
          {host ? 'Event Host' : 'Event Co-Host'}
        </ResponsiveText>
      </View>
    </TouchableOpacity>
  );
}

let style = StyleSheet.create({
  profileView: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    margin: 15,
  },
  profileImageView: {
    borderColor: '#f06d06',
    borderWidth: 3,
    height: vw(screenWidth > 480 ? 13 : 15),
    width: vw(screenWidth > 480 ? 13 : 15),
    borderRadius: 100,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImage: {
    height: vw(screenWidth > 480 ? 12 : 14),
    width: vw(screenWidth > 480 ? 12 : 14),
    borderRadius: 100,
    overflow: 'hidden',
  },
  volunteerNameView: {
    marginLeft: 15,
  },
  volunteerName: {
    fontFamily: 'Montserrat-SemiBold',
    color: '#212529',
  },
  volunteerHost: {
    fontFamily: 'Montserrat-Regular',
    color: '#888',
  },
});
