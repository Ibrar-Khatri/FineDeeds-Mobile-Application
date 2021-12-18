import React, {useEffect, useState} from 'react';
import {useLazyQuery} from '@apollo/client';
import {ScrollView, View, TouchableOpacity} from 'react-native';
import Timeline from 'react-native-timeline-flatlist';
import moment from 'moment';
import style from './journeyMapStyle';
import EmptyDataComponent from '../../../common/emptyDataComponent/emptyDataComponent';
import CustomSpinner from '../../../common/spinner/spinner';
import RenderS3Image from '../../../common/renderS3Image/renderS3Image';
import ResponsiveText from '../../../common/responsiveText/responsiveText';
import {useNavigation} from '@react-navigation/native';

export default function JourneyMap(props) {
  let [isLoading, setIsLoading] = useState(true);
  let {storiesData} = props;
  let [stories, setStories] = useState(null);
  let navigation = useNavigation();

  const createTimelineAccordingToYear = async storiesData => {
    let timeline = null;
    storiesData &&
      storiesData['getStories'].items.map(story => {
        const {createdAt} = story;
        const createdYear = new Date(createdAt).getFullYear();
        if (!timeline) {
          timeline = {};
        }
        if (timeline[createdYear]) {
          timeline[createdYear] = [...timeline[createdYear], {...story}];
        } else {
          timeline[createdYear] = [{...story}];
        }

        return null;
      });
    setStories(timeline);
    return;
  };
  useEffect(() => {
    if (storiesData?.data?.getStories?.items) {
      createTimelineAccordingToYear(storiesData.data);
      setIsLoading(false);
    }
  }, [storiesData]);

  return isLoading ? (
    <CustomSpinner size="lg" color="#f06d06" />
  ) : stories ? (
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
                      navigation.navigate('detail-screen', {
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
    <EmptyDataComponent title="Journey Map" />
  );
}
