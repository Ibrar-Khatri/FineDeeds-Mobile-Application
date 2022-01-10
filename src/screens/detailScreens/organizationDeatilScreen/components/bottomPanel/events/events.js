import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {widthPercentageToDP as vw} from '../../../../../../responsive/responsive';
import {Tabs} from '../../../../../../components/index';
import PastEvents from './pastEvents/pastEvents';
import UpcomingEvents from './upcomingEvents/upcomingEvents';

export default function Events(props) {
  const {pastEvents, upcomingEvents} = props;
  let [index, setIndex] = useState(0);

  let tabs = [
    {
      title: 'Planed',
      isFocused: false,
      component: <UpcomingEvents data={upcomingEvents} />,
    },
    {
      title: 'Past',
      isFocused: false,
      component: <PastEvents data={pastEvents} />,
    },
  ];
  tabs[index].isFocused = tabs[index].isFocused ? false : true;

  return (
    <View>
      <Tabs index={index} setIndex={setIndex} tabs={tabs} />
      <View style={style.tabComponentsView}>{tabs[index].component}</View>
    </View>
  );
}

let style = StyleSheet.create({
  tabComponentsView: {
    marginTop: vw(3),
  },
});
