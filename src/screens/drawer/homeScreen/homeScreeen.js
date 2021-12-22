import React, {useEffect, useState} from 'react';
import {View, ScrollView, ImageBackground, StyleSheet} from 'react-native';
import Slick from 'react-native-slick';
import {useLazyQuery} from '@apollo/client';
import CustomButton from '../../../components/common/button/button';
import SideDetailCard from '../../../components/constant/homeScreenComponents/sideDetailCard/sideDetailCard';
import SliderCard from '../../../components/constant/homeScreenComponents/sliderCard/sliderCard';
import StoriesCard from '../../../components/common/cards/storiesCard/storiesCard';
import CardTitle from '../../../components/constant/homeScreenComponents/cardTitle/cardTitle';
import CustomSpinner from '../../../components/common/spinner/spinner';
import FlatListComponent from '../../../components/common/flatListComponent/flatListComponent';
import ActivitiesCard from '../../../components/common/cards/activitiesCard/activitiesCard';
import ResponsiveText from '../../../components/common/responsiveText/responsiveText';
import {
  getActivities,
  getVolunteerPublishedStories,
} from '../../../../graphql/queries';
import {
  sideDetail1,
  whatDoWeOffer,
  sliderContent,
} from '../../../shared/helperData/homeScreen';
import {
  widthPercentageToDP as vw,
  heightPercentageToDP as vh,
} from '../../../responsive/responsive';

export default function HomeScreen(props) {
  const {isUserAuthenticated} = props;
  let [getstories, storiesData] = useLazyQuery(getVolunteerPublishedStories);
  let [getRandomActivities, activitiesData] = useLazyQuery(getActivities);
  let [stories, setStories] = useState();
  let [activities, setActivities] = useState();

  useEffect(() => {
    getstories({
      variables: {limit: 3},
    });
    getRandomActivities({
      variables: {limit: 3},
    });
  }, []);

  !stories &&
    storiesData?.data?.getStories?.items &&
    setStories(storiesData?.data?.getStories?.items.slice(0, 3));
  !activities &&
    activitiesData?.data?.getActivities?.items &&
    setActivities(activitiesData?.data?.getActivities?.items.slice(0, 3));

  return (
    <ScrollView>
      <View style={style.mainView}>
        {!isUserAuthenticated && (
          <View>
            <ImageBackground
              source={require('../../../assets/images/jumbotrun.png')}
              style={style.imageStyle}>
              <View style={style.headingAndSubHeadingView}>
                <ResponsiveText style={style.headingStyle} size={24}>
                  One Step Towards a Better World
                </ResponsiveText>
                <ResponsiveText style={style.subHeadingStyle} size={18}>
                  Be the change
                </ResponsiveText>
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

        <View style={style.bodyView}>
          <View style={style.dynamicDataView}>
            <CardTitle
              title="ACTIVITIES NEAR YOU"
              showLink={true}
              headerTitle="Activities"
              screenName="listAll-screen"
              initialRouteName="activity_list"
            />
            <FlatListComponent
              data={activities}
              horizontal={true}
              showsHorizontalScrollIndicator={true}
              ListEmptyComponent={<CustomSpinner size="lg" color="#f06d06" />}
              renderItem={({item, i}) => <ActivitiesCard key={i} data={item} />}
            />
          </View>
          <View>
            <CardTitle title="WHAT DO WE OFFER" />
            {whatDoWeOffer.map((item, i) => (
              <SideDetailCard
                key={i}
                imageSource={item.image}
                title={item.title}
                detail={item.detail}
              />
            ))}
          </View>

          <View style={style.dynamicDataView}>
            <CardTitle
              title="STORIES THAT INSPIRE"
              showLink={true}
              headerTitle="Stories"
              screenName="listAll-screen"
              initialRouteName="story_list"
            />
            <FlatListComponent
              data={stories}
              horizontal={true}
              showsHorizontalScrollIndicator={true}
              ListEmptyComponent={<CustomSpinner size="lg" color="#f06d06" />}
              renderItem={({item, i}) => <StoriesCard key={i} data={item} />}
            />
          </View>

          <View style={style.joinAsNonProfitView}>
            <ImageBackground
              source={require('../../../assets/images/become-nonprofit.png')}>
              <View style={style.joinAsNonProfittextView}>
                <ResponsiveText style={style.joinAsNonProfitTitle} size={20}>
                  Join as a non-profit
                </ResponsiveText>
                <ResponsiveText style={style.joinAsNonProfitText} size={12}>
                  Finedeeds allows non-profits to improve almost every aspect of
                  their operations – from internal efficiency to contributor
                  interactions, and fundraising – with a greater focus on
                  digital strategy. Through Finedeeds non-profits could not only
                  manage their members and staff but also create events,
                  fundraise and launch projects, and engage share the same with
                  their members bringing real-time communication and high-level
                  of transparency of operations.
                </ResponsiveText>
                <View style={style.registerNowButtonView}>
                  <CustomButton buttonText="Register Now" />
                </View>
              </View>
            </ImageBackground>
          </View>
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
    </ScrollView>
  );
}

let style = StyleSheet.create({
  mainView: {
    backgroundColor: '#fff',
  },
  bodyView: {
    paddingLeft: 20,
    paddingRight: 20,
  },
  imageStyle: {
    height: vh(35),
  },
  headingAndSubHeadingView: {
    marginTop: vh(12),
    marginLeft: 20,
  },
  headingStyle: {
    color: '#fff',
    fontFamily: 'Montserrat-ExtraBold',
  },
  subHeadingStyle: {
    color: '#fff',
    fontFamily: 'Montserrat-ExtraBold',
  },
  sideDetailCardView: {
    marginTop: 40,
  },
  joinAsNonProfitView: {
    borderRadius: 10,
    overflow: 'hidden',
  },
  joinAsNonProfittextView: {
    backgroundColor: '#212529c4',
    padding: 20,
  },
  joinAsNonProfitTitle: {
    color: '#fff',
    fontFamily: 'Montserrat-Bold',
    marginBottom: 15,
  },
  joinAsNonProfitText: {
    color: '#fff',
    fontFamily: 'Montserrat-Regular',
    marginBottom: 20,
  },
  registerNowButtonView: {
    width: vw(40),
  },
  slickView: {
    marginTop: 50,
    height: vh(70),
  },
  slickDotStyle: {
    display: 'none',
  },
  activeDotStyle: {
    display: 'none',
  },
  dynamicDataView: {
    marginBottom: 20,
  },
});
