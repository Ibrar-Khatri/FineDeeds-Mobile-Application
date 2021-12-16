import {useLazyQuery, useMutation} from '@apollo/client';
import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {ScrollView, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Octicons from 'react-native-vector-icons/Octicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {
  getStory,
  getVolunteerById,
  getVolunteerContributionsCount,
} from '../../../../graphql/queries';
import CommentSection from '../../../components/common/commentSection/comment/commentSection';
import RenderHtmlTags from '../../../components/common/renderHtmlTags/renderHtmlTags';
import RenderS3Image from '../../../components/common/renderS3Image/renderS3Image';
import ResponsiveText from '../../../components/common/responsiveText/responsiveText';
import CustomSpinner from '../../../components/common/spinner/spinner';
import {isLoggedIn} from '../../../shared/services/authServices';
import style from './storyDetailScreenStyle';
import {normalize} from '../../../responsive/responsive';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {likeStory} from '../../../../graphql/mutations';

export default function StoryDetailScreen(props) {
  const {data: storyDet} = props;
  let [user, setUser] = useState();
  const [getStoriesCount, getStoriesCountData] = useLazyQuery(
    getVolunteerContributionsCount,
  );
  const [like_story] = useMutation(likeStory);
  const [getStoryById, {data}] = useLazyQuery(getStory);
  let [getVolunteer, volunteerData] = useLazyQuery(getVolunteerById);
  let navigation = useNavigation();
  const [likes, setLikes] = useState([]);

  useEffect(() => {
    data?.getStory && setLikes(data?.getStory?.likes);
  }, [data?.getStory]);

  useEffect(() => {
    if (storyDet?.storyId) {
      getStoriesCount({
        variables: {volunteerId: storyDet?.createdBy?.volunteerId},
      });
      getVolunteer({
        variables: {volunteerId: storyDet?.createdBy?.volunteerId},
      });
      getStoryById({
        variables: {storyId: storyDet?.storyId},
      });
    }
    isLoggedIn()
      .then(async res => {
        AsyncStorage.getItem('volunteer').then(res => {
          setUser(JSON.parse(res));
        });
      })
      .catch(err => {
        console.log(err, 'Error');
      });
  }, [data]);

  function viewProfile() {
    navigation.navigate('profile-screen', {
      volunteer: volunteerData?.data?.getVolunteerById,
    });
  }

  const handleLike = () => {
    const {volunteerId, volunteerName, city, country} = user;

    const virtualLike = {
      likedBy: {
        city,
        country,
        createdAt: new Date().getTime(),
        volunteerId,
        volunteerName,
      },
    };

    let updatedLikes = [...likes];

    if (
      !updatedLikes.length ||
      !updatedLikes.find(like => like.likedBy.volunteerId === volunteerId)
    ) {
      updatedLikes.push(virtualLike);
    } else {
      updatedLikes = updatedLikes.filter(
        like => like.likedBy.volunteerId !== volunteerId,
      );
    }

    setLikes(updatedLikes);
  };

  const like = () => {
    if (user?.volunteerId) {
      const {volunteerId} = user;
      //   setLikeLoading(true);
      handleLike();
      like_story({
        variables: {
          input: {
            likedBy: volunteerId,
            storyId: storyDet?.storyId,
          },
        },
      })
        .then(({data}) => {
          //   setLikeLoading(false);
          console.log(data);
        })
        .catch(({message}) => {
          //   toast.error(message.replace('GraphQL error: ', ''));
          //   setLikeLoading(false);
        });
    } else {
      //   toast.warn('Please Login to like this story');
    }
  };
  return (
    <ScrollView style={style.storyDetailMainView}>
      <RenderS3Image
        s3Key={storyDet?.storyId && `STORY/${storyDet?.storyId}.webp`}
        resizeMode="cover"
        style={style.storyImage}>
        <ResponsiveText size={10} style={style.publishDateStyle}>
          {data?.getStory?.isPublished ? 'Published on ' : 'Drafted on '}{' '}
          {moment(data?.getStory?.createdAt).format('MMM Do YYYY')}
        </ResponsiveText>
      </RenderS3Image>
      <View style={style.storyView}>
        <RenderHtmlTags
          source={{
            html: data?.getStory?.story?.replace('<p><br></p>', ''),
          }}
          tagsStyles={style.tagsStyles}
        />
        {user?.volunteerId === data?.getStory?.createdBy?.volunteerId && (
          <View style={style.iconView}>
            <TouchableOpacity>
              <Octicons name="pencil" size={normalize(18)} color="#f06d06" />
            </TouchableOpacity>
            <TouchableOpacity>
              <MaterialIcons name="delete" size={normalize(18)} color="red" />
            </TouchableOpacity>
          </View>
        )}
      </View>
      <View style={style.publishView}>
        <ResponsiveText style={style.publishedBy} size={15}>
          Published By
        </ResponsiveText>

        {getStoriesCountData?.data?.getVolunteerContributionsCount &&
        volunteerData?.data?.getVolunteerById ? (
          <View style={style.publisherDetailMainView}>
            <TouchableOpacity
              style={style.profilImageAndNameView}
              onPress={viewProfile}
              activeOpacity={0.5}>
              <RenderS3Image
                s3Key={`VOLUNTEER/${data?.getStory?.createdBy?.volunteerId}.webp`}
                style={style.profileImageView}
              />
              <View style={style.textView}>
                <ResponsiveText size={13} style={style.volunName}>
                  {data?.getStory?.createdBy?.volunteerName}
                </ResponsiveText>
                <ResponsiveText size={12} style={style.orgName}>
                  {data?.getStory?.orgName}
                </ResponsiveText>
                <ResponsiveText size={12} style={style.orgName}>
                  {data?.getStory?.isPublished
                    ? `Published - ${moment(
                        data?.getStory?.publishedAt,
                      ).fromNow()}`
                    : `Drafted on ${data?.getStory?.publishedOn}`}
                </ResponsiveText>
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <ResponsiveText style={style.storiesLength} size={12}>{`${
                getStoriesCountData?.data?.getVolunteerContributionsCount
                  ?.storiesCount
              } ${
                getStoriesCountData?.data?.getVolunteerContributionsCount
                  ?.storiesCount > 1
                  ? 'Stories'
                  : 'Story'
              }`}</ResponsiveText>
            </TouchableOpacity>
          </View>
        ) : (
          <CustomSpinner size="lg" color="#f06d06" />
        )}
      </View>
      <View style={style.shareSection}>
        <View style={style.likeView}>
          <TouchableOpacity onPress={like}>
            <FontAwesome
              name="thumbs-up"
              size={normalize(20)}
              color={
                likes?.find(
                  item => user?.volunteerId === item.likedBy.volunteerId,
                )
                  ? '#fd7e14'
                  : '#6c757d'
              }
            />
          </TouchableOpacity>
          <ResponsiveText size={13}>{`${likes && likes?.length} ${
            likes?.length > 1 ? 'Likes' : 'Like'
          }`}</ResponsiveText>
        </View>
        <View></View>
      </View>
      <View style={style.CommentSectionView}>
        <CommentSection
          placeholder="Write a comment"
          objId={storyDet?.storyId}
          objType={'STORY'}
        />
      </View>
    </ScrollView>
  );
}
