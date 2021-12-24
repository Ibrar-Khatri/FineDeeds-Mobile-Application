import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  TouchableOpacity,
  View,
  Image,
  Dimensions,
  StyleSheet,
} from 'react-native';
import Iocn1 from 'react-native-vector-icons/Entypo';
import Icon2 from 'react-native-vector-icons/AntDesign';
import {useLazyQuery} from '@apollo/client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  CustomButton,
  ProductCard,
  CustomSpinner,
  RenderS3Image,
  ImagePickerActionSheet,
  FlatListComponent,
  ResponsiveText,
} from '../../../components/common/common';
import {
  ProfileScreenCardWrapper,
  ItemsSelectorCard,
  VolunteeringExperience,
  JourneyMap,
  ProfileScreenCardsHeader,
  ActivityCard,
} from '../../../components/constant/profileScreenComponents/index';
import {
  getActivities,
  getMyProducts,
  getVolunteerPublishedStories,
} from '../../../../graphql/queries';
import {
  _putFileToS3,
  _removeFileFromS3,
} from '../../../shared/services/s3Services';
import {
  Permission,
  PERMISSION_TYPE,
} from '../../../appPermissions/appPermissions';
import {
  heightPercentageToDP as vh,
  widthPercentageToDP as vw,
} from '../../../responsive/responsive';
import {isLoggedIn} from '../../../shared/services/authServices';

const screenWidth = Dimensions.get('window').width;

export default function ProfileScreen(props) {
  const {route, navigation} = props;
  let [isActionSheetOpen, setIsActionSheetOpen] = useState(false);
  let [isLoading, setIsLoading] = useState(true);
  let [volunteer, setVolunteer] = useState();
  let [image, setImage] = useState(null);
  let [isJourneyMap, setIsJourneyMap] = useState(true);
  let [isVolunterringExp, setIsVolunterringExp] = useState(false);
  let [myProducts, setMyProducts] = useState(null);
  let [getActivitiesById, activitiesData] = useLazyQuery(getActivities);
  let [getProductsById, productsData] = useLazyQuery(getMyProducts);
  let [getstories, storiesData] = useLazyQuery(getVolunteerPublishedStories);
  let [activities, setActivities] = useState(null);
  let [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    (async function () {
      try {
        let user = route?.params?.volunteer
          ? route?.params?.volunteer
          : await AsyncStorage.getItem('volunteer');
        user = route?.params?.volunteer
          ? route?.params?.volunteer
          : JSON.parse(user);
        if (user.volunteerId) {
          isLoggedIn()
            .then(res => {
              res.attributes.sub === user.volunteerId && setAuthorized(true);
            })
            .catch(err => {
              console.log(err);
            });
          setIsLoading(false);
          setVolunteer(user);
          getActivitiesById({
            variables: {
              limit: 3,
              volunteerId: user.volunteerId,
            },
          });
          getProductsById({
            variables: {
              input: {
                limit: 4,
                filter: {
                  status: 'AVAILABLE',
                  seller: user.volunteerId,
                },
              },
            },
          });
          getstories({
            variables: {volunteerId: user.volunteerId, isPublished: true},
          });
        }
      } catch (e) {
        console.log('error', e);
      }
    })();

    return () => {
      navigation.setParams({
        volunteer: '',
      });
    };
  }, []);

  async function invokeActionSheet() {
    await Permission.requestMultiple([
      PERMISSION_TYPE.photo,
      PERMISSION_TYPE.camera,
    ]);
    setIsActionSheetOpen(true);
  }

  useEffect(() => {
    if (activitiesData?.data?.getActivities?.items?.length >= 0) {
      setActivities(activitiesData?.data?.getActivities?.items);
    }
    if (productsData?.data?.getMyProducts?.items?.length >= 0) {
      setMyProducts(productsData?.data?.getMyProducts?.items);
    }
  }, [
    activitiesData?.data?.getActivities?.items,
    productsData?.data?.getMyProducts?.items,
  ]);

  let userFollowersDet = [
    {
      number: 14,
      type: 'Followers',
    },
    {
      number: 14,
      type: 'Following',
    },
    {
      number: 14,
      type: 'Participations',
    },
    {
      number: 14,
      type: 'Donations',
    },
  ];

  return (
    <ScrollView nestedScrollEnabled={true}>
      {!isLoading ? (
        <>
          <View style={style.profileView}>
            <Image
              alt="backgroung image"
              style={style.backgroungImage}
              source={require('../../../assets/images/jumbotrun.png')}
              resizeMode="cover"
            />
            <View style={style.profileImageView}>
              <RenderS3Image
                resizeMode="cover"
                style={style.profileImageStyle}
                s3Key={
                  volunteer?.volunteerId &&
                  `VOLUNTEER/${volunteer?.volunteerId}.webp`
                }
                onClick={authorized && invokeActionSheet}
                imageUrl={image}
              />
            </View>
            <ResponsiveText style={style.userNameStyle} size={16}>
              {volunteer?.volunteerName}
            </ResponsiveText>
            {(volunteer?.city || volunteer?.country) && (
              <ResponsiveText style={style.userLocationStyle} size={13}>
                <Iocn1 name="location-pin" color="#f06d06" size={vh(2.7)} />
                {volunteer?.city && `${volunteer.city} ,`}
                {volunteer?.country && `${volunteer.country} `}
              </ResponsiveText>
            )}
            <View style={style.userFollowersView}>
              {userFollowersDet.map((item, i) => (
                <View key={i} style={style.userFollower}>
                  <ResponsiveText style={style.userFollowerText} size={10}>
                    {item.number}
                  </ResponsiveText>
                  <ResponsiveText style={style.userFollowerText} size={10}>
                    {item.type}
                  </ResponsiveText>
                </View>
              ))}
            </View>
            <View>
              <View style={style.buttonView}>
                <CustomButton buttonText="Follow" />
                <CustomButton
                  icon={<Icon2 name="message1" color="#fff" size={vh(3)} />}
                />
                <CustomButton
                  icon={<Iocn1 name="thumbs-up" color="#fff" size={vh(3)} />}
                />
              </View>
            </View>
          </View>
          {volunteer?.aboutMe && (
            <ProfileScreenCardWrapper>
              <ProfileScreenCardsHeader title="About" />
              <ResponsiveText style={style.aboutText} size={12}>
                {volunteer?.aboutMe}
              </ResponsiveText>
            </ProfileScreenCardWrapper>
          )}
          <ItemsSelectorCard
            selectedItems={volunteer?.skills}
            title="Skills"
            volunteer={volunteer}
            setVolunteer={setVolunteer}
            authorized={authorized}
          />
          <ItemsSelectorCard
            selectedItems={volunteer?.causes}
            title="Causes"
            volunteer={volunteer}
            setVolunteer={setVolunteer}
            authorized={authorized}
          />

          <ProfileScreenCardWrapper>
            <View style={style.timeLineHeader}>
              <TouchableOpacity
                onPress={() => {
                  setIsJourneyMap(true);
                  setIsVolunterringExp(false);
                }}>
                <ResponsiveText
                  size={12}
                  style={[
                    style.timeLineHeaderTitle,
                    isJourneyMap && style.focusedHeaderTimeTitle,
                  ]}>
                  Journey map
                </ResponsiveText>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setIsJourneyMap(false);
                  setIsVolunterringExp(true);
                }}>
                <ResponsiveText
                  size={12}
                  style={[
                    style.timeLineHeaderTitle,
                    isVolunterringExp && style.focusedHeaderTimeTitle,
                  ]}>
                  Volunteering experience
                </ResponsiveText>
              </TouchableOpacity>
            </View>
            {isJourneyMap && (
              <JourneyMap volunteer={volunteer} storiesData={storiesData} />
            )}
            {isVolunterringExp && (
              <VolunteeringExperience
                volunteer={volunteer}
                authorized={authorized}
              />
            )}
          </ProfileScreenCardWrapper>

          {activities?.length > 0 && (
            <ProfileScreenCardWrapper>
              <ProfileScreenCardsHeader
                title="Activity"
                headerTitle="Activities"
                screenName="listAll-screen"
                initialRouteName="activity_list"
                volunteerId={volunteer.volunteerId}
              />
              <FlatListComponent
                data={activities}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                renderItem={({item, index}) => (
                  <ActivityCard key={index} data={item} volunteer={volunteer} />
                )}
              />
            </ProfileScreenCardWrapper>
          )}
          <ProfileScreenCardWrapper>
            <ProfileScreenCardsHeader
              title="Products in charity store"
              // headerTitle="Products"
              screenName="listAll-screen"
              // initialRouteName="activity_list"
            />
            {myProducts?.length >= 0 ? (
              <FlatListComponent
                data={myProducts}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                emptyDataTitle="Products"
                renderItem={({item, index}) => (
                  <ProductCard key={index} productDetail={item} />
                )}
              />
            ) : (
              <CustomSpinner size="lg" color="#f06d06" />
            )}
          </ProfileScreenCardWrapper>
          <ImagePickerActionSheet
            isActionSheetOpen={isActionSheetOpen}
            setIsActionSheetOpen={setIsActionSheetOpen}
            option={{
              width: 400,
              height: 400,
              cropping: true,
              mediaType: 'photo',
            }}
            image={image}
            setImage={setImage}
            s3Key={`VOLUNTEER/${volunteer?.volunteerId}.webp`}
          />
        </>
      ) : (
        <CustomSpinner size="lg" color="#f06d06" />
      )}
    </ScrollView>
  );
}

let style = StyleSheet.create({
  profileView: {
    backgroundColor: '#fff',
    padding: 20,
    alignItems: 'center',
    marginBottom: 20,
  },
  backgroungImage: {
    height: vw(45),
    width: vw(95),
    borderRadius: 20,
    overflow: 'hidden',
  },
  profileImageView: {
    height: vw(29),
    width: vw(29),
    height: vw(screenWidth < 480 ? 28 : 22),
    width: vw(screenWidth < 480 ? 28 : 22),
    marginTop: vh(-10),
    backgroundColor: '#fff',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImageStyle: {
    height: vw(screenWidth < 480 ? 25 : 20),
    width: vw(screenWidth < 480 ? 25 : 20),
    borderRadius: 100,
    overflow: 'hidden',
    borderColor: '#c3c3c3',
    borderWidth: 1,
  },
  userNameStyle: {
    color: '#212529',
    fontFamily: 'Montserrat-SemiBold',
  },
  userLocationStyle: {
    color: '#212529',
    fontFamily: 'Montserrat-Regular',
  },
  userFollowersView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: vw(80),
    marginTop: 20,
  },
  userFollower: {
    alignItems: 'center',
  },
  userFollowerText: {
    color: '#212529',
    fontFamily: 'Montserrat-SemiBold',
  },
  buttonView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: vw(45),
    marginTop: 20,
  },
  aboutText: {
    fontFamily: 'Montserrat-Regular',
    color: '#212529',
    marginBottom: 15,
  },
  timeLineHeader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 22,
  },
  timeLineHeaderTitle: {
    color: '#2b2b2b',
    fontFamily: 'Poppins-SemiBold',
  },
  focusedHeaderTimeTitle: {
    color: '#f06d06',
    borderBottomColor: '#f06d06',
    borderBottomWidth: 1,
  },
});
