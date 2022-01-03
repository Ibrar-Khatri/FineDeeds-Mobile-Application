import React, {useState} from 'react';
import {useLazyQuery} from '@apollo/client';
import {useEffect} from 'react';
import {getFundRaisingEvents} from '../../../../../graphql/queries';
import {
  CustomSpinner,
  EventCard,
  FlatListComponent,
} from '../../../common/common';
import {StyleSheet, View} from 'react-native';
import {CardTitle} from '..';

export default function FundRaisingEventsNearYou() {
  let [fundraisingEvents, setFundraisingEvents] = useState(null);
  const [getEventsNearYou, {loading, error, data}] = useLazyQuery(
    getFundRaisingEvents,
    {
      variables: {
        objType: 'FUND_RAISING',
      },
      notifyOnNetworkStatusChange: true,
    },
  );

  !fundraisingEvents &&
    data?.getEvents?.items &&
    setFundraisingEvents(data?.getEvents?.items);

  useEffect(() => {
    getEventsNearYou();
  }, []);

  if (!data?.getEvents?.items.length) return null;
  return (
    <View style={style.mainView}>
      <CardTitle
        title="FUNDRAISING EVENTS NEAR YOU"
        subTitle="HELP US NOW"
        showLink={true}
        headerTitle="Fundraising Events Near You"
        screenName="listAll-screen"
        initialRouteName="fundraising_event_list"
      />
      <FlatListComponent
        data={fundraisingEvents}
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
