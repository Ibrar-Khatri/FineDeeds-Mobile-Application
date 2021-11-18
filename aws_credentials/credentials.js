import {
  NATIVE_PUBLIC_IDENTITY_POOL_ID,
  NATIVE_PUBLIC_REGION,
  NATIVE_PUBLIC_USER_POOL_ID,
  NATIVE_PUBLIC_USER_POOL_WEB_CLIENT_ID,
  NATIVE_PUBLIC_APPSYNC_GRAPHQL_ENDPOINT,
  NATIVE_PUBLIC_FINEDEEDS_APPSYNC,
  NATIVE_PUBLIC_BUCKET,
} from '@env';

export default credentials = {
  cognito: {
    identityPoolId: NATIVE_PUBLIC_IDENTITY_POOL_ID,
    region: NATIVE_PUBLIC_REGION,
    userPoolId: NATIVE_PUBLIC_USER_POOL_ID,
    userPoolWebClientId: NATIVE_PUBLIC_USER_POOL_WEB_CLIENT_ID,
  },

  finedeedsAppSync: {
    graphqlEndpoint: NATIVE_PUBLIC_APPSYNC_GRAPHQL_ENDPOINT,
    region: NATIVE_PUBLIC_REGION,
    authenticationType: 'API_KEY',
    apiKey: NATIVE_PUBLIC_FINEDEEDS_APPSYNC,
  },

  S3: {
    bucket: NATIVE_PUBLIC_BUCKET,
  },
};