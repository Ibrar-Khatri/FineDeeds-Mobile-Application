import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ActivityDetailScreen from './activityDetailScreen/activityDetailScreen';
import style from './detailScreenStyle';

const Stack = createNativeStackNavigator();

export default function DetailScreen({route}) {
  let {initialRouteName, data, title} = route.params;

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
    </Stack.Navigator>
  );
}
