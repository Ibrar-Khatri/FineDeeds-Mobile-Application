import {useLazyQuery} from '@apollo/client';
import React, {useEffect, useState} from 'react';
import {
  getVolunteerProExperience,
  getVolunteerPublishedStories,
} from '../../../../../../graphql/queries';
import {Tabs} from '../../../../../components/index';
import {ProfileScreenCardWrapper} from '../index';
import JourneyMap from './journeyMap/journeyMap';
import VolunteeringExperience from './volunteeringExperience/volunteeringExperience';

export default function JourneymapAndVolunExpTabs(props) {
  const {volunteer, authorized} = props;
  let [index, setIndex] = useState(0);
  let [getstories, storiesData] = useLazyQuery(getVolunteerPublishedStories);
  let [getVolunteerProExperienceById, volProExpData] = useLazyQuery(
    getVolunteerProExperience,
  );
  let [volunteerExpeience, setVolunteerExpeience] = useState(null);
  let [stories, setStories] = useState(null);

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
    if (volProExpData?.data?.getVolunteerProExperience) {
      setVolunteerExpeience(volProExpData?.data?.getVolunteerProExperience);
    }
    if (storiesData?.data?.getStories?.items) {
      createTimelineAccordingToYear(storiesData.data);
    }
  }, [
    volProExpData?.data?.getVolunteerProExperience,
    storiesData?.data?.getStories,
  ]);
  let tabs = [
    {
      title: 'Journey map',
      isFocused: false,
      component: <JourneyMap volunteer={volunteer} stories={stories} />,
    },
    {
      title: 'Volunteering experience',
      isFocused: false,
      component: (
        <VolunteeringExperience
          volunteer={volunteer}
          authorized={authorized}
          volunteerExpeience={volunteerExpeience}
          setVolunteerExpeience={setVolunteerExpeience}
        />
      ),
    },
  ];
  tabs[index].isFocused = tabs[index].isFocused ? false : true;
  return (
    <ProfileScreenCardWrapper>
      <Tabs index={index} setIndex={setIndex} tabs={tabs} />
      {tabs[index].component}
    </ProfileScreenCardWrapper>
  );
}
