import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ActivityList from './activityList/activityList';
import {StyleSheet, View} from 'react-native';
import {normalize} from '../../responsive/responsive';
import StoryList from './storyList/storyList';
import OrganizationList from './organizationList/organizationList';
import ContributorList from './contributorList/contributorList';
import ProjectList from './projectsList/projectsList';
import EventList from './eventList/eventList';
import {ResponsiveText} from '../../components/common/common';
import FundraisingEventList from './fundraisingEventList/fundraisingEventList';

const Stack = createNativeStackNavigator();

export default function ListAllScreen({route, navigation}) {
  const {initialRouteName, volunteerId, title} = route.params;

  return (
    <Stack.Navigator
      initialRouteName={initialRouteName}
      screenOptions={() => ({
        headerTitle: title,
        headerTitleStyle: style.headerTitleStyle,
        headerStyle: style.headerStyle,
        headerBackTitleStyle: style.headerBackTitleStyle,
        headerLeft: props => (
          <View {...props} style={style.headerLeft}>
            <Ionicons
              name="chevron-back"
              color="#fd7e14"
              size={normalize(20)}
              onPress={() => navigation.goBack()}
            />
          </View>
        ),
      })}>
      <Stack.Screen name="activity_list" options={{title: title}}>
        {() => <ActivityList volunteerId={volunteerId} />}
      </Stack.Screen>
      <Stack.Screen name="story_list" options={{title: title}}>
        {() => <StoryList volunteerId={volunteerId} />}
      </Stack.Screen>
      <Stack.Screen name="organization_list" options={{title: title}}>
        {() => <OrganizationList volunteerId={volunteerId} />}
      </Stack.Screen>
      <Stack.Screen name="contributor_list" options={{title: title}}>
        {() => <ContributorList />}
      </Stack.Screen>
      <Stack.Screen name="project_list" options={{title: title}}>
        {() => <ProjectList />}
      </Stack.Screen>
      <Stack.Screen name="event_list" options={{title: title}}>
        {() => <EventList />}
      </Stack.Screen>
      <Stack.Screen name="fundraising_event_list" options={{title: title}}>
        {() => <FundraisingEventList />}
      </Stack.Screen>
    </Stack.Navigator>
  );
}

let style = StyleSheet.create({
  headerTitleStyle: {
    fontFamily: 'Merriweather-Bold',
    color: '#212529',
    fontSize: normalize(15),
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
  headerBackTitleStyle: {
    backgroundColor: 'red',
    height: 100,
    width: 100,
  },
  headerLeft: {
    borderRadius: 100,
    overflow: 'hidden',
    marginRight: 10,
    display: 'flex',
    flexDirection: 'row',
  },
});
