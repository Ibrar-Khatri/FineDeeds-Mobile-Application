import React, {useState} from 'react';
import {useLazyQuery} from '@apollo/client';
import {useEffect} from 'react';
import {getGeneralEvents} from '../../../../../graphql/queries';
import {
  CardWrapper,
  CustomSpinner,
  EventCard,
  FlatListComponent,
  ResponsiveText,
} from '../../../common/common';
import {StyleSheet, View} from 'react-native';
import {CardTitle} from '..';

export default function EventsNearYou() {
  let [events, setEvents] = useState(null);
  const [getEventsNearYou, {loading, error, data}] = useLazyQuery(
    getGeneralEvents,
    {
      variables: {
        limit: 3,
        // filter: {
        //     country: locationDetail?.country,
        //     city: locationDetail?.city,
        // },
        objType: 'GENERAL',
      },
      notifyOnNetworkStatusChange: true,
    },
  );

  !events && data?.getEvents?.items && setEvents(data?.getEvents?.items);

  useEffect(() => {
    getEventsNearYou();
  }, []);

  return (
    <View style={style.mainView}>
      <CardTitle
        title="EVENTS NEAR YOU"
        subTitle="HELP US NOW"
        showLink={true}
        // headerTitle="Non-Profits Near You"
        // screenName="listAll-screen"
        // initialRouteName="organization_list"
      />
      <FlatListComponent
        data={events}
        horizontal={true}
        showsHorizontalScrollIndicator={true}
        ListEmptyComponent={<CustomSpinner size="lg" color="#f06d06" />}
        renderItem={({item, i}) => <EventCard key={i} data={item} />}
      />
    </View>
  );
}
const style = StyleSheet.create({
  mainView: {
    marginBottom: 20,
  },
});
