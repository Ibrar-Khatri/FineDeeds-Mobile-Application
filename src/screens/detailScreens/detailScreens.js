import React from 'react';
import {StyleSheet, Platform} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ActivityDetailScreen from './activityDetailScreen/activityDetailScreen';
import StoryDetailScreen from './storyDetailScreen/storyDetailScreen';
import {normalize} from '../../responsive/responsive';
import ProjectDetailScreen from './projectDetailScreen/projectDetailScreen';
import {View} from 'react-native';
import OrganizationDetailScreen from './organizationDeatilScreen/organizationDeatilScreen';

const Stack = createNativeStackNavigator();

export default function DetailScreen({route, navigation}) {
  const {initialRouteName, data, title} = route.params;

  return (
    <Stack.Navigator
      initialRouteName={initialRouteName}
      screenOptions={() => ({
        headerTitle: title,
        headerTitleStyle: style.headerTitleStyle,
        headerStyle: style.headerStyle,
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
      <Stack.Screen name="activity_detail" options={{title: title}}>
        {() => <ActivityDetailScreen data={data} />}
      </Stack.Screen>
      <Stack.Screen name="story_detail" options={{title: title}}>
        {() => <StoryDetailScreen data={data} />}
      </Stack.Screen>
      <Stack.Screen name="project_detail" options={{title: title}}>
        {() => <ProjectDetailScreen data={data} />}
      </Stack.Screen>
      <Stack.Screen name="organization_detail" options={{title: title}}>
        {() => <OrganizationDetailScreen data={data} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
}

let style = StyleSheet.create({
  headerTitleStyle: {
    fontFamily: 'Merriweather-Bold',
    fontSize: normalize(15),
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
  headerLeft: {borderRadius: 100, overflow: 'hidden', marginRight: 10},
});
