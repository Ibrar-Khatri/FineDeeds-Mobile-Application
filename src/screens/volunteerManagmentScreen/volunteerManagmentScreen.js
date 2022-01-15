import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {StyleSheet, View} from 'react-native';
import {normalize} from '../../responsive/responsive';
import RequestScreen from './requestScreen/requestScreen';
import DeclineScreen from './declineScreen/declineScreen';
import VolunteersScreen from './volunteersScreen/volunteersScreen';

const Stack = createNativeStackNavigator();

export default function VolunteerManagementScreen({route, navigation}) {
  const {initialRouteName, title, objId, objType} = route.params;

  return (
    <Stack.Navigator
      initialRouteName={initialRouteName}
      screenOptions={() => ({
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
      <Stack.Screen name="request_screen" options={{title: title}}>
        {() => <RequestScreen objId={objId} objType={objType} />}
      </Stack.Screen>
      <Stack.Screen name="decline_screen" options={{title: title}}>
        {() => <DeclineScreen objId={objId} objType={objType} />}
      </Stack.Screen>
      <Stack.Screen name="volunteer_screen" options={{title: title}}>
        {() => <VolunteersScreen objId={objId} objType={objType} />}
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
