import credentials from './credentials';

export default awsConfig = {
  Auth: {
    identityPoolId: credentials.cognito.identityPoolId, //REQUIRED - Amazon Cognito Identity Pool ID
    region: credentials.cognito.region, // REQUIRED - Amazon Cognito Region
    userPoolId: credentials.cognito.userPoolId, //OPTIONAL - Amazon Cognito User Pool ID
    userPoolWebClientId: credentials.cognito.userPoolWebClientId, //OPTIONAL - Amazon Cognito Web Client ID
  },
  Storage: {
    AWSS3: {
      bucket: credentials.S3.bucket, //REQUIRED -  Amazon S3 bucket
      region: credentials.cognito.region, //OPTIONAL -  Amazon service region
    },
  },
};
