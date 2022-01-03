import gql from 'graphql-tag';

const isEmailExistInDatabase = gql`
  query isEmailExistInDatabase($email: AWSEmail!) {
    isEmailExistInDatabase(email: $email)
  }
`;

const getVolunteerById = gql`
  query getVolunteerById($volunteerId: ID!) {
    getVolunteerById(volunteerId: $volunteerId) {
      volunteerId
      email
      volunteerName
      gender
      phone
      aboutMe
      dob
      city
      country
      createdAt
      causes
      skills
      isActive
      role
      designation
      activeContributor
      centerId
      # center {
      #   title
      #   orgCenterId
      # }
      organization {
        orgId
        orgName
        accountId
      }
    }
  }
`;
const getVolunteerDetail = gql`
  query getVolunteerDetail($volunteerId: ID!) {
    getVolunteerById(volunteerId: $volunteerId) {
      volunteerId
      email
      volunteerName
      causes
      skills
      createdAt
    }
  }
`;

const getOrganizations = gql`
  query getOrganizations(
    $limit: Int
    $skip: Int
    $filter: GetOrganizationsFilter
  ) {
    getOrganizations(limit: $limit, skip: $skip, filter: $filter) {
      count
      totalCount
      skip
      limit
      items {
        orgId
        orgName
        description
      }
    }
  }
`;

const getActiveOrgs = gql`
  query getActiveOrgs {
    getActiveOrgs {
      orgId
      orgName
      description
    }
  }
`;

const getOrgById = gql`
  query getOrgById($orgId: ID!) {
    getOrgById(orgId: $orgId) {
      orgId
      orgName
      description
      areaOfWorking
      accountId
      social {
        linkedin
        facebook
        twitter
        instagram
      }
    }
  }
`;

const getOrgDetail = gql`
  query getOrgDetail($orgId: ID!) {
    getOrgById(orgId: $orgId) {
      orgId
      orgName
    }
  }
`;

const getOrgCenters = gql`
  query getOrgCenters($orgId: ID!) {
    getOrgCenters(orgId: $orgId) {
      orgId
      title
      country
      city
      address
      lat
      objType
      lng
      createdAt
      orgCenterId
    }
  }
`;
const getOrgCenter = gql`
  query getOrgCenter($orgCenterId: ID!) {
    getOrgCenter(orgCenterId: $orgCenterId) {
      orgId
      title
      country
      city
      address
      lat
      objType
      lng
      createdAt
      orgCenterId
    }
  }
`;

const getUpcomingEvents = gql`
  query getUpcomingEvents($orgId: ID!) {
    getUpcomingEvents(orgId: $orgId) {
      eventId
      objType
      targetFunds
      volunteersNeeded
      title
      description
      eventTime
      startDate
      address
      country
      city
      isPaid
      near_by_address
      raisedAmount
      orgId
      # donors {
      #   fullName
      #   amount
      #   charges
      #   createdBy
      #   donateAnonymously
      # }
      online {
        link
        platform
      }
      # organization {
      #   orgId
      #   orgName
      # }
    }
  }
`;

const getPastEvents = gql`
  query getPastEvents($orgId: ID!) {
    getPastEvents(orgId: $orgId) {
      eventId
      objType
      targetFunds
      volunteersNeeded
      title
      description
      eventTime
      startDate
      address
      country
      city
      isPaid
      near_by_address
      raisedAmount
      orgId
      # donors {
      #   fullName
      #   amount
      #   charges
      #   createdBy
      #   donateAnonymously
      # }
      online {
        link
        platform
      }
      # organization {
      #   orgId
      #   orgName
      # }
    }
  }
`;

const getOrgStaff = gql`
  query getOrgStaff($orgId: ID!, $status: OrgActDeactStaffStatus) {
    getOrgStaff(orgId: $orgId, status: $status) {
      volunteerId
      volunteerName
      country
      skills
      causes
      city
      country
      designation
      organization {
        orgName
      }
    }
  }
`;

const getGeneralEvents = gql`
  query getGeneralEvents(
    $limit: Int
    $skip: Int
    $filter: GetEventsFilter
    $objType: GetEventsType
    $volunteerId: ID
  ) {
    getEvents(
      limit: $limit
      skip: $skip
      filter: $filter
      objType: $objType
      volunteerId: $volunteerId
    ) {
      count
      totalCount
      skip
      limit
      items {
        eventId
        startDate
        endDate
        title
        description
        volunteersNeeded
        objType
        address
        country
        city
        isPaid
        near_by_address
        isPrivate
        orgId
        organization {
          orgId
          orgName
        }
      }
    }
  }
`;

const getFundRaisingEvents = gql`
  query getFundRaisingEvents(
    $limit: Int
    $skip: Int
    $filter: GetEventsFilter
    $objType: GetEventsType
  ) {
    getEvents(limit: $limit, skip: $skip, filter: $filter, objType: $objType) {
      count
      totalCount
      skip
      limit
      items {
        eventId
        startDate
        endDate
        title
        description
        targetFunds
        objType
        orgId
        raisedAmount
        organization {
          orgId
          orgName
        }
      }
    }
  }
`;

const getOnlineEvents = gql`
  query getEvents(
    $limit: Int
    $skip: Int
    $filter: GetEventsFilter
    $objType: GetEventsType
  ) {
    getEvents(limit: $limit, skip: $skip, filter: $filter, objType: $objType) {
      count
      totalCount
      skip
      limit
      items {
        eventId
        startDate
        endDate
        title
        description
        volunteersNeeded
        objType
        isPrivate
        orgId
        online {
          link
          platform
        }
        # organization {
        #   orgId
        #   orgName
        # }
      }
    }
  }
`;

const getEvents = gql`
  query getEvents(
    $limit: Int
    $skip: Int
    $filter: GetEventsFilter
    $objType: GetEventsType
    $volunteerId: ID
  ) {
    getEvents(
      limit: $limit
      skip: $skip
      filter: $filter
      objType: $objType
      volunteerId: $volunteerId
    ) {
      count
      totalCount
      skip
      limit
      items {
        eventId
        startDate
        endDate
        title
        description
        volunteersNeeded
        targetFunds
        objType
        coverImg
        address
        country
        city
        near_by_address
        raisedAmount
        isPrivate
        orgId
        online {
          link
          platform
        }
        # organization {
        #   orgId
        #   orgName
        # }
      }
    }
  }
`;

const getEventsBySI = gql`
  query getEventsBySI($orgId: ID!) {
    getEventsBySI(orgId: $orgId) {
      eventId
      startDate
      endDate
      title
      description
      volunteersNeeded
      targetFunds
      objType
      address
      country
      city
      near_by_address
      raisedAmount
      donors {
        fullName
        amount
        charges
        createdBy
        donateAnonymously
      }
      location {
        line1
        city
        county
        country
      }
      isPrivate
      online {
        link
        platform
      }
      organization {
        orgId
        orgName
      }
    }
  }
`;

const getEvent = gql`
  query getEvent($eventId: ID!) {
    getEvent(eventId: $eventId) {
      eventId
      startDate
      endDate
      eventTime
      description
      duration
      objType
      volunteersNeeded
      title
      targetFunds
      entry_fee
      # coverImg
      createdBy
      createdAt
      address
      raisedAmount
      orgId
      online {
        link
        platform
      }
      isPrivate
      isPaid
      # organization {
      #   orgName
      #   orgId
      # }
      host {
        volunteerName
        volunteerId
        designation
        email
      }
      eventHosts {
        volunteerName
        volunteerId
        designation
        email
      }
    }
  }
`;

const getEventCoHosts = gql`
  query getEventCoHosts($eventId: ID!) {
    getEventCoHosts(eventId: $eventId) {
      cohosts {
        volunteerName
        volunteerId
        designation
        email
      }
      host {
        volunteerName
        volunteerId
      }
    }
  }
`;

const getFunraisingEvent = gql`
  query getFunraisingEvent($eventId: ID!) {
    getEvent(eventId: $eventId) {
      targetFunds
      eventId
      objType
      title
      description
      startDate
      endDate
      raisedAmount
      createdBy
      createdAt
      orgId
      organization {
        orgName
        orgId
      }
    }
  }
`;

const getOrgVolunteers = gql`
  query getOrgVolunteers(
    $orgId: ID!
    $orderByVolunteerType: Boolean
    $status: ParticipateStatus
  ) {
    getOrgVolunteers(
      orgId: $orgId
      orderByVolunteerType: $orderByVolunteerType
      status: $status
    ) {
      status
      orgId
      volunteerId
      volunteerType
      updatedAt
      note
      approvedBy {
        volunteerName
      }
      volunteer {
        volunteerName
        volunteerId
        email
        country
        skills
        causes
        city
        country
        designation
      }
    }
  }
`;

const getEventVolunteers = gql`
  query getEventVolunteers($eventId: ID!) {
    getEventVolunteers(eventId: $eventId) {
      createdAt
      volunteer {
        volunteerId
        volunteerName
      }
    }
  }
`;

const getEventComments = gql`
  query getEventComments($eventId: ID!) {
    getEventComments(eventId: $eventId) {
      comment
      volunteer {
        volunteerId
        volunteerName
      }
    }
  }
`;

const getVolunteerPublishedStories = gql`
  query getStories(
    $volunteerId: ID
    $isPublished: Boolean
    $limit: Int
    $skip: Int
  ) {
    getStories(
      volunteerId: $volunteerId
      isPublished: $isPublished
      limit: $limit
      skip: $skip
    ) {
      count
      totalCount
      skip
      limit
      items {
        storyId
        title
        orgName
        story
        isPublished
        createdBy {
          volunteerId
          volunteerName
        }
        createdById
        createdAt
        updatedBy
        updatedAt
      }
    }
  }
`;

const getPublishedStories = gql`
  query getStories($limit: Int, $skip: Int) {
    getStories(limit: $limit, skip: $skip) {
      count
      totalCount
      skip
      limit
      items {
        storyId
        title
        orgName
        story
        isPublished
        createdBy {
          volunteerId
          volunteerName
        }
        createdById
        createdAt
        updatedBy
        updatedAt
      }
    }
  }
`;

const getStory = gql`
  query getStory($storyId: ID) {
    getStory(storyId: $storyId) {
      storyId
      title
      orgName
      story
      isPublished
      publishedAt
      createdBy {
        volunteerId
        volunteerName
      }
      createdById
      createdAt
      updatedBy
      updatedAt
      likes {
        createdAt
        likedBy {
          volunteerId
          volunteerName
          city
          country
        }
      }
    }
  }
`;

const getProjects = gql`
  query getProjects(
    $orgId: ID
    $skip: Int
    $limit: Int
    $projectStatus: ProjectStatus
    $volunteerId: ID
  ) {
    getProjects(
      orgId: $orgId
      skip: $skip
      limit: $limit
      projectStatus: $projectStatus
      volunteerId: $volunteerId
    ) {
      count
      totalCount
      skip
      limit
      items {
        projectId
        projectName
        projectShortDescription
        whatIsNeeded
        whatWeHaveInPlace
        impactOfYourHelp
        skills
        experience
        timeFrame
        createdAt
        createdBy
        projectStatus
        organization {
          orgId
          orgName
          areaOfWorking
        }
      }
    }
  }
`;

const getProject = gql`
  query getProject($projectId: ID!) {
    getProject(projectId: $projectId) {
      projectId
      projectName
      projectShortDescription
      whatIsNeeded
      whatWeHaveInPlace
      impactOfYourHelp
      skills
      experience
      timeFrame
      createdBy
      createdAt
      projectStatus
      noOfParticipants
      organization {
        orgId
        orgName
        areaOfWorking
        address
      }
    }
  }
`;

const getVolunteerProExperience = gql`
  query getVolunteerProExperience($volunteerId: ID!) {
    getVolunteerProExperience(volunteerId: $volunteerId) {
      proExpid
      jobTitle
      orgName
      fromDate
      endDate
      isCurrent
      description
      createdAt
      createdBy {
        volunteerId
        volunteerName
      }
    }
  }
`;

const getVolunteerTeams = gql`
  query getVolunteerTeams($volunteerId: ID!) {
    getVolunteerTeams(volunteerId: $volunteerId) {
      teamId
      teamName
      createdBy {
        volunteerId
      }
      members {
        volunteerName
        email
        status
      }
      message
    }
  }
`;

const getActivities = gql`
  query getActivities($limit: Int, $skip: Int, $volunteerId: ID) {
    getActivities(limit: $limit, skip: $skip, volunteerId: $volunteerId) {
      count
      totalCount
      skip
      limit
      items {
        activityId
        activityName
        activityCauses
        activityDescription
        startDate
        nonProfit
        startTime
        duration
        activityAddress
        endDate
        createdBy
        organizedBy
        createdAt
      }
    }
  }
`;

const getActivity = gql`
  query getActivity($activityId: ID!) {
    getActivity(activityId: $activityId) {
      activityId
      activityName
      activityDescription
      activityCauses
      nonProfit
      startDate
      endDate
      startTime
      duration
      activityAddress
      organizedBy
      volunteer {
        volunteerId
        volunteerName
      }
      createdBy
      createdAt
    }
  }
`;

const getComments = gql`
  query getComments($limit: Int, $skip: Int, $objId: ID!) {
    getComments(limit: $limit, skip: $skip, objId: $objId) {
      count
      totalCount
      skip
      limit
      items {
        comment
        commentId
        objType
        objId
        createdBy {
          volunteerId
          volunteerName
        }
        createdAt
      }
    }
  }
`;

const getParticipants = gql`
  query getParticipants(
    $objId: ID!
    $objType: ParticipateType!
    $objStatus: ParticipateStatus
  ) {
    getParticipants(objId: $objId, objType: $objType, objStatus: $objStatus) {
      id
      objId
      volunteerId
      objType
      objStatus
      reason
      paymentId
      updatedAt
      createdAt
      approved {
        volunteerName
        email
      }
      volunteer {
        volunteerId
        volunteerName
        email
      }
    }
  }
`;

const getOrgVolunteerRequests = gql`
  query getOrgVolunteerRequests($orgId: ID!) {
    getOrgVolunteerRequests(orgId: $orgId) {
      orgId
      volunteerId
      createdAt
      volunteer {
        volunteerId
        volunteerName
        email
        phone
        gender
        aboutMe
        socialLinks {
          linkedin
          facebook
          twitter
        }
      }
    }
  }
`;

const getOrgDeclineRequests = gql`
  query getOrgDeclineRequests($orgId: ID!) {
    getOrgDeclineRequests(orgId: $orgId) {
      orgId
      volunteerId
      createdAt
      lastUpdatedAt
      note
      volunteer {
        volunteerId
        volunteerName
        email
        gender
      }
    }
  }
`;

const getParticipantsByOrgId = gql`
  query getParticipantsByOrgId($orgId: ID!, $objType: ParticipateType!) {
    getParticipantsByOrgId(orgId: $orgId, objType: $objType) {
      objId
      volunteerId
      objType
      objStatus
      objDetail {
        ... on Event {
          title
        }
        ... on Activity {
          activityName
        }
        ... on Project {
          projectName
        }
      }
      reason
      volunteer {
        volunteerId
        volunteerName
        email
      }
    }
  }
`;

const checkOrgJoinStatus = gql`
  query checkOrgJoinStatus($orgId: ID!, $volunteerId: ID!) {
    checkOrgJoinStatus(orgId: $orgId, volunteerId: $volunteerId) {
      status
    }
  }
`;
const getDonations = gql`
  query getDonations($volunteerId: String) {
    getDonations(volunteerId: $volunteerId) {
      amount
      createdAt
      event {
        title
        eventId
      }
      org {
        orgName
        orgId
      }
    }
  }
`;

const getEventDonors = gql`
  query getEventDonors($eventId: String) {
    getDonations(eventId: $eventId) {
      amount
      createdBy
      donateAnonymously
      fullName
    }
  }
`;

const getDonationAmountAccordingToMonth = gql`
  query getDonationAmountAccordingToMonth($year: Int, $orgId: ID) {
    getDonationAmountAccordingToMonth(year: $year, orgId: $orgId) {
      jan
      feb
      mar
      apr
      may
      jun
      jul
      aug
      sep
      oct
      nov
      dec
    }
  }
`;

const getNotifications = gql`
  query getNotifications($receiverId: ID!) {
    getNotifications(receiverId: $receiverId) {
      message
      link
      receiverId
      senderId
      isRead
      createdAt
    }
  }
`;

const getOrgVolunteerType = gql`
  query getOrgVolunteerType($orgId: ID!) {
    getOrgVolunteerType(orgId: $orgId) {
      typeId
      volunteerType
      orgId
      order
      createdAt
    }
  }
`;

const getVolunteerContributionsCount = gql`
  query getVolunteerContributionsCount($volunteerId: ID!) {
    getVolunteerContributionsCount(volunteerId: $volunteerId) {
      activitiesCount
      donationsCount
      storiesCount
      projectsCount
      eventsCount
    }
  }
`;

const getContributors = gql`
  query getContributors($limit: Int, $skip: Int, $activeContributor: Boolean) {
    getContributors(
      limit: $limit
      skip: $skip
      activeContributor: $activeContributor
    ) {
      count
      totalCount
      skip
      limit
      items {
        volunteerId
        volunteerName
        country
        skills
        causes
        city
        country
        designation
        aboutMe
        organization {
          orgName
        }
      }
    }
  }
`;

const getConversation = gql`
  query getConversation($id: ID!) {
    getConversation(id: $id) {
      id
      lastMessage
      name
      createdAt
    }
  }
`;

const listConversation = gql`
  query listConversation(
    $convoLinkUserId: ID!
    $filter: ListConversationFilter
  ) {
    listConversation(convoLinkUserId: $convoLinkUserId, filter: $filter) {
      id
      lastMessageId
      membersData {
        volunteerId
        volunteerName
      }
      lastMessage {
        content {
          text
          attachements {
            source
            fileName
            ext
          }
        }
      }
      name
      createdAt
      createdBy
    }
  }
`;
const getMessages = gql`
  query getMessages($convoId: ID!, $limit: Int, $skip: Int) {
    getMessages(convoId: $convoId, limit: $limit, skip: $skip) {
      items {
        id
        authorId
        content {
          text
          # attachements {
          #   source
          #   fileName
          #   ext
          # }
          # parentMessageId
        }
        createdAt
      }
    }
  }
`;

const getProducts = gql`
  query getProducts($input: GetProductsInput) {
    getProducts(input: $input) {
      totalCount
      limit
      skip
      items {
        id
        title
        description
        images
        condition
        supportingId
        amount
        category
        sellerId
        city
        country
        pickup_location
        createdAt
      }
    }
  }
`;

const getProductsCount = gql`
  query getProductsCount($input: GetProductsInput) {
    getProductsCount(input: $input)
  }
`;

const getMyProducts = gql`
  query getMyProducts($input: GetProductsInput) {
    getMyProducts(input: $input) {
      totalCount
      limit
      skip
      items {
        id
        title
        description
        images
        condition
        supportingId
        amount
        category
        sellerId
        city
        country
        pickup_location
        createdAt
      }
    }
  }
`;

const getProduct = gql`
  query getProduct($id: ID!) {
    getProduct(id: $id) {
      id
      title
      description
      images
      condition
      supportingId
      amount
      category
      sellerId
      city
      country
      pickup_location
      createdAt
    }
  }
`;

const getProductsByIds = gql`
  query getProductsByIds($ids: [ID!]) {
    getProductsByIds(ids: $ids) {
      id
      title
      description
      images
      condition
      supportingId
      amount
      category
      sellerId
      city
      country
      pickup_location
      createdAt
    }
  }
`;

const getCartItems = gql`
  query getCartItems($buyerId: ID!) {
    getCartItems(buyerId: $buyerId) {
      createdAt
      product {
        id
        images
        title
        amount
        city
        description
        country
      }
    }
  }
`;
const getWishlistItems = gql`
  query getWishlistItems($buyerId: ID!) {
    getWishlistItems(buyerId: $buyerId) {
      createdAt
      product {
        id
        images
        title
        amount
        city
        description
        country
      }
    }
  }
`;

const getCartItemsCount = gql`
  query getCartItemsCount($buyerId: ID!) {
    getCartItems(buyerId: $buyerId) {
      createdAt
    }
  }
`;
const getWishlistItemsCount = gql`
  query getWishlistItemsCount($buyerId: ID!) {
    getWishlistItems(buyerId: $buyerId) {
      createdAt
    }
  }
`;

const listWarnings = gql`
  query listWarnings($userId: ID!, $type: WARNING_TYPE) {
    listWarnings(userId: $userId, type: $type) {
      id
      userId
      message
      type
      createdAt
    }
  }
`;

const getOrders = gql`
  query getOrders(
    $userId: ID!
    $type: MARKETPLACE_USER # $status: ORDER_STATUS
  ) {
    getOrders(userId: $userId, type: $type) {
      id
      createdAt
      status
      total
      items {
        id
        orderId
        productId
        paymentId
        amount
        status
        quantity
        product {
          id
          title
          supportingId
          sellerId
          images
          pickup_location
          amount
        }
      }
    }
  }
`;
const getOrderItems = gql`
  query getOrderItems(
    $userId: ID!
    $type: MARKETPLACE_USER
    $status: ORDER_STATUS
  ) {
    getOrderItems(userId: $userId, type: $type, status: $status) {
      id
      status
      orderId
      product {
        id
        title
        supportingId
        sellerId
        images
        pickup_location
        amount
      }
    }
  }
`;

export {
  getOrderItems,
  getCartItemsCount,
  getOrders,
  getVolunteerDetail,
  getProduct,
  getCartItems,
  getProducts,
  getMessages,
  listConversation,
  getConversation,
  getVolunteerContributionsCount,
  getOrgVolunteerType,
  getContributors,
  isEmailExistInDatabase,
  getVolunteerById,
  getOrganizations,
  getOrgById,
  getUpcomingEvents,
  getPastEvents,
  getOrgStaff,
  getEvents,
  getEvent,
  getFunraisingEvent,
  getOrgVolunteers,
  getEventVolunteers,
  getEventComments,
  getPublishedStories,
  getVolunteerPublishedStories,
  getStory,
  getVolunteerProExperience,
  getVolunteerTeams,
  getComments,
  getActivities,
  getActivity,
  getParticipants,
  getProject,
  getProjects,
  getOrgDeclineRequests,
  getOrgVolunteerRequests,
  getParticipantsByOrgId,
  getEventsBySI,
  checkOrgJoinStatus,
  getDonationAmountAccordingToMonth,
  getNotifications,
  getGeneralEvents,
  getFundRaisingEvents,
  getOnlineEvents,
  getOrgCenters,
  getDonations,
  getEventDonors,
  getEventCoHosts,
  getOrgDetail,
  listWarnings,
  getActiveOrgs,
  getMyProducts,
  getProductsByIds,
  getProductsCount,
  getWishlistItems,
  getWishlistItemsCount,
  getOrgCenter,
};
