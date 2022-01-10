import {Actionsheet} from 'native-base';
import React from 'react';
import {useState} from 'react';
import {Dimensions, StyleSheet, TouchableOpacity, View} from 'react-native';
import {widthPercentageToDP as vw} from '../../../responsive/responsive';
import {RenderS3Image, ResponsiveText} from '../../index';

let screenWidth = Dimensions.get('window').width;

export default function HostCard(props) {
  let [invokeActionSheet, setInvokeActionSheet] = useState(false);
  const {data, host} = props;

  return (
    <>
      <TouchableOpacity
        style={style.profileView}
        activeOpacity={0.5}
        onPress={() => setInvokeActionSheet(true)}>
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
      <Actionsheet isOpen={invokeActionSheet} onClose={setInvokeActionSheet}>
        <Actionsheet.Content>
          <View style={style.hostActionsheetView}>
            <ResponsiveText size={16} style={style.titleStyle}>
              Host Information
            </ResponsiveText>
            <View style={style.hostSheetView}>
              <RenderS3Image
                s3Key={`VOLUNTEER/${data?.volunteerId}.webp`}
                style={style.hostImage}
              />
              <View>
                <ResponsiveText size={13} style={style.staffHeading}>
                  Staff Name{' '}
                  <ResponsiveText size={13} style={style.staffSubHeading}>
                    {data.volunteerName}
                  </ResponsiveText>
                </ResponsiveText>
                <ResponsiveText size={13} style={style.staffHeading}>
                  Email{' '}
                  <ResponsiveText size={13} style={style.staffSubHeading}>
                    {data.email}
                  </ResponsiveText>
                </ResponsiveText>
                <ResponsiveText size={13} style={style.staffHeading}>
                  Designation{' '}
                  <ResponsiveText size={13} style={style.staffSubHeading}>
                    {data.designation}
                  </ResponsiveText>
                </ResponsiveText>
              </View>
            </View>
          </View>
        </Actionsheet.Content>
      </Actionsheet>
    </>
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
  hostActionsheetView: {
    alignSelf: 'flex-start',
    width: '100%',
  },
  titleStyle: {
    color: '#212529',
    alignSelf: 'flex-start',
    width: '100%',
    padding: vw(2),
    fontWeight: '500',
    borderBottomColor: '#eaeaea',
    borderBottomWidth: 1,
  },
  hostImage: {
    height: vw(screenWidth > 480 ? 15 : 17),
    width: vw(screenWidth > 480 ? 15 : 17),
    borderRadius: 100,
    overflow: 'hidden',
    margin: vw(3),
    borderColor: '#f06d06',
    borderWidth: 2,
  },
  staffHeading: {
    color: '#212529',
    fontFamily: 'Montserrat-SemiBold',
    padding: vw(2),
  },
  staffSubHeading: {
    fontFamily: 'Montserrat-Regular',
  },
  hostSheetView: {
    display: 'flex',
    flexDirection: 'row-reverse',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    padding: vw(2),
  },
});
