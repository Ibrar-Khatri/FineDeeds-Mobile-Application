import React from 'react';
import {Image, StyleSheet} from 'react-native';
import {View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {
  ResponsiveText,
  RenderS3Image,
  Tag,
  CustomButton,
  CardWrapper,
} from '../../index';
import {widthPercentageToDP as vw} from '../../../responsive/responsive';

export default function ContributorCard(props) {
  let navigation = useNavigation();
  const {data} = props;

  function navigateTo() {
    navigation.push('drawer', {
      screen: 'profile-screen',
      params: {volunteer: data},
    });
  }

  return (
    <CardWrapper style={style.mainView} onPress={navigateTo}>
      <View style={style.cardHeader}>
        <View style={style.profileImageAndNameView}>
          <View style={style.volunteerNameAndOrgName}>
            <ResponsiveText size={16} style={style.volunteerName}>
              {data?.volunteerName}
            </ResponsiveText>
            <ResponsiveText size={13} style={style.orgName}>
              {data?.organization && data?.organization?.orgName}
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
                source={require('../../../assets/images/location.png')}
              />
            )}
            <ResponsiveText size={13} style={style.locationStyle}>
              {data?.city && `${data.city} ,`}
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
              <>
                {data?.causes.slice(0, 3).map((item, i) => (
                  <Tag key={i} text={item} borderColor="#f06f07" />
                ))}
                {data?.causes?.length - 3 > 0 && (
                  <ResponsiveText size={12} style={style.moreTextStyle}>
                    + {data?.causes?.length - 3} more
                  </ResponsiveText>
                )}
              </>
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
              <>
                {data?.skills.slice(0, 3).map((item, i) => (
                  <ResponsiveText
                    key={i}
                    size={13}
                    style={style.skillsItemStyle}>
                    {`${item} | `}
                  </ResponsiveText>
                ))}
              </>
            ) : (
              <ResponsiveText size={13}>No Skills</ResponsiveText>
            )}
            {data?.skills?.length - 3 > 0 && (
              <ResponsiveText size={12} style={style.moreTextStyle}>
                + {data?.skills?.length - 3} more
              </ResponsiveText>
            )}
          </View>
        </View>
      </View>
    </CardWrapper>
  );
}
let style = StyleSheet.create({
  cardHeader: {
    padding: 20,
    backgroundColor: '#fff1e5',
  },
  profileImageAndNameView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: vw(3),
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
    justifyContent: 'space-around',
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
  moreTextStyle: {
    color: '#f16e06',
    fontFamily: 'Montserrat-SemiBold',
    textAlignVertical: 'center',
    marginLeft: 'auto',
    alignSelf: 'center',
  },
});
