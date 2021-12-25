import React from 'react';
import {View, ScrollView, ImageBackground, StyleSheet} from 'react-native';
import {ResponsiveText} from '../../../components/common/common';
import {
  SideDetailCard,
  CardTitle,
  ActivitiesNearYou,
  StoriesThatInspire,
  JoinAsNonProfit,
  WorkForThePeople,
  OrganizationNearYou,
  FeaturedContributors,
} from '../../../components/constant/homeScreenComponents/index';
import {
  sideDetail1,
  whatDoWeOffer,
} from '../../../shared/helperData/homeScreen';
import {heightPercentageToDP as vh} from '../../../responsive/responsive';

export default function HomeScreen(props) {
  const {isUserAuthenticated} = props;
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
          <OrganizationNearYou />
          <FeaturedContributors />
          <ActivitiesNearYou />
          <View>
            <CardTitle subTitle="WHAT DO WE OFFER" />
            {whatDoWeOffer.map((item, i) => (
              <SideDetailCard
                key={i}
                imageSource={item.image}
                title={item.title}
                detail={item.detail}
              />
            ))}
          </View>
          <StoriesThatInspire />
          <JoinAsNonProfit />
          <WorkForThePeople />
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
});
