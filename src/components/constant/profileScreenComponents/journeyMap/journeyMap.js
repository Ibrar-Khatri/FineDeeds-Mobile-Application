import React, {useEffect, useState} from 'react';
import {useLazyQuery} from '@apollo/client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ScrollView, View, Text, TouchableOpacity, Image} from 'react-native';
import Timeline from 'react-native-timeline-flatlist';
import moment from 'moment';
import {getVolunteerPublishedStories} from '../../../../../graphql/queries';
import style from './journeyMapStyle';
import CustomSpinner from '../../../common/spinner/spinner';

export default function JourneyMap(props) {
  let {volunteer} = props;
  let [getstories, storiesData] = useLazyQuery(getVolunteerPublishedStories);
  let [stories, setStories] = useState(null);

  const createTimelineAccordingToYear = data => {
    let timeline = null;
    data &&
      data['getStories'].items.map(story => {
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
    if (storiesData?.data?.getStories) {
      createTimelineAccordingToYear(storiesData.data);
    }
  }, [storiesData?.data]);

  useEffect(() => {
    if (volunteer?.volunteerId) {
      getstories({
        variables: {volunteerId: volunteer.volunteerId, isPublished: true},
      });
    }
  }, [volunteer]);

  return (
    stories && (
      <ScrollView nestedScrollEnabled={true} style={style.scrollView}>
        {Object.keys(stories).map((year, ind) => (
          <View key={ind}>
            <Text style={style.yearContainerStyle}>{year}</Text>
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
                    <TouchableOpacity activeOpacity={1}>
                      <View style={style.journeyMapStoryCard}>
                        <View style={style.headerStyle}>
                          <View>
                            <Text style={style.volunteerNameStyle}>
                              {item.createdBy.volunteerName}
                            </Text>
                            <Text style={style.dateStyleAndAttendThisText}>
                              attend this
                            </Text>
                          </View>
                          <Text style={style.dateStyleAndAttendThisText}>
                            {moment(item.createdAt).format('D-MMM-YYYY')}{' '}
                          </Text>
                        </View>
                        <View style={style.imageAndTitleView}>
                          <Text style={style.titleStyle}>{item?.title}</Text>
                          <Image
                            source={{
                              uri: 'https://d2eygdx4i21ndl.cloudfront.net/STORY/8e5529a8-6acb-4988-9cba-ccb53b7e59bb.webp',
                            }}
                            resizeMode="cover"
                            style={style.imageStyle}
                          />
                        </View>
                      </View>
                    </TouchableOpacity>
                  </View>
                );
              }}
            />
          </View>
        ))}
      </ScrollView>
    )
  );
}
