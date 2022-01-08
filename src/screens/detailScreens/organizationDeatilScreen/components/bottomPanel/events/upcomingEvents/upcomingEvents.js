import React from 'react';
import {StyleSheet, View} from 'react-native';
import {
  EmptyDataComponent,
  EventCard,
} from '../../../../../../../components/common/common';

export default function UpcomingEvents(props) {
  const {data} = props;
  return (
    <View style={style.upcomingEventView}>
      {data?.length > 0 ? (
        data?.map((event, i) => <EventCard key={i} data={event} />)
      ) : (
        <EmptyDataComponent title="Planned Events not created yet!" />
      )}
    </View>
  );
}

let style = StyleSheet.create({
  upcomingEventView: {
    alignItems: 'center',
  },
});
