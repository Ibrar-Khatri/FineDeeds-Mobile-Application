import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {CardTitle} from '../../../constant/homeScreenComponents/index';
import {
  FlatListComponent,
  CustomSpinner,
  ActivitiesCard,
} from '../../../common/common';
import {useLazyQuery} from '@apollo/client';
import {getActivities} from '../../../../../graphql/queries';

export default function ActivitiesNearYou() {
  let [getRandomActivities, activitiesData] = useLazyQuery(getActivities);
  let [activities, setActivities] = useState();

  useEffect(() => {
    getRandomActivities({
      variables: {limit: 3},
    });
  }, []);

  !activities &&
    activitiesData?.data?.getActivities?.items &&
    setActivities(activitiesData?.data?.getActivities?.items.slice(0, 3));

  return (
    <View style={style.mainView}>
      <CardTitle
        subTitle="ACTIVITIES NEAR YOU"
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
  );
}
const style = StyleSheet.create({
  mainView: {
    marginBottom: 20,
  },
});
