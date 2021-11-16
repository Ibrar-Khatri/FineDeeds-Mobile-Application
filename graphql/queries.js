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

const getOrgById = gql`
  query getOrgById($orgId: ID!) {
    getOrgById(orgId: $orgId) {
      orgId
      orgName
      description
      areaOfWorking
      accountId
      socialLinks {
        linkedin
        facebook
        twitter
        instagram
      }
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
      coverImg
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
      online {
        link
        platform
      }
      organization {
        orgId
        orgName
      }
      location {
        line1
        city
        county
        country
      }
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
      coverImg
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
      online {
        link
        platform
      }
      organization {
        orgId
        orgName
      }
      location {
        line1
        city
        county
        country
      }
    }
  }
`;

const getOrgStaff = gql`
  query getOrgStaff($orgId: ID!, $status: OrgActDeactStaffStatus) {
    getOrgStaff(orgId: $orgId, status: $status) {
      volunteerName
      volunteerId
      designation
      # gender
      # phone
      # aboutMe
      # dob
      # city
      # country
      # causes
      # skills
      # center {
      #   title
      # }
      # organization {
      #   orgId
      # }
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
        near_by_address
        isPrivate
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
      # coverImg
      createdBy
      createdAt
      address
      # country
      # city
      # near_by_address
      raisedAmount
      online {
        link
        platform
      }
      isPrivate
      organization {
        orgName
        orgId
      }
      host {
        volunteerName
        volunteerId
        designation
        # createdAt
        email
        # gender
        # aboutMe
      }
      # eventHosts {
      #   volunteerName
      #   volunteerId
      #   designation
      #   createdAt
      #   email
      #   gender
      #   aboutMe
      # }
    }
  }
`;

const getEventCoHosts = gql`
  query getEventCoHosts($eventId: ID!) {
    getEventCoHosts(eventId: $eventId) {
      volunteerName
      volunteerId
      designation
      email
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
      organization {
        orgName
        orgId
      }
    }
  }
`;

const getOrgVolunteers = gql`
  query getOrgVolunteers($orgId: ID!, $orderByVolunteerType: Boolean) {
    getOrgVolunteers(
      orgId: $orgId
      orderByVolunteerType: $orderByVolunteerType
    ) {
      orgId
      volunteerId
      volunteerType
      volunteer {
        volunteerName
        volunteerId
        email
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
      projectStatus
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
      objId
      volunteerId
      objType
      objStatus
      reason
      updatedAt
      createdAt
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

export {
  getVolunteerContributionsCount,
  getOrgVolunteerType,
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
};
