import gql from "graphql-tag";

const updateVolunteerInfo = gql`
  mutation updateVolunteerInfo($input: updateVolunteerInfoInput!) {
    updateVolunteerInfo(input: $input) {
      volunteerId
      email
      volunteerName
      gender
      phone
      aboutMe
      dob
      city
      country
      causes
      skills
    }
  }
`;

const updateAddress = gql`
  mutation updateAddress($input: updateAddressInput!) {
    updateAddress(input: $input) {
      line1
      line2
      city
      county
      country
      postalCode
    }
  }
`;

const updateSocialLinks = gql`
  mutation updateSocialLinks($input: updateSocialLinksInput!) {
    updateSocialLinks(input: $input) {
      objId
      objType
      linkedin
      facebook
      twitter
      instagram
    }
  }
`;

const sendJoinOrgRequest = gql`
  mutation sendJoinOrgRequest($input: OrgVolunteerRequestInput!) {
    sendJoinOrgRequest(input: $input) {
      orgId
      volunteerId
    }
  }
`;

const sendParticipateRequest = gql`
  mutation sendParticipateRequest($input: ParticipateInput!) {
    sendParticipateRequest(input: $input) {
      objId
      objStatus
      objType
      volunteerId
      createdBy
    }
  }
`;

const removeVolunteerFromOrg = gql`
  mutation removeVolunteerFromOrg($input: RemoveVolunteerFromOrgInput) {
    removeVolunteerFromOrg(input: $input) {
      orgId
      volunteerId
    }
  }
`;

const sendJoinEventRequest = gql`
  mutation sendJoinEventRequest($input: EventVolunteerRequestInput) {
    sendJoinEventRequest(input: $input) {
      eventId
      volunteerId
    }
  }
`;

const subscribeFinedeeds = gql`
  mutation subscribeFinedeeds($input: SubscribeFinedeedsInput!) {
    subscribeFinedeeds(input: $input)
  }
`;

const writeCommentOnEvent = gql`
  mutation writeCommentOnEvent($input: EventCommentInput!) {
    writeCommentOnEvent(input: $input) {
      eventId
      commentId
    }
  }
`;

const saveStory = gql`
  mutation saveStory($input: StoryInput!) {
    saveStory(input: $input) {
      storyId
      title
    }
  }
`;

const deleteStory = gql`
  mutation deleteStory($input: DeleteStoryInput!) {
    deleteStory(input: $input)
  }
`;

const saveProExperience = gql`
  mutation saveProExperience($input: ProExperienceInput!) {
    saveProExperience(input: $input) {
      proExpid
      jobTitle
    }
  }
`;

const updateProExperience = gql`
  mutation updateProExperience($input: UpdateProExperienceInput!) {
    updateProExperience(input: $input) {
      proExpid
      jobTitle
    }
  }
`;

const createTeam = gql`
  mutation createTeam($input: CreateTeamInput!) {
    createTeam(input: $input) {
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

const createActivity = gql`
  mutation CreateActivity($input: ActivityInput!) {
    createActivity(input: $input) {
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
      createdBy
      createdAt
    }
  }
`;

const updateActivity = gql`
  mutation updateActivity($input: updateActivityInput!) {
    updateActivity(input: $input) {
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
      updatedBy
    }
  }
`;

const deleteActivity = gql`
  mutation deleteActivity($input: DeleteActivityInput!) {
    deleteActivity(input: $input)
  }
`;

const deleteTeam = gql`
  mutation deleteTeam($input: DeleteTeamInput!) {
    deleteTeam(input: $input)
  }
`;

const deleteTeamMember = gql`
  mutation deleteTeamMember($input: DeleteTeamMemberInput!) {
    deleteTeamMember(input: $input)
  }
`;

const updateVolunteerSkills = gql`
  mutation updateVolunteerSkills($input: updateVolunteerSkillsInput!) {
    updateVolunteerSkills(input: $input) {
      volunteerId
      volunteerName
    }
  }
`;

const updateVolunteerCauses = gql`
  mutation updateVolunteerCauses($input: updateVolunteerCausesInput!) {
    updateVolunteerCauses(input: $input) {
      volunteerId
      volunteerName
    }
  }
`;

const likeStory = gql`
  mutation likeStory($input: LikeStory) {
    likeStory(input: $input) {
      storyId
      title
      orgName
      story
      isPublished
      createdBy {
        volunteerId
        volunteerName
        aboutMe
        contributions {
          storiesCount
          eventsCount
        }
      }
      createdById
      createdAt
      updatedBy
      updatedAt
      likes {
        likedBy {
          volunteerId
          volunteerName
          city
          country
          createdAt
        }
      }
    }
  }
`;

const addComment = gql`
  mutation addComment($input: CommentInput) {
    addComment(input: $input) {
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
`;

const deleteComment = gql`
  mutation deleteComment($input: DeleteCommentInput!) {
    deleteComment(input: $input)
  }
`;

const acceptInvitation = gql`
  mutation acceptInvitation($input: AcceptInviteInput!) {
    acceptInvitation(input: $input)
  }
`;

const deleteParticipant = gql`
  mutation deleteParticipant($input: DeleteParticipantInput!) {
    deleteParticipant(input: $input)
  }
`;

const deleteProExperience = gql`
  mutation deleteProExperience($input: DeleteProExperienceInput!) {
    deleteProExperience(input: $input)
  }
`;
const createEvent = gql`
  mutation createEvent($input: EventInput!) {
    createEvent(input: $input) {
      eventId
    }
  }
`;

const updateEvent = gql`
  mutation updateEvent($input: UpdateEventInput!) {
    updateEvent(input: $input) {
      eventId
    }
  }
`;

const deleteEvent = gql`
  mutation deleteEvent($input: DeleteEventInput!) {
    deleteEvent(input: $input)
  }
`;

const createProject = gql`
  mutation createProject($input: ProjectInput!) {
    createProject(input: $input) {
      projectId
    }
  }
`;

const updateProject = gql`
  mutation updateProject($input: UpdateProjectInput!) {
    updateProject(input: $input) {
      projectId
      projectName
      projectShortDescription
      whatIsNeeded
      whatWeHaveInPlace
      impactOfYourHelp
      skills
      experience
      timeFrame
      updatedBy
    }
  }
`;

const deleteProject = gql`
  mutation deleteProject($input: DeleteProjectInput!) {
    deleteProject(input: $input)
  }
`;

const changeParticipateStatus = gql`
  mutation changeParticipateStatus($input: ChangeParticipateStatusInput!) {
    changeParticipateStatus(input: $input) {
      objStatus
      volunteerId
    }
  }
`;

const acceptVolunteerRequest = gql`
  mutation acceptVolunteerRequest($input: OrgVolunteerRequestInput) {
    acceptVolunteerRequest(input: $input) {
      orgId
    }
  }
`;

const changeOrgVolunteerType = gql`
  mutation  changeOrgVolunteerType($input: ChangeOrgVolunteerTypeInput!) {
     changeOrgVolunteerType(input: $input) {
      orgId
      volunteerId
    }
  }
`;

const declineVolunteerRequest = gql`
  mutation declineVolunteerRequest($input: DeclineVolunteerRequestInput) {
    declineVolunteerRequest(input: $input) {
      orgId
    }
  }
`;

const removeVolunteerDeclinedRequestFromOrg = gql`
  mutation removeVolunteerDeclinedRequestFromOrg(
    $input: RemoveVolunteerDeclinedRequestFromOrg
  ) {
    removeVolunteerDeclinedRequestFromOrg(input: $input) {
      orgId
    }
  }
`;

const makeDonation = gql`
  mutation makeDonation($input: DonationInput!) {
    makeDonation(input: $input) {
      donationId
    }
  }
`;

const changeProjectStatus = gql`
  mutation changeProjectStatus($input: ChangeProjectStatusInput!) {
    changeProjectStatus(input: $input) {
      projectId
      projectName
    }
  }
`;

const sendNotification = gql`
  mutation sendNotification($input: NotificationInput!) {
    sendNotification(input: $input) {
      message
      senderId
      receiverId
    }
  }
`;

const readNotification = gql`
  mutation readNotification($receiverId: ID!) {
    readNotification(receiverId: $receiverId)
  }
`;

const inviteVolunteersForOrg = gql`
  mutation inviteVolunteersForOrg($input: OrgInvitedVolunteersInput!) {
    inviteVolunteersForOrg(input: $input) {
      orgId
      inviteId
      volunteersEmail
    }
  }
`;

export {
  updateVolunteerInfo,
  updateAddress,
  updateSocialLinks,
  sendJoinOrgRequest,
  sendJoinEventRequest,
  subscribeFinedeeds,
  removeVolunteerFromOrg,
  writeCommentOnEvent,
  saveStory,
  saveProExperience,
  createTeam,
  updateVolunteerSkills,
  updateVolunteerCauses,
  likeStory,
  addComment,
  createActivity,
  acceptInvitation,
  sendParticipateRequest,
  deleteComment,
  deleteStory,
  deleteActivity,
  updateActivity,
  deleteTeam,
  deleteTeamMember,
  deleteParticipant,
  updateProExperience,
  deleteProExperience,
  makeDonation,
  createEvent,
  createProject,
  updateProject,
  deleteProject,
  changeParticipateStatus,
  acceptVolunteerRequest,
  declineVolunteerRequest,
  removeVolunteerDeclinedRequestFromOrg,
  changeProjectStatus,
  updateEvent,
  deleteEvent,
  sendNotification,
  readNotification,
  inviteVolunteersForOrg,
  changeOrgVolunteerType
};
