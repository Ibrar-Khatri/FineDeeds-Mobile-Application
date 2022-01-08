import React from 'react';
import {StyleSheet, View} from 'react-native';
import {
  EmptyDataComponent,
  EventCard,
} from '../../../../../../../components/common/common';

export default function PastEvents(props) {
  const {data} = props;
  return (
    <View style={style.upcomingEventView}>
      {data?.length > 0 ? (
        data?.map((event, i) => <EventCard key={i} data={event} />)
      ) : (
        <EmptyDataComponent title="Past Event not available yet!" />
      )}
    </View>
  );
}

let style = StyleSheet.create({
  upcomingEventView: {
    alignItems: 'center',
  },
});
