import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {View, ImageBackground} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {ResponsiveText, RenderS3Image, Tag} from '../../common';
import {
  widthPercentageToDP as vw,
  heightPercentageToDP as vh,
  normalize,
} from '../../../../responsive/responsive';
import {CustomButton} from '../../common';

export default function ContributorCard(props) {
  let navigation = useNavigation();
  const {data} = props;

  //   function navigateTo() {
  //     navigation.navigate('detail-screen', {
  //       initialRouteName: 'activity_detail',
  //       data: data,
  //       title: data?.activityName,
  //     });
  //   }
  return (
    <TouchableOpacity style={style.mainView}>
      <View style={style.cardHeader}>
        <View style={style.profileImageAndNameView}>
          <View style={style.volunteerNameAndOrgName}>
            <ResponsiveText size={18} style={style.volunteerName}>
              {data?.volunteerName}
            </ResponsiveText>
            <ResponsiveText size={13} style={style.orgName}>
              {data?.organization && data?.organization?.orgName}
              {/* Sylani Foundation */}
            </ResponsiveText>
          </View>
          <RenderS3Image
            style={style.profileImage}
            s3Key={data?.volunteerId && `VOLUNTEER/${data?.volunteerId}.webp`}
          />
        </View>
        <View style={style.locationAndButtomView}>
          <View style={style.locationAndImageView}>
            {(data?.city || data?.country) && (
              <Image
                source={require('../../../../assets/images/location.png')}
              />
            )}
            <ResponsiveText size={13} style={style.locationStyle}>
              {' '}
              {data?.city && ` ${data.city} ,`}
              {data?.country && `${data.country} `}
            </ResponsiveText>
          </View>
          <CustomButton buttonText="VIEW" />
        </View>
      </View>
      <View style={style.cardBody}>
        <View>
          <ResponsiveText size={14} style={style.tagTitle}>
            Causes
          </ResponsiveText>
          <View style={style.tagView}>
            {data?.causes?.length > 0 ? (
              data?.causes.map((item, i) => (
                <Tag key={i} text={item} borderColor="#f06f07" />
              ))
            ) : (
              <ResponsiveText size={13}>No Causes</ResponsiveText>
            )}
          </View>
        </View>
        <View>
          <ResponsiveText size={14} style={style.tagTitle}>
            Skills
          </ResponsiveText>
          <View style={style.tagView}>
            {data?.skills?.length > 0 ? (
              data?.skills.map((item, i) => (
                <ResponsiveText key={i} size={14} style={style.skillsItemStyle}>
                  {`${item} | `}
                </ResponsiveText>
              ))
            ) : (
              <ResponsiveText size={13}>No Skills</ResponsiveText>
            )}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}
let style = StyleSheet.create({
  mainView: {
    width: vh(47),
    margin: 10,
    borderRadius: 15,
    overflow: 'hidden',
    borderColor: '#eaeaea',
    borderWidth: 1,
  },
  cardHeader: {
    height: vh(23),
    padding: 20,
    backgroundColor: '#fff1e5',
    justifyContent: 'space-between',
  },
  profileImageAndNameView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  volunteerNameAndOrgName: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  orgName: {
    fontFamily: 'Montserrat-SemiBold',
    color: '#f06d05',
  },
  volunteerName: {
    fontFamily: 'Montserrat-SemiBold',
    color: '#212529',
  },
  profileImage: {
    height: vw(15),
    width: vw(15),
    borderRadius: 100,
    overflow: 'hidden',
  },
  locationAndButtomView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  locationAndImageView: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationStyle: {
    color: '#212529',
    fontFamily: 'Montserrat-Regular',
    width: vw(40),
    marginLeft: 8,
  },
  cardBody: {
    padding: 20,
  },
  tagTitle: {
    color: '#212529',
    fontFamily: 'Montserrat-SemiBold',
  },
  tagView: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    margin: 10,
  },
  skillsItemStyle: {
    color: '#212529',
    fontFamily: 'Montserrat-Regular',
    fontWeight: '600',
  },
});
