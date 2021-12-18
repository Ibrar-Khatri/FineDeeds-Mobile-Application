import React, {useEffect} from 'react';
import {TouchableOpacity, View} from 'react-native';
import moment from 'moment';
import RenderS3Image from '../renderS3Image/renderS3Image';
import ResponsiveText from '../responsiveText/responsiveText';
import style from './participantStyle';
import {useLazyQuery} from '@apollo/client';
import {getVolunteerById} from '../../../../graphql/queries';
import {useNavigation} from '@react-navigation/native';

export default function Participant(props) {
  let {likeData} = props;
  let navigation = useNavigation();
  let [getVolunteer, volunteerData] = useLazyQuery(getVolunteerById);

  useEffect(() => {
    getVolunteer({
      variables: {volunteerId: likeData?.likedBy?.volunteerId},
    });
  }, []);

  function viewProfile() {
    if (volunteerData?.data?.getVolunteerById)
      navigation.push('drawer', {
        screen: 'profile-screen',
        params: {volunteer: volunteerData?.data?.getVolunteerById},
      });
  }
  return (
    <TouchableOpacity
      style={style.CommentCardMainView}
      activeOpacity={volunteerData?.data?.getVolunteerById ? 0.5 : 1}
      onPress={viewProfile}>
      <RenderS3Image
        s3Key={`VOLUNTEER/${likeData?.likedBy?.volunteerId}.webp`}
        style={style.imageStyle}
      />
      <View style={style.commentSection}>
        <View style={style.volunteerNameView}>
          <ResponsiveText size={13} style={style.volunName}>
            {likeData['likedBy']['volunteerName']}
          </ResponsiveText>
          <ResponsiveText size={12} style={style.since}>
            {moment(likeData['likedBy']).fromNow()}
          </ResponsiveText>
        </View>

        {(likeData?.likedBy?.city || likeData?.likedBy?.country) && (
          <ResponsiveText size={13} style={style.comment}>
            {`${likeData?.likedBy?.city ? likeData?.likedBy?.city + ',' : ''} ${
              likeData?.likedBy?.country || ''
            }`}
          </ResponsiveText>
        )}
      </View>
    </TouchableOpacity>
  );
}
