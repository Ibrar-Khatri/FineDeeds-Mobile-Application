import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ActivityList from './activityList/activityList';
import {StyleSheet} from 'react-native';
import {normalize} from '../../responsive/responsive';
import StoryList from './storyList/storyList';
import OrganizationList from './organizationList/organizationList';
import ContributorList from './contributorList/contributorList';
import ProjectList from './projectsList/projectsList';

const Stack = createNativeStackNavigator();

export default function ListAllScreen({route}) {
  const {initialRouteName, volunteerId, title} = route.params;
  console.log(volunteerId, 'volunteerId');

  return (
    <Stack.Navigator
      initialRouteName={initialRouteName}
      screenOptions={() => ({
        headerTitle: title,
        headerTitleStyle: style.headerTitleStyle,
        headerStyle: style.headerStyle,
      })}>
      <Stack.Screen name="activity_list">
        {() => <ActivityList volunteerId={volunteerId} />}
      </Stack.Screen>
      <Stack.Screen name="story_list">
        {() => <StoryList volunteerId={volunteerId} />}
      </Stack.Screen>
      <Stack.Screen name="organization_list">
        {() => <OrganizationList volunteerId={volunteerId} />}
      </Stack.Screen>
      <Stack.Screen name="contributor_list">
        {() => <ContributorList />}
      </Stack.Screen>
      <Stack.Screen name="project_list">{() => <ProjectList />}</Stack.Screen>
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
