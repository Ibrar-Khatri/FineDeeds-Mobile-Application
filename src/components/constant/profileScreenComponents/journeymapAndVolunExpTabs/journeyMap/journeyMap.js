import React from 'react';
import {
  ScrollView,
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import Timeline from 'react-native-timeline-flatlist';
import moment from 'moment';
import {
  EmptyDataComponent,
  CustomSpinner,
  RenderS3Image,
  ResponsiveText,
} from '../../../../common/common';
import {useNavigation} from '@react-navigation/native';
import {widthPercentageToDP as vw} from '../../../../../responsive/responsive';

const screenWidth = Dimensions.get('window').width;
export default function JourneyMap(props) {
  const {stories} = props;
  let navigation = useNavigation();

  return !stories ? (
    <CustomSpinner size="lg" color="#f06d06" />
  ) : stories?.length > 0 ? (
    <ScrollView nestedScrollEnabled={true} style={style.scrollView}>
      {Object.keys(stories).map((year, ind) => (
        <View key={ind}>
          <ResponsiveText style={style.yearContainerStyle} size={12}>
            {year}
          </ResponsiveText>
          <Timeline
            data={stories[year]}
            lineColor={style.lineColor}
            lineWidth={4}
            innerCircle="dot"
            circleSize={25}
            circleColor={style.circleColor}
            dotColor={style.dotColor}
            dotSize={14}
            showTime={false}
            renderFullLine={true}
            options={{
              style: style.timeLineStyle,
            }}
            renderDetail={(item, i) => {
              return (
                <View style={style.journeyMapStoryCardMainView} key={i}>
                  <View style={style.triangleStyle} />
                  <TouchableOpacity
                    activeOpacity={0.5}
                    onPress={() =>
                      navigation.push('detail-screen', {
                        initialRouteName: 'story_detail',
                        data: item,
                        title: item?.title,
                      })
                    }
                    style={style.journeyMapStoryCard}>
                    <View style={style.headerStyle}>
                      <View>
                        <ResponsiveText
                          style={style.volunteerNameStyle}
                          size={12}>
                          {item.createdBy.volunteerName}
                        </ResponsiveText>
                        <ResponsiveText
                          size={11}
                          style={style.dateStyleAndAttendThisText}>
                          attend this
                        </ResponsiveText>
                      </View>
                      <ResponsiveText
                        size={11}
                        style={style.dateStyleAndAttendThisText}>
                        {moment(item.createdAt).format('D-MMM-YYYY')}
                      </ResponsiveText>
                    </View>
                    <View style={style.imageAndTitleView}>
                      <ResponsiveText style={style.titleStyle} size={12}>
                        {item?.title}
                      </ResponsiveText>
                      <RenderS3Image
                        resizeMode="cover"
                        style={style.imageStyle}
                        s3Key={`STORY/${item?.storyId}.webp`}
                      />
                    </View>
                  </TouchableOpacity>
                </View>
              );
            }}
          />
        </View>
      ))}
    </ScrollView>
  ) : (
    <EmptyDataComponent title="No Journey Map" />
  );
}

let style = StyleSheet.create({
  scrollView: {
    backgroundColor: '#fff1e0',
    height: 400,
    padding: 15,
    marginTop: 20,
  },
  timeLineStyle: {
    marginTop: 15,
    marginBottom: 20,
  },
  lineColor: '#fff',
  circleColor: '#fff',
  dotColor: '#f06d06',
  journeyMapStoryCardMainView: {
    marginLeft: -15,
    marginTop: -15,
    display: 'flex',
    flexDirection: 'row',
    paddingTop: 5,
  },
  triangleStyle: {
    width: 0,
    height: 0,
    borderLeftWidth: 13,
    borderRightWidth: 13,
    borderBottomWidth: 26,
    borderStyle: 'solid',
    backgroundColor: 'transparent',
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#fff',
    transform: [{rotate: '270deg'}],
    paddingTop: 10,
  },
  journeyMapStoryCard: {
    width: vw(65),
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.48,
    shadowRadius: 11.95,
    elevation: 5,
  },
  headerStyle: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10,
    paddingBottom: 10,
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
    borderBottomWidth: 1,
  },
  volunteerNameStyle: {
    fontFamily: 'Montserrat-SemiBold',
    color: '#212529',
  },
  dateStyleAndAttendThisText: {
    fontFamily: 'Montserrat-Regular',
    color: '#212529',
  },
  titleStyle: {
    fontFamily: 'Montserrat-ExtraBold',
    color: '#212529',
  },
  imageAndTitleView: {
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
  },
  imageStyle: {
    height: vw(20),
    width: vw(55),
    margin: 10,
    borderRadius: 8,
    overflow: 'hidden',
    alignSelf: 'center',
  },
  yearContainerStyle: {
    backgroundColor: '#f06d06',
    fontFamily: 'Montserrat-SemiBold',
    color: '#fff',
    textAlign: 'center',
    width: vw(screenWidth < 480 ? 15 : 13),
    padding: 5,
  },
});
