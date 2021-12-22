import React from 'react';
import Amplify from 'aws-amplify';
import awsConfig from './aws_credentials/awsConfig';
import {ApolloProvider} from '@apollo/client';
import {FinedeedsAppClient} from './aws_credentials/graphql-client.js';
import {LogBox} from 'react-native';
import AppContainer from './src/components/common/appContainer/appContainer';

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
