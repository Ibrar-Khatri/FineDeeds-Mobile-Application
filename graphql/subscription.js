import gql from "graphql-tag";

const NOTIFICATIONS_SUBSCRIPTION = gql`
  subscription subscribeToNotifications($receiverId: ID!) {
    subscribeToNotifications(receiverId: $receiverId) {
      message
      link
      receiverId
      senderId
      isRead
    }
  }
`;

export { NOTIFICATIONS_SUBSCRIPTION };
