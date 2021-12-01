import React, {useEffect, useState} from 'react';
import {
  FlatList,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import {Actionsheet} from 'native-base';
import Iocn1 from 'react-native-vector-icons/Entypo';
import Icon2 from 'react-native-vector-icons/AntDesign';
import Icon3 from 'react-native-vector-icons/MaterialIcons';
import ImagePicker from 'react-native-image-crop-picker';
import {
  Permission,
  PERMISSION_TYPE,
} from '../../../appPermissions/appPermissions';
import RNFetchBlob from 'react-native-fetch-blob';
import CustomButton from '../../../components/common/button/button';
import ProfileScreenCardWrapper from '../../../components/constant/profileScreenComponents/profileScreenCardWrapper/profileScreenCardWrapper';
import ItemsSelectorCard from '../../../components/constant/profileScreenComponents/itemsSelectorCard/itemsSelectorCard';
import ProductCard from '../../../components/common/productCard/productCard';
import style from './profileScreenStyle';
import CustomSpinner from '../../../components/common/spinner/spinner';
import AsyncStorage from '@react-native-async-storage/async-storage';
import VolunteeringExperience from '../../../components/constant/profileScreenComponents/volunteeringExperience/volunteeringExperience';
import JourneyMap from '../../../components/constant/profileScreenComponents/journeyMap/journeyMap';
import {useLazyQuery} from '@apollo/client';
import {
  getActivities,
  getMyProducts,
  getVolunteerPublishedStories,
} from '../../../../graphql/queries';
import EmptyDataComponent from '../../../components/common/emptyDataComponent/emptyDataComponent';
import RenderS3Image from '../../../components/common/renderS3Image/renderS3Image';
import {
  base64ToFile,
  compressImage,
  getImageDimensions,
} from '../../../shared/services/helper';
import {
  _putFileToS3,
  _removeFileFromS3,
} from '../../../shared/services/s3Services';

export default function ProfileScreen() {
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

  useEffect(() => {
    (async function () {
      try {
        let user = await AsyncStorage.getItem('volunteer');
        user = JSON.parse(user);
        if (user.volunteerId) {
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
  }, []);

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

  let selectImage = async type => {
    setIsActionSheetOpen(false);
    Permission.requestMultiple([PERMISSION_TYPE.photo, PERMISSION_TYPE.camera]);
    let option = {
      width: 300,
      height: 400,
      cropping: true,
      includeBase64: true,
    };
    switch (type) {
      case 'camera': {
        ImagePicker.openCamera(option)
          .then(async img => {
            setImage(img.path);
            compressImage(img.path).then(res => {
              RNFetchBlob.fs.readFile(res, 'base64').then(async data => {
                let buffer = await Buffer.from(data, 'base64');
                _putFileToS3(`VOLUNTEER/${volunteer?.volunteerId}.webp`, buffer)
                  .then(res => {
                    console.log(res, 'success');
                  })
                  .catch(err => {
                    console.log(err, 'Err');
                  });
              });
            });
          })
          .catch(err => {
            console.log(err);
          });
        break;
      }
      case 'library': {
        ImagePicker.openPicker(option)
          .then(image => {
            setImage(image.path);
            console.log(img);
          })
          .catch(err => {
            console.log(err);
          });
        break;
      }
      case 'removeImage': {
        _removeFileFromS3(`VOLUNTEER/${volunteer?.volunteerId}.webp`)
          .then(res => {
            console.log(res, 'Deleted');
            setImage();
          })
          .catch(err => {
            console.log(err, 'Error');
          });
        break;
      }
    }
  };

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
              {/* {image ? (
                <Image
                  alt="profile image"
                  source={{uri: image}}
                  resizeMode="cover"
                  style={style.profileImageStyle}
                />
              ) : (
                // <Image
                //   alt="profile image"
                //   source={require('../../../assets/images/no-img-event-card.png')}
                // resizeMode="cover"
                // style={style.profileImageStyle}
                // />
                )} */}
              <RenderS3Image
                resizeMode="cover"
                style={style.profileImageStyle}
                s3Key={`VOLUNTEER/${volunteer?.volunteerId}.webp`}
                onClick={() => setIsActionSheetOpen(true)}
                imageUrl={image}
              />
              {/* <TouchableOpacity
                    activeOpacity={0.5}
                    onPress={() => setIsActionSheetOpen(true)}>
              </TouchableOpacity> */}
            </View>
            <Text style={style.userNameStyle}>{volunteer?.volunteerName}</Text>
            {(volunteer?.city || volunteer?.country) && (
              <View>
                <Text style={style.userLocationStyle}>
                  <Iocn1 name="location-pin" color="#f06d06" size={20} />
                  {volunteer?.city && `${volunteer.city} ,`}
                  {volunteer?.country && `${volunteer.country} `}
                </Text>
              </View>
            )}
            <View style={style.userFollowersView}>
              {userFollowersDet.map((item, i) => (
                <View key={i} style={style.userFollower}>
                  <Text style={style.userFollowerText}>{item.number}</Text>
                  <Text style={style.userFollowerText}>{item.type}</Text>
                </View>
              ))}
            </View>
            <View>
              <View style={style.buttonView}>
                <CustomButton buttonText="Follow" />
                <CustomButton
                  icon={<Icon2 name="message1" color="#fff" size={20} />}
                />
                <CustomButton
                  icon={<Iocn1 name="thumbs-up" color="#fff" size={20} />}
                />
              </View>
            </View>
          </View>
          {volunteer?.aboutMe && (
            <ProfileScreenCardWrapper>
              <Text style={style.aboutTitle}>About</Text>
              <Text style={style.aboutText}>{volunteer?.aboutMe}</Text>
            </ProfileScreenCardWrapper>
          )}
          <ItemsSelectorCard
            selectedItems={volunteer?.skills}
            title="Skills"
            volunteer={volunteer}
            setVolunteer={setVolunteer}
          />
          <ItemsSelectorCard
            selectedItems={volunteer?.causes}
            title="Causes"
            volunteer={volunteer}
            setVolunteer={setVolunteer}
          />

          <ProfileScreenCardWrapper>
            <View style={style.timeLineHeader}>
              <TouchableOpacity
                onPress={() => {
                  setIsJourneyMap(true);
                  setIsVolunterringExp(false);
                }}>
                <Text
                  style={[
                    style.timeLineHeaderTitle,
                    isJourneyMap && style.focusedHeaderTimeTitle,
                  ]}>
                  Journey map
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setIsJourneyMap(false);
                  setIsVolunterringExp(true);
                }}>
                <Text
                  style={[
                    style.timeLineHeaderTitle,
                    isVolunterringExp && style.focusedHeaderTimeTitle,
                  ]}>
                  Volunteering experience
                </Text>
              </TouchableOpacity>
            </View>
            {isJourneyMap && (
              <JourneyMap volunteer={volunteer} storiesData={storiesData} />
            )}
            {isVolunterringExp && (
              <VolunteeringExperience volunteer={volunteer} />
            )}
          </ProfileScreenCardWrapper>

          {activities?.length > 0 && (
            <ProfileScreenCardWrapper>
              <View style={style.titleAndLinkView}>
                <Text style={style.titleStyle}>Activity</Text>
                <TouchableOpacity>
                  <Text style={style.linkStyle}>Sell all</Text>
                </TouchableOpacity>
              </View>
              <FlatList
                data={activities}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={style.contentContainerStyle}
                ListEmptyComponent={<CustomSpinner size="lg" color="#f06d06" />}
                renderItem={({item, index}) => (
                  <TouchableOpacity key={index} style={style.activityView}>
                    <RenderS3Image
                      resizeMode="contain"
                      style={style.activityImageStyle}
                      s3Key={`ACTIVITY/${item?.activityId}.webp`}
                    />
                    <View style={style.activityTitleAndPostedByView}>
                      <Text style={style.activityTitle}>
                        {item.activityName}
                      </Text>
                      <Text style={style.activityPostedByText}>
                        {volunteer.volunteerName}
                      </Text>
                    </View>
                  </TouchableOpacity>
                )}
              />
            </ProfileScreenCardWrapper>
          )}
          <ProfileScreenCardWrapper>
            <View style={style.titleAndLinkView}>
              <Text style={style.titleStyle}>Products in charity store</Text>
              <TouchableOpacity>
                <Text style={style.linkStyle}>Sell all</Text>
              </TouchableOpacity>
            </View>
            {myProducts?.length >= 0 ? (
              <FlatList
                data={myProducts}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={style.contentContainerStyle}
                ListEmptyComponent={<EmptyDataComponent title="Products" />}
                renderItem={({item, index}) => (
                  <ProductCard key={index} productDetail={item} />
                )}
              />
            ) : (
              <CustomSpinner size="lg" color="#f06d06" />
            )}
          </ProfileScreenCardWrapper>
          <Actionsheet
            isOpen={isActionSheetOpen}
            onClose={setIsActionSheetOpen}>
            <Actionsheet.Content>
              <Actionsheet.Item
                onPress={() => selectImage('camera')}
                startIcon={<Iocn1 name="camera" color="#f06d06" size={30} />}>
                Take a photo
              </Actionsheet.Item>
              <Actionsheet.Item
                onPress={() => selectImage('library')}
                startIcon={
                  <Icon3 name="photo-library" color="#f06d06" size={30} />
                }>
                Choose from Library
              </Actionsheet.Item>
              <Actionsheet.Item
                onPress={() => selectImage('removeImage')}
                startIcon={<Icon3 name="delete" color="red" size={30} />}>
                Remove image
              </Actionsheet.Item>
              <Actionsheet.Item
                onPress={selectImage}
                style={style.actionsheetItemCancelText}>
                Cancel
              </Actionsheet.Item>
            </Actionsheet.Content>
          </Actionsheet>
        </>
      ) : (
        <CustomSpinner size="lg" color="#f06d06" />
      )}
    </ScrollView>
  );
}
