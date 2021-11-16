import Credentials from './credentials';
import {ApolloLink} from 'apollo-link';
import {createAuthLink} from 'aws-appsync-auth-link';
import {createHttpLink} from 'apollo-link-http';
import {InMemoryCache, ApolloClient} from '@apollo/client';
import {createSubscriptionHandshakeLink} from 'aws-appsync-subscription-link';

const url = Credentials.finedeedsAppSync.graphqlEndpoint;
const region = Credentials.finedeedsAppSync.region;
const auth = {
  type: Credentials.finedeedsAppSync.authenticationType,
  apiKey: Credentials.finedeedsAppSync.apiKey,
};

const httpLink = createHttpLink({uri: url});
// const wsLink = new WebSocketLink({
//   uri: url,
//   options: {
//     reconnect: true
//   }
// });

const link = ApolloLink.from([
  createAuthLink({url, region, auth}),
  // wsLink,
  // httpLink,
  // createHttpLink({ uri: url }),
  createSubscriptionHandshakeLink(url, httpLink),
]);

const FinedeedsAppClient = new ApolloClient({
  link,
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          getStories: {
            // Don't cache separate results based on
            // any of this field's arguments.
            keyArgs: ['volunteerId', 'isPublished'],
            // Concatenate the incoming list items with
            // the existing list items.
            merge(existing = {items: []}, incoming, {args: {limit, skip}}) {
              if (!(limit && skip)) {
                return incoming;
              }

              return {
                ...incoming,
                items: [...existing['items'], ...incoming['items']],
              };
            },
          },
          getActivities: {
            keyArgs: false,
            merge(existing = {items: []}, incoming, {args: {limit, skip}}) {
              if (!(limit && skip)) {
                return incoming;
              }

              return {
                ...incoming,
                items: [...existing['items'], ...incoming['items']],
              };
            },
          },
          getEvents: {
            keyArgs: ['objType'],
            merge(existing = {items: []}, incoming, {args: {limit, skip}}) {
              if (!(limit && skip)) {
                return incoming;
              }

              return {
                ...incoming,
                items: [...existing['items'], ...incoming['items']],
              };
            },
          },
        },
      },
    },
  }),
});

export {FinedeedsAppClient};
