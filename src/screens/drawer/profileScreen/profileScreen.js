import React, {useEffect, useState} from 'react';
import {ScrollView, View, Image, Dimensions, StyleSheet} from 'react-native';
import Iocn1 from 'react-native-vector-icons/Entypo';
import Icon2 from 'react-native-vector-icons/AntDesign';
import Icon3 from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  CustomButton,
  CustomSpinner,
  RenderS3Image,
  ImagePickerActionSheet,
  ResponsiveText,
} from '../../../components/index';
import {
  ProfileScreenCardWrapper,
  ItemsSelectorCard,
  ProfileScreenCardsHeader,
  VolunteerProducts,
  VolunteerActivities,
  JourneymapAndVolunExpTabs,
} from './components/index';
import {
  Permission,
  PERMISSION_TYPE,
} from '../../../appPermissions/appPermissions';
import {
  heightPercentageToDP as vh,
  normalize,
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
  let [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    route?.params?.volunteer &&
      navigation.setOptions({
        headerLeft: props => (
          <View {...props} style={style.headerLeft}>
            <Icon3
              name="chevron-back"
              color="#fd7e14"
              size={normalize(20)}
              onPress={() => navigation.goBack()}
            />
          </View>
        ),
      });
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
          // getstories({
          //   variables: {volunteerId: user.volunteerId, isPublished: true},
          // });
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

  return !isLoading ? (
    <ScrollView nestedScrollEnabled={true}>
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
      <JourneymapAndVolunExpTabs
        volunteer={volunteer}
        authorized={authorized}
      />
      <VolunteerActivities volunteer={volunteer} />
      <VolunteerProducts volunteer={volunteer} />
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
    </ScrollView>
  ) : (
    <View style={style.spinnerView}>
      <CustomSpinner size="lg" color="#f06d06" />
    </View>
  );
}

let style = StyleSheet.create({
  spinnerView: {flex: 1, backgroundColor: '#fff', justifyContent: 'center'},
  headerLeft: {borderRadius: 100, overflow: 'hidden', marginLeft: 10},
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
});
