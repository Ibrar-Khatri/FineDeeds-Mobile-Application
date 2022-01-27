import React from 'react';
import Amplify from 'aws-amplify';
import awsConfig from './aws_credentials/awsConfig';
import {ApolloProvider} from '@apollo/client';
import {FinedeedsAppClient} from './aws_credentials/graphql-client.js';
import {LogBox, Platform} from 'react-native';
import {AppContainer} from './src/components/index';
// import PushNotificationIOS from '@react-native-community/push-notification-ios';
import PushNotification from 'react-native-push-notification';

Amplify.configure({...awsConfig});

LogBox.ignoreLogs([
  'VirtualizedLists should never be nested',
  'new NativeEventEmitter',
]);

const App = () => {
  return (
    <ApolloProvider client={FinedeedsAppClient}>
      <AppContainer />
    </ApolloProvider>
  );
};

export default App;
