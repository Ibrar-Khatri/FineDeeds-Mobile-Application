import React, {useEffect, useState} from 'react';
import {useLazyQuery, useMutation} from '@apollo/client';
import moment from 'moment';
import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Octicons from 'react-native-vector-icons/Octicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Actionsheet, useToast} from 'native-base';
import {
  CommentSection,
  RenderHtmlTags,
  ResponsiveText,
  CustomSpinner,
  RenderS3Image,
  CustomToast,
  Participant,
} from '../../../components/index';
import {
  getStory,
  getVolunteerById,
  getVolunteerContributionsCount,
} from '../../../../graphql/queries';
import {likeStory} from '../../../../graphql/mutations';
import {isLoggedIn} from '../../../shared/services/authServices';
import {
  normalize,
  widthPercentageToDP as vw,
  heightPercentageToDP as vh,
} from '../../../responsive/responsive';

export default function StoryDetailScreen(props) {
  const {data: storyDet} = props;
  let [storyData, setStoryData] = useState();
  let [user, setUser] = useState();
  const [getStoriesCount, getStoriesCountData] = useLazyQuery(
    getVolunteerContributionsCount,
  );
  const [like_story, likeStoryData] = useMutation(likeStory);
  const [getStoryById, getStoryData] = useLazyQuery(getStory, {
    fetchPolicy: 'network-only',
  });
  let [getVolunteer, volunteerData] = useLazyQuery(getVolunteerById);
  let navigation = useNavigation();
  let [likes, setLikes] = useState([]);
  let [invokeActionSheet, setInvokeActionSheet] = useState(false);
  let toast = useToast();

  useEffect(() => {
    if (getStoryData?.data?.getStory) {
      setStoryData(getStoryData?.data?.getStory);
      setLikes(getStoryData?.data?.getStory?.likes);
    }
  }, [getStoryData?.data?.getStory]);

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
  }, [storyDet]);

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
      if (!likeStoryData.loading) {
        const {volunteerId} = user;
        handleLike();
        like_story({
          variables: {
            input: {
              likedBy: volunteerId,
              storyId: storyDet.storyId,
            },
          },
        })
          .then(({data}) => {
            // console.log(data?.likeStory, 'data?.likeStory?.likes');
          })
          .catch(({message}) => {
            // console.log(message.replace('GraphQL error: ', ''));
            renderToast('error', message.replace('GraphQL error: ', ''));
          });
      }
    } else {
      renderToast('warning', 'Please Login to like this story');
    }
  };

  function renderToast(type, description) {
    toast.show({
      placement: 'top',
      duration: 2000,
      render: () => <CustomToast type={type} description={description} />,
    });
  }

  function viewProfile() {
    navigation.push('drawer', {
      screen: 'profile-screen',
      params: {volunteer: volunteerData?.data?.getVolunteerById},
    });
  }

  return (
    <ScrollView style={style.storyDetailMainView}>
      {storyData ? (
        <>
          <RenderS3Image
            s3Key={`STORY/${storyDet?.storyId}.webp`}
            resizeMode="cover"
            style={style.storyImage}>
            <ResponsiveText size={10} style={style.publishDateStyle}>
              {storyData?.isPublished ? 'Published on ' : 'Drafted on '}
              {moment(storyData?.createdAt).format('MMM Do YYYY')}
            </ResponsiveText>
          </RenderS3Image>
          <View style={style.storyView}>
            <RenderHtmlTags
              source={{
                html: storyData?.story?.replace('<p><br></p>', ''),
              }}
              tagsStyles={style.tagsStyles}
            />
            {user?.volunteerId === storyData?.createdBy?.volunteerId && (
              <View style={style.iconView}>
                <TouchableOpacity>
                  <Octicons
                    name="pencil"
                    size={normalize(18)}
                    color="#f06d06"
                  />
                </TouchableOpacity>
                <TouchableOpacity>
                  <MaterialIcons
                    name="delete"
                    size={normalize(18)}
                    color="red"
                  />
                </TouchableOpacity>
              </View>
            )}
          </View>
          <View style={style.publishView}>
            <ResponsiveText style={style.publishedBy} size={15}>
              Published By
            </ResponsiveText>

            {getStoriesCountData?.data &&
            volunteerData?.data?.getVolunteerById ? (
              <View style={style.publisherDetailMainView}>
                <TouchableOpacity
                  style={style.profilImageAndNameView}
                  onPress={viewProfile}
                  activeOpacity={0.5}>
                  <RenderS3Image
                    s3Key={`VOLUNTEER/${storyData?.createdBy?.volunteerId}.webp`}
                    style={style.profileImageView}
                  />
                  <View style={style.textView}>
                    <ResponsiveText size={13} style={style.volunName}>
                      {storyData?.createdBy?.volunteerName}
                    </ResponsiveText>
                    {storyData?.orgName && (
                      <ResponsiveText size={12} style={style.orgName}>
                        {storyData?.orgName}
                      </ResponsiveText>
                    )}
                    <ResponsiveText size={12} style={style.orgName}>
                      {storyData?.isPublished
                        ? `Published - ${moment(
                            storyData?.publishedAt,
                          ).fromNow()}`
                        : `Drafted on ${storyData?.publishedOn}`}
                    </ResponsiveText>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() =>
                    navigation.push('listAll-screen', {
                      initialRouteName: 'story_list',
                      title: 'Stories',
                      volunteerId:
                        volunteerData?.data?.getVolunteerById?.volunteerId,
                    })
                  }>
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
              <TouchableOpacity
                onPress={like}
                activeOpacity={likeStoryData.loading ? 1 : 0.5}>
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
              <ResponsiveText size={15} style={style.likeLength}>
                {`  ${likes?.length} `}
              </ResponsiveText>
              <TouchableOpacity onPress={() => setInvokeActionSheet(true)}>
                <ResponsiveText size={15} style={style.likeText}>
                  {likes?.length > 1 ? 'Likes' : 'Like'}
                </ResponsiveText>
              </TouchableOpacity>
            </View>
          </View>
          <View style={style.CommentSectionView}>
            <CommentSection objId={storyDet?.storyId} objType={'STORY'} />
          </View>
        </>
      ) : (
        <CustomSpinner size="lg" color="#f06d06" />
      )}
      <Actionsheet isOpen={invokeActionSheet} onClose={setInvokeActionSheet}>
        <Actionsheet.Content>
          <Actionsheet.Item style={style.likeTitleView}>
            <ResponsiveText style={style.likeTitle} size={17}>
              Likes
            </ResponsiveText>
          </Actionsheet.Item>

          {likes.length > 0 ? (
            likes.map((like, i) => (
              <Actionsheet.Item key={i}>
                <Participant likeData={like} />
              </Actionsheet.Item>
            ))
          ) : (
            <Actionsheet.Item style={style.noLikeItem}>
              <View style={style.noLikeYetView}>
                <FontAwesome
                  name="thumbs-up"
                  size={normalize(25)}
                  color="#6c757d"
                />
                <ResponsiveText size={15} style={style.noLikeYetTextStyle}>
                  No likes yet
                </ResponsiveText>
                <ResponsiveText size={13} style={style.noLikeYetTextStyle}>
                  Be the first to like this
                </ResponsiveText>
              </View>
            </Actionsheet.Item>
          )}
        </Actionsheet.Content>
      </Actionsheet>
    </ScrollView>
  );
}

let style = StyleSheet.create({
  storyDetailMainView: {
    padding: 10,
    backgroundColor: '#fff',
  },
  storyImage: {
    height: vw(55),
    width: '100%',
    borderRadius: 15,
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
  },
  publishDateStyle: {
    backgroundColor: '#f06d06',
    padding: 10,
    borderRadius: 10,
    fontFamily: 'Montserrat-Regular',
    color: '#fff',
  },
  storyView: {
    marginTop: vh(4),
    borderBottomColor: '#ebebeb',
    borderBottomWidth: 1,
    paddingBottom: vh(2),
    marginBottom: vh(2),
  },
  iconView: {
    display: 'flex',
    flexDirection: 'row',
    alignSelf: 'flex-end',
    width: vw(11),
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  tagsStyles: {
    br: {display: 'none'},
    h1: {
      fontSize: normalize(18),
      margin: 0,
      padding: 0,
      fontWeight: '400',
    },
    h2: {
      fontSize: normalize(16),
      margin: 0,
      padding: 0,
    },
    h3: {
      fontSize: normalize(14),
      margin: 0,
      padding: 0,
    },
    body: {
      fontSize: normalize(13),
      color: '#212529',
      fontFamily: 'Montserrat-Bold',
    },
  },
  publishView: {
    borderBottomColor: '#ebebeb',
    borderBottomWidth: 1,
    padding: vh(1),
  },
  publishedBy: {
    color: '#212529',
    fontFamily: 'Montserrat-Bold',
  },
  publisherDetailMainView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 15,
  },
  profilImageAndNameView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  profileImageView: {
    height: vh(8),
    width: vh(8),
    borderRadius: 100,
  },
  textView: {
    marginLeft: 15,
  },
  volunName: {
    color: '#212529',
    fontFamily: 'Montserrat-SemiBold',
  },
  shareSection: {
    paddingTop: 10,
    paddingBottom: 10,
    borderBottomColor: '#ebebeb',
    borderBottomWidth: 1,
    paddingBottom: vh(2),
  },
  likeView: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
  },
  likeLength: {
    color: '#212529',
    fontFamily: 'Montserrat-Regular',
  },
  likeText: {
    color: '#212529',
    fontFamily: 'Montserrat-Regular',
    textDecorationLine: 'underline',
  },
  storiesLength: {
    color: '#212529',
    fontFamily: 'Montserrat-Regular',
    textDecorationLine: 'underline',
  },
  orgName: {
    fontFamily: 'Montserrat-Regular',
    color: '#212529',
  },
  CommentSectionView: {
    padding: 5,
    marginBottom: 15,
  },
  likeTitle: {
    fontFamily: 'Montserrat-Bold',
    color: '#343a40',
  },
  likeTitleView: {
    borderBottomColor: '#ebebeb',
    borderBottomWidth: 2,
  },
  noLikeItem: {
    justifyContent: 'center',
  },
  noLikeYetView: {
    alignItems: 'center',
  },
  noLikeYetTextStyle: {
    color: '#212529',
    fontFamily: 'Montserrat-Regular',
  },
});
