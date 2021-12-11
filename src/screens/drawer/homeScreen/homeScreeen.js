import React, {useEffect, useState} from 'react';
import {View, Text, ScrollView, ImageBackground} from 'react-native';
import Slick from 'react-native-slick';
import CustomButton from '../../../components/common/button/button';
import SideDetailCard from '../../../components/constant/homeScreenComponents/sideDetailCard/sideDetailCard';
import SliderCard from '../../../components/constant/homeScreenComponents/sliderCard/sliderCard';
import style from './homeScreenStyle';
import StoriesCard from '../../../components/common/cards/storiesCard/storiesCard';
import CardTitle from '../../../components/constant/homeScreenComponents/cardTitle/cardTitle';
import {useLazyQuery} from '@apollo/client';
import {
  getActivities,
  getVolunteerPublishedStories,
} from '../../../../graphql/queries';
import CustomSpinner from '../../../components/common/spinner/spinner';
import FlatListComponent from '../../../components/common/flatListComponent/flatListComponent';
import {
  sideDetail1,
  whatDoWeOffer,
  sliderContent,
} from '../../../shared/helperData/homeScreen';
import ActivitiesCard from '../../../components/common/cards/activitiesCard/activitiesCard';

export default function HomeScreen(props) {
  let {isUserAuthenticated} = props;
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
    setStories(storiesData?.data?.getStories?.items);
  !activities &&
    activitiesData?.data?.getActivities?.items &&
    setActivities(activitiesData?.data?.getActivities?.items);

  return (
    <ScrollView>
      <View style={style.mainView}>
        {!isUserAuthenticated && (
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

        <View style={style.bodyView}>
          <View style={style.dynamicDataView}>
            <CardTitle title="ACTIVITIES NEAR YOU" showLink={true} />
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
            <CardTitle title="STORIES THAT INSPIRE" showLink={true} />
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
