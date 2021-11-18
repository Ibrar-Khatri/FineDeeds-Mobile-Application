import React, {useEffect, useState} from 'react';
import {View, Text, ScrollView, ImageBackground} from 'react-native';
import Slick from 'react-native-slick';
import Auth from '@aws-amplify/auth';
import CustomButton from '../../../components/common/button/button';
import SideDetailCard from '../../../components/constant/homeScreenComponents/sideDetailCard/sideDetailCard';
import {isLoggedIn} from '../../../shared/services/authServices';
import SliderCard from '../../../components/constant/homeScreenComponents/sliderCard/sliderCard';
import style from './homeScreenStyle';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomSpinner from '../../../components/common/spinner/spinner';

export default function HomeScreen({navigation}) {
  let [isUserAutheticated, setIsUserAuthenticated] = useState(false);
  let [isLoading, setIsLoading] = useState(true);
  let user = AsyncStorage.getItem('volunteer').then(res => {});

  useEffect(() => {
    isLoggedIn()
      .then(res => {
        setIsUserAuthenticated(true);
        setIsLoading(false);
      })
      .catch(err => {
        setIsUserAuthenticated(false);
        setIsLoading(false);
      });
  }, [user]);

  let sideDetail1 = [
    {
      image: require('../../../assets/images/charity1.png'),
      title: 'Project',
      detail:
        'Take up projects with nonprofits to help them save costs and build a meanigful association with them.',
    },
    {
      image: require('../../../assets/images/calender.png'),
      title: 'Events',
      detail:
        'Join the events created by nonprofits near you and help them in making a better world.',
    },
    {
      image: require('../../../assets/images/volunteer1.png'),
      title: 'Activities',
      detail:
        'Found nothing that interests you, create your own social activity and invite others or join one near you.',
    },
    {
      image: require('../../../assets/images/stories.png'),
      title: 'Stories',
      detail:
        'Acts of kindness and humanity are contagious. Read the finedeeds stories, get inspired and inspire others.',
    },
  ];
  let whatDoWeOffer = [
    {
      image: require('../../../assets/images/offer1.png'),
      title: 'Unified solution',
      detail:
        'Fundraising, Events , Project and Contributor management, collaboration & communicaton all on a single platform',
    },
    {
      image: require('../../../assets/images/offer3.png'),
      title: 'Easy to use',
      detail:
        'Intuitive and user friendly design. Different dashboards for non-profit and it’s staff / volunteers simplify the user experience',
    },
    {
      image: require('../../../assets/images/offer3.png'),
      title: 'Better networking',
      detail:
        'Connect with people with similar interests, team up for events. Message / comment on posts to reach out to volunteers',
    },
    {
      image: require('../../../assets/images/offer4.png'),
      title: 'Profiles',
      detail:
        'Build your profile , showcase your volunteering experience and be recognized for your work',
    },
    {
      image: require('../../../assets/images/offer5.png'),
      title: 'Inspire & Be inspired',
      detail:
        'A selfless act always sparks another”. Read volunteer stories and spread positivity by sharing your',
    },
    {
      image: require('../../../assets/images/offer6.png'),
      title: 'Analytics',
      detail:
        'A special dashboard for non-profits helps measure growth, manage events and projects, through analytics',
    },
  ];

  let sliderContent = [
    {
      image: require('../../../assets/images/martin.jpg'),
      quote:
        'Every man must decide whether he will walk in the light of creative altruism or in the darkness of destructive selfishness',
      name: '- MARTIN LUTHER KING, JR',
    },
    {
      image: require('../../../assets/images/mother-teresa.png'),
      quote: 'If you cannot feed a hundred people, feed one',
      name: '- Mother Teresa',
    },
  ];

  return (
    <ScrollView>
      {isLoading ? (
        <CustomSpinner size="lg" color="#f06d06" />
      ) : (
        <View style={style.mainView}>
          {!isUserAutheticated && (
            <View>
              <ImageBackground
                source={require('../../../assets/images/jumbotrun.png')}
                style={style.imageStyle}>
                <View style={style.headingAndSubHeadingView}>
                  <Text style={style.headingStyle}>
                    One Step Towards a Better World
                  </Text>
                  <Text style={style.subHeadingStyle}>Be the change</Text>
                </View>
              </ImageBackground>
              <View style={style.sideDetailCardView}>
                {sideDetail1.map((item, i) => (
                  <SideDetailCard
                    key={i}
                    imageSource={item.image}
                    title={item.title}
                    detail={item.detail}
                  />
                ))}
              </View>
            </View>
          )}
          <View style={style.whatDoWeOffer}>
            <Text style={style.whatDoWeOffertEXT}>WHAT DO WE OFFER</Text>
            {whatDoWeOffer.map((item, i) => (
              <SideDetailCard
                key={i}
                imageSource={item.image}
                title={item.title}
                detail={item.detail}
              />
            ))}
          </View>
          <View style={style.joinAsNonProfitView}>
            <ImageBackground
              source={require('../../../assets/images/become-nonprofit.png')}>
              <View style={style.joinAsNonProfittextView}>
                <Text style={style.joinAsNonProfitTitle}>
                  Join as a non-profit
                </Text>
                <Text style={style.joinAsNonProfitText}>
                  Finedeeds allows non-profits to improve almost every aspect of
                  their operations – from internal efficiency to contributor
                  interactions, and fundraising – with a greater focus on
                  digital strategy. Through Finedeeds non-profits could not only
                  manage their members and staff but also create events,
                  fundraise and launch projects, and engage share the same with
                  their members bringing real-time communication and high-level
                  of transparency of operations.
                </Text>
                <View style={style.registerNowButtonView}>
                  <CustomButton buttonText="Register Now" />
                </View>
              </View>
            </ImageBackground>
            <Slick
              style={style.slickView}
              showsButtons={false}
              dotStyle={style.slickDotStyle}
              activeDotStyle={style.activeDotStyle}
              autoplay={true}
              autoplayTimeout={5}>
              {sliderContent.map((item, i) => (
                <SliderCard
                  key={i}
                  image={item.image}
                  name={item.name}
                  quote={item.quote}
                />
              ))}
            </Slick>
          </View>
        </View>
      )}
    </ScrollView>
  );
}
