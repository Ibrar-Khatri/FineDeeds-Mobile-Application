import {useLazyQuery} from '@apollo/client';
import React, {useEffect, useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {
  getVolunteerProExperience,
  getVolunteerPublishedStories,
} from '../../../../../../graphql/queries';
import {ResponsiveText} from '../../../../../components/common/common';
import {ProfileScreenCardWrapper} from '../index';
import JourneyMap from './journeyMap/journeyMap';
import VolunteeringExperience from './volunteeringExperience/volunteeringExperience';

export default function JourneymapAndVolunExpTabs(props) {
  const {volunteer, authorized} = props;
  let [isJourneyMap, setIsJourneyMap] = useState(true);
  let [isVolunterringExp, setIsVolunterringExp] = useState(false);
  let [getstories, storiesData] = useLazyQuery(getVolunteerPublishedStories);
  let [volunteerExpeience, setVolunteerExpeience] = useState(null);
  let [stories, setStories] = useState(null);
  let [getVolunteerProExperienceById, getVolunteerProExperienceData] =
    useLazyQuery(getVolunteerProExperience, {fetchPolicy: 'network-only'});

  const createTimelineAccordingToYear = async storiesData => {
    let timeline = [];
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

        return [];
      });
    setStories(timeline);
    return;
  };

  useEffect(() => {
    if (volunteer) {
      getstories({
        variables: {volunteerId: volunteer.volunteerId, isPublished: true},
      });
      getVolunteerProExperienceById({
        variables: {volunteerId: volunteer.volunteerId},
      });
    }
  }, [volunteer]);
  useEffect(() => {
    if (getVolunteerProExperienceData?.data?.getVolunteerProExperience) {
      // setLoading(false);
      setVolunteerExpeience(
        getVolunteerProExperienceData?.data?.getVolunteerProExperience,
      );
    }
    if (storiesData?.data?.getStories?.items) {
      createTimelineAccordingToYear(storiesData.data);
      // setIsLoading(false);
    }
  }, [getVolunteerProExperienceData, storiesData]);

  return (
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
      {isJourneyMap && <JourneyMap volunteer={volunteer} stories={stories} />}
      {isVolunterringExp && (
        <VolunteeringExperience
          volunteer={volunteer}
          authorized={authorized}
          volunteerExpeience={volunteerExpeience}
          setVolunteerExpeience={setVolunteerExpeience}
        />
      )}
    </ProfileScreenCardWrapper>
  );
}

let style = StyleSheet.create({
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
