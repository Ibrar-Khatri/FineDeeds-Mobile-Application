import React, {useEffect, useState} from 'react';
import {useLazyQuery} from '@apollo/client';
import {useNavigation} from '@react-navigation/native';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import {getVolunteerById} from '../../../../graphql/queries';
import InfoCard from '../../../components/common/cards/infoCard/infoCard';
import RenderS3Image from '../../../components/common/renderS3Image/renderS3Image';
import ResponsiveText from '../../../components/common/responsiveText/responsiveText';
import CustomButton from '../../../components/common/button/button';
import {
  heightPercentageToDP as vh,
  widthPercentageToDP as vw,
} from '../../../responsive/responsive';
import {
  newRenderDate,
  renderEndTime,
  renderTime,
} from '../../../shared/services/helper';
import {isLoggedIn} from '../../../shared/services/authServices';
import Tag from '../../../components/common/tag/tag';
import CommentSection from '../../../components/common/commentSection/comment/commentSection';
import CustomSpinner from '../../../components/common/spinner/spinner';

export default function ActivityDetailScreen(props) {
  const {data} = props;
  let [getVolunteer, volunteerData] = useLazyQuery(getVolunteerById);
  let [isUserAuthenticated, setIsUserAuthenticated] = useState(false);
  let navigation = useNavigation();

  useEffect(() => {
    if (data?.createdBy) {
      getVolunteer({
        variables: {volunteerId: data?.createdBy},
      });
    }
    isLoggedIn()
      .then(res => {
        setIsUserAuthenticated(true);
      })
      .catch(err => {
        setIsUserAuthenticated(false);
      });
  }, []);

  function viewProfile() {
    navigation.push('drawer', {
      screen: 'profile-screen',
      params: {volunteer: volunteerData?.data?.getVolunteerById},
    });
  }

  return (
    <ScrollView style={style.activityDetailScreenView}>
      <RenderS3Image
        resizeMode="contain"
        s3Key={data?.activityId && `ACTIVITY/${data?.activityId}.webp`}
        style={style.imageStyle}
      />
      <ResponsiveText style={style.descriptionTitle} size={18}>
        Description
      </ResponsiveText>
      <View style={style.activityBodyView}>
        <ResponsiveText style={style.descriptionStyle} size={12}>
          {data?.activityDescription}
        </ResponsiveText>
        <View style={style.locationView}>
          <ResponsiveText size={16} style={style.locationTitle}>
            LOCATION
          </ResponsiveText>
          <View style={style.addressAndIconView}>
            <Icon name="location-pin" color="#f06d06" size={vh(3.2)} />
            <ResponsiveText size={12} style={style.address}>
              {` ${data?.activityAddress}`}
            </ResponsiveText>
          </View>
        </View>
        <InfoCard
          title="START DATE"
          subTitle={data?.startDate ? newRenderDate(data?.startDate) : null}
          styles={style.inforCardView}
        />
        <InfoCard
          title="END DATE"
          subTitle={data?.endDate ? newRenderDate(data?.endDate) : null}
          styles={style.inforCardView}
        />
        <InfoCard
          title="DURATION"
          subTitle={
            data?.startTime
              ? `${renderTime(data.startTime)} ${
                  data?.duration
                    ? renderEndTime(data.startTime, data.duration)
                    : ''
                }`
              : 'No Duration'
          }
          styles={style.inforCardView}
        />

        {volunteerData?.data?.getVolunteerById ? (
          <>
            <TouchableOpacity
              style={style.profileView}
              activeOpacity={0.5}
              onPress={viewProfile}>
              <View style={style.profileImageView}>
                <RenderS3Image
                  s3Key={`VOLUNTEER/${data?.createdBy}.webp`}
                  style={style.profileImage}
                />
              </View>
              <View style={style.volunteerNameView}>
                <ResponsiveText size={13} style={style.volunteerName}>
                  {volunteerData?.data?.getVolunteerById?.volunteerName}
                </ResponsiveText>
                <ResponsiveText size={12} style={style.volunteerHost}>
                  Activity
                </ResponsiveText>
              </View>
            </TouchableOpacity>
            <CustomButton
              buttonText={
                isUserAuthenticated ? 'PARTICIPATE' : 'LOGIN TO PARTICIPATE'
              }
            />
          </>
        ) : (
          <CustomSpinner size="lg" color="#f06d06" />
        )}

        <View style={style.participantView}>
          <ResponsiveText size={13} style={style.participantTitle}>
            PARTICIPANTS
          </ResponsiveText>
          <ResponsiveText size={11} style={style.noParticipantText}>
            No Participants
          </ResponsiveText>
        </View>

        <View>
          <ResponsiveText style={style.causesTitle} size={13}>
            CAUSES
          </ResponsiveText>
          <View style={style.causesItemView}>
            {data?.activityCauses?.map((item, i) => (
              <Tag key={i} bgColor="#ffe8ca" text={item} />
            ))}
          </View>
        </View>
        <CommentSection
          objType="ACTIVITY"
          placeholder="Write a comment"
          objId={data?.activityId}
        />
      </View>
    </ScrollView>
  );
}

let style = StyleSheet.create({
  activityDetailScreenView: {
    backgroundColor: '#fff',
  },
  imageStyle: {
    height: vw(55),
    width: '100%',
    borderRadius: 10,
  },
  descriptionTitle: {
    color: '#f06d06',
    fontFamily: 'Montserrat-SemiBold',
    padding: 15,
    borderBottomColor: '#f06d06',
    borderBottomWidth: 2,
    display: 'flex',
    alignSelf: 'flex-start',
    textAlign: 'center',
    marginBottom: 15,
  },
  activityBodyView: {
    padding: 15,
    borderTopColor: '#ebebeb',
    borderTopWidth: 2,
    width: '100%',
  },
  descriptionStyle: {
    fontFamily: 'Montserrat-Regular',
    color: 'rgba(0,0,0,.7)',
    marginBottom: 15,
  },
  locationView: {
    backgroundColor: '#ffefe2',
    padding: vw(3),
    borderRadius: 10,
    marginBottom: 15,
  },
  locationTitle: {
    fontFamily: 'Montserrat-Bold',
    color: '#f06d06',
  },
  address: {
    color: '#212529',
    textAlign: 'center',
  },
  addressAndIconView: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  inforCardView: {
    marginBottom: 20,
  },
  profileView: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  profileImageView: {
    borderColor: '#f06d06',
    borderWidth: 3,
    height: vw(16),
    width: vw(16),
    borderRadius: 100,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImage: {
    height: vw(15),
    width: vw(15),
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
  participantView: {marginTop: 15, display: 'flex', alignItems: 'center'},
  participantTitle: {
    fontFamily: 'Montserrat-Bold',
    color: '#212529',
    borderColor: '#ebebeb',
    borderBottomWidth: 2,
    padding: vw(3),
    width: '100%',
  },
  noParticipantText: {
    marginTop: 15,
    fontFamily: 'Montserrat-Regular',
    color: '#212529',
  },
  causesTitle: {
    fontFamily: 'Montserrat-Bold',
    color: '#212529',
  },
  causesItemView: {
    marginTop: 15,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '85%',
    alignSelf: 'center',
    justifyContent: 'center',
  },
});
