import React, {useEffect} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import moment from 'moment';
import {useNavigation} from '@react-navigation/native';
import {RenderS3Image, ResponsiveText} from '../index';
import {useLazyQuery} from '@apollo/client';
import {getVolunteerById} from '../../../graphql/queries';
import {heightPercentageToDP as vh, widthPercentageToDP as vw} from '../../responsive/responsive';

export default function Participant(props) {
  const {likeData, data} = props;
  let navigation = useNavigation();
  let [getVolunteer, volunteerData] = useLazyQuery(getVolunteerById);

  useEffect(() => {
    if (likeData || data) {
      getVolunteer({
        variables: {
          volunteerId: likeData
            ? likeData?.likedBy?.volunteerId
            : data?.volunteerId,
        },
      });
    }
  }, [likeData, data]);

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
        s3Key={`VOLUNTEER/${
          likeData ? likeData?.likedBy?.volunteerId : data?.volunteerId
        }.webp`}
        style={style.imageStyle}
      />
      <View style={style.commentSection}>
        <View style={style.volunteerNameView}>
          <ResponsiveText size={13} style={style.volunName}>
            {(likeData || data) && likeData
              ? likeData['likedBy']['volunteerName']
              : data?.volunteerName}
          </ResponsiveText>
          {likeData && (
            <ResponsiveText size={12} style={style.since}>
              {moment(likeData['likedBy']).fromNow()}
            </ResponsiveText>
          )}
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

let style = StyleSheet.create({
  CommentCardMainView: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    margin:vw(4)
  },
  imageStyle: {
    height: vh(8),
    width: vh(8),
    borderRadius: 100,
    overflow: 'hidden',
    borderWidth: 3,
    borderColor: '#fd7e14',
  },

  commentSection: {
    display: 'flex',
    width: '80%',
    marginLeft: vh(2),
  },

  volunteerNameView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  volunName: {
    color: '#212529',
  },
  since: {
    fontFamily: 'Montserrat-Regular',
    color: '#212529',
    marginLeft: 7,
  },
  comment: {
    marginTop: vh(1),
    color: '#212529',
    marginLeft: 7,
  },
  removeCommentView: {
    alignSelf: 'flex-start',
    marginLeft: 7,
  },
  removeComment: {
    fontFamily: 'Montserrat-Regular',
    color: '#777',
  },
});
