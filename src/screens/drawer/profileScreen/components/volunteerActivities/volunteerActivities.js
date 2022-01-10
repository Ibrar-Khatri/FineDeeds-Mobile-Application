import React, {useEffect, useState} from 'react';
import {useLazyQuery} from '@apollo/client';
import {ProfileScreenCardsHeader, ProfileScreenCardWrapper} from '../index';
import {getActivities} from '../../../../../../graphql/queries';
import {FlatListComponent} from '../../../../../components/index';
import ActivityCard from './activityCard/activityCard';

export default function VolunteerActivities(props) {
  const {volunteer} = props;
  let [getActivitiesById, activitiesData] = useLazyQuery(getActivities);
  let [activities, setActivities] = useState([]);

  useEffect(() => {
    if (volunteer) {
      getActivitiesById({
        variables: {
          limit: 3,
          volunteerId: volunteer.volunteerId,
        },
      });
    }
  }, [volunteer]);

  useEffect(() => {
    if (activitiesData?.data?.getActivities?.items?.length >= 0) {
      setActivities(activitiesData?.data?.getActivities?.items);
    }
  }, [activitiesData?.data?.getActivities?.items]);
  return (
    activities?.length > 0 && (
      <ProfileScreenCardWrapper>
        <ProfileScreenCardsHeader
          title="Activity"
          headerTitle="Activities"
          screenName="listAll-screen"
          initialRouteName="activity_list"
          volunteerId={volunteer.volunteerId}
        />
        <FlatListComponent
          data={activities}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          renderItem={({item, index}) => (
            <ActivityCard key={index} data={item} volunteer={volunteer} />
          )}
        />
      </ProfileScreenCardWrapper>
    )
  );
}
