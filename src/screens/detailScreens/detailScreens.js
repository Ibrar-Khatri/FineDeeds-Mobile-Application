import React from 'react';
import {StyleSheet, Platform} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ActivityDetailScreen from './activityDetailScreen/activityDetailScreen';
import StoryDetailScreen from './storyDetailScreen/storyDetailScreen';
import {normalize} from '../../responsive/responsive';
import ProjectDetailScreen from './projectDetailScreen/projectDetailScreen';

const Stack = createNativeStackNavigator();

export default function DetailScreen({route}) {
  const {initialRouteName, data, title} = route.params;

  return (
    <Stack.Navigator
      initialRouteName={initialRouteName}
      screenOptions={() => ({
        headerTitle: title,
        headerTitleStyle: style.headerTitleStyle,
        headerStyle: style.headerStyle,
      })}>
      <Stack.Screen name="activity_detail">
        {() => <ActivityDetailScreen data={data} />}
      </Stack.Screen>
      <Stack.Screen name="story_detail">
        {() => <StoryDetailScreen data={data} />}
      </Stack.Screen>
      <Stack.Screen name="project_detail">
        {() => <ProjectDetailScreen data={data} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
}

let style = StyleSheet.create({
  headerTitleStyle: {
    fontFamily: 'Merriweather-Bold',
    fontSize: normalize(16),
    color: '#212529',
  },
  headerStyle: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: Platform.OS === 'ios' ? 0.2 : 0.48,
    shadowRadius: 11.95,
    elevation: 18,
    backgroundColor: '#fffaf4',
  },
});
