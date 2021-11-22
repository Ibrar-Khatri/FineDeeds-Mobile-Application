import React from 'react';
import {ScrollView, View, Text, FlatList} from 'react-native';
import Timeline from 'react-native-timeline-flatlist';
import style from './journeyMapStyle';

export default function JourneyMap() {
  let data = [
    {time: '09:00', title: 'Event 1', description: 'Event 1 Description'},
    {title: 'Event 2', description: 'Event 2 Description'},
    {time: '12:00', title: 'Event 3', description: 'Event 3 Description'},
    {time: '14:00', title: 'Event 4', description: 'Event 4 Description'},
    {time: '16:30', title: 'Event 5', description: 'Event 5 Description'},
  ];
  return (
    <View style={{height: 200, width: 200}}>
      <ScrollView>
        <Timeline
          data={data}
          circleSize={20}
          circleColor="rgb(45,156,219)"
          lineColor="rgb(45,156,219)"
          timeContainerStyle={{minWidth: 52, marginTop: -5}}
          timeStyle={{
            textAlign: 'center',
            backgroundColor: '#ff9797',
            color: 'white',
            padding: 5,
            borderRadius: 13,
          }}
          descriptionStyle={{color: 'gray'}}
          options={{
            style: {paddingTop: 5, backgroundColor: 'red'},
          }}
          renderItem={() => (
            <View style={{backgroundColor: 'red', height: 50, width: 50}}>
              <Text>Hwllo</Text>
            </View>
          )}
        />
      </ScrollView>
    </View>
  );
}
