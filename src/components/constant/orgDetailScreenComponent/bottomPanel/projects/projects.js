import React from 'react';
import {StyleSheet, View} from 'react-native';
import {
  EmptyDataComponent,
  ProjectCard,
} from '../../../../common/common';

export default function Projects(props) {
  const {data} = props;
  return (
    <View style={style.upcomingEventView}>
      {data?.length > 0 ? (
        data?.map((event, i) => <ProjectCard key={i} data={event} />)
      ) : (
        <EmptyDataComponent title="No Projects" />
      )}
    </View>
  );
}

let style = StyleSheet.create({
  upcomingEventView: {
    alignItems: 'center',
  },
});
