import React, {useEffect, useState} from 'react';
import {useLazyQuery, useMutation} from '@apollo/client';
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {getParticipants, getProject} from '../../../../graphql/queries';
import {
  CommentSection,
  CustomButton,
  CustomSpinner,
  CustomToast,
  InfoCard,
  ParticipateContainer,
  RenderS3Image,
  ResponsiveText,
  VolunteerManagementNavigatorCard,
} from '../../../components/index';
import {
  widthPercentageToDP as vw,
  normalize,
} from '../../../responsive/responsive';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {newRenderDate} from '../../../shared/services/helper';
import {DescriptionCard, TagView} from './components/index';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {useToast} from 'native-base';
import {
  deleteParticipant,
  sendParticipateRequest,
} from '../../../../graphql/mutations';

let screenWidth = Dimensions.get('window').width;

export default function ProjectDetailScreen(props) {
  const {data} = props;
  let [user, setUser] = useState();
  let [participants, setParticipants] = useState(null);
  let [getProjectById, projectData] = useLazyQuery(getProject);
  const [
    getParticipantData,
    {loading: partcipantLoading, data: participantData},
  ] = useLazyQuery(getParticipants, {
    fetchPolicy: 'network-only',
  });

  const [sendParticipateReq, {loading: participantLoading}] = useMutation(
    sendParticipateRequest,
  );
  const [deleteParticipantReq, {loading: deleteParticipantLoading}] =
    useMutation(deleteParticipant);
  let navigation = useNavigation();
  let toast = useToast();

  useEffect(() => {
    AsyncStorage.getItem('volunteer').then(vol => {
      setUser(JSON.parse(vol));
    });

    data &&
      getProjectById({
        variables: {projectId: data?.projectId},
      });
    const unsubscribe = navigation.addListener('focus', () => {
      data &&
        getParticipantData({
          variables: {
            objId: data?.projectId,
            objType: 'PROJECT',
            objStatus: 'ACCEPTED',
          },
        });
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    participantData?.getParticipants?.length >= 0 &&
      setParticipants(participantData?.getParticipants);
  }, [participantData?.getParticipants]);

  const checkDisabled = () => {
    const alreadyPart = participants?.find(
      participant => participant['volunteerId'] === user?.volunteerId,
    );
    if (alreadyPart) return true;
    else return false;
  };
  const alreadyPart = checkDisabled();

  const updateParticipants = type => {
    if (type === 'participate') {
      sendParticipateReq({
        variables: {
          input: {
            objId: data?.projectId,
            volunteerId: user?.volunteerId,
            objType: 'PROJECT',
            objStatus: 'PENDING',
            createdBy: user?.volunteerId,
            orgId: data?.organization?.orgId,
          },
        },
      })
        .then(() => {
          renderToast('success', 'Request send Success!');
        })
        .catch(err =>
          renderToast('error', err.message.replace('GraphQL error: ', '')),
        );
    } else {
      deleteParticipantReq({
        variables: {
          input: {
            objId: data?.projectId,
            objType: 'PROJECT',
            volunteerId: user?.volunteerId,
          },
        },
        update: proxy => {
          try {
            const data2 = proxy.readQuery({
              query: getParticipants,
              variables: {
                objId: data?.projectId,
                objType: 'PROJECT',
                objStatus: 'ACCEPTED',
              },
            });
            const updated = data2?.getParticipants?.filter(
              v => v?.volunteerId !== user?.volunteerId,
            );
            proxy.writeQuery({
              query: getParticipants,
              variables: {
                objId: data?.projectId,
                objType: 'PROJECT',
                objStatus: 'ACCEPTED',
              },
              data: {
                getParticipants: updated,
              },
            });
          } catch (error) {
            renderToast('error', error.message);
          }
        },
      })
        .then(() => {
          renderToast('success', 'You have Unparticipted Successfully.');
        })
        .catch(err => {
          renderToast('error', err.message);
        });
    }
  };

  function renderToast(type, description) {
    toast.show({
      placement: 'top',
      duration: 3000,
      render: () => <CustomToast type={type} description={description} />,
    });
  }

  const userExists = volunteerId => {
    return participants?.some(el => {
      return el?.volunteerId === volunteerId;
    });
  };

  function navigateTo() {
    navigation.push('detail-screen', {
      initialRouteName: 'organization_detail',
      data: data?.organization,
      title: data?.organization?.orgName,
    });
  }

  return projectData?.data?.getProject && participants ? (
    <ScrollView style={style.activityDetailScreenView}>
      <RenderS3Image
        s3Key={`ORGANIZATION/IMAGE/${data?.organization?.orgId}.webp`}
        style={style.imageStyle}
      />
      <ResponsiveText style={style.descriptionTitle} size={16}>
        Description
      </ResponsiveText>
      <View style={style.projectBodyView}>
        <DescriptionCard description={data?.projectShortDescription} />
        <DescriptionCard
          title="What is Nedded"
          description={data?.whatIsNeeded}
        />
        <DescriptionCard
          title="Impact of your help"
          description={data?.impactOfYourHelp}
        />
        <DescriptionCard
          title="What we have in place"
          description={data?.whatWeHaveInPlace}
        />
        <ResponsiveText size={16} style={style.expStyle}>
          Experince
        </ResponsiveText>
        <ResponsiveText size={12} style={style.detail}>
          {data?.experience ? data?.experience : 'No'}
        </ResponsiveText>

        <TouchableOpacity style={style.logoAndName} onPress={navigateTo}>
          <RenderS3Image
            s3Key={
              data && `ORGANIZATION/LOGO/${data?.organization?.orgId}.webp`
            }
            style={style.orgLogo}
          />
          <View style={style.orgNameAndLocaView}>
            <ResponsiveText size={16} style={style.orgName}>
              {data?.organization?.orgName}
            </ResponsiveText>
            <ResponsiveText size={12} style={style.orgLocation}>
              {projectData?.data?.getProject?.organization?.address}
            </ResponsiveText>
          </View>
        </TouchableOpacity>

        <InfoCard title="TIME FRAME" subTitle={`${data?.timeFrame} Weeks`} />

        <TagView title="Causes" tags={data?.organization?.areaOfWorking} />
        <TagView title="Skills" tags={data?.skills} />
        <View style={style.calenderView}>
          <FontAwesome name="calendar" color="#f06d06" size={normalize(18)} />
          <ResponsiveText
            style={style.postedDateStyle}
            size={12}>{` Posted ${newRenderDate(
            data?.createdAt,
          )}`}</ResponsiveText>
        </View>

        {user && user?.role !== 'STAFF' && (
          <CustomButton
            style={style.buttonView}
            onClick={() => updateParticipants(alreadyPart ? '' : 'participate')}
            isLoading={participantLoading || deleteParticipantLoading}
            buttonText={
              participantLoading || deleteParticipantLoading
                ? 'LOADING'
                : alreadyPart
                ? 'Unparticipate'
                : 'Participate'
            }
          />
        )}

        <ParticipateContainer
          participants={participants}
          length={participants?.length}
        />
        {user && user?.volunteerId === data?.createdBy && (
          <>
            <CustomButton
              buttonText="Update Project"
              style={style.buttonView}
            />
            <CustomButton
              style={style.buttonView}
              buttonText={
                data?.projectStatus === 'COMPLETED'
                  ? 'Activate Project Again'
                  : 'Mark as Completed'
              }
            />
            <CustomButton
              style={style.buttonView}
              buttonText="Delete Project"
            />
          </>
        )}

        {user?.volunteerId === data?.createdBy && (
          <>
            <VolunteerManagementNavigatorCard
              navigation={navigation}
              objId={data?.projectId}
              objType="PROJECT"
              title="Joining Requests"
              screenName="request_screen"
            />
            <VolunteerManagementNavigatorCard
              navigation={navigation}
              objId={data?.projectId}
              objType="PROJECT"
              title="Declined Requests"
              screenName="decline_screen"
            />
            <VolunteerManagementNavigatorCard
              navigation={navigation}
              objId={data?.projectId}
              objType="PROJECT"
              title="Accepted Requests"
              screenName="volunteer_screen"
            />
          </>
        )}

        {!data?.projectId || !user ? null : userExists(user?.volunteerId) ||
          user?.volunteerId === data?.createdBy ? (
          <CommentSection objId={data?.projectId} objType={'PROJECT'} />
        ) : null}
      </View>
    </ScrollView>
  ) : (
    <View style={style.spinnerView}>
      <CustomSpinner size="lg" color="#f06d06" />
    </View>
  );
}

let style = StyleSheet.create({
  spinnerView: {
    flex: 1,
    justifyContent: 'center',
  },
  activityDetailScreenView: {
    backgroundColor: '#fff',
  },
  imageStyle: {
    height: vw(55),
    width: '100%',
    borderRadius: 10,
  },
  descriptionTitle: {
    color: '#f06d06',
    fontFamily: 'Montserrat-SemiBold',
    padding: 15,
    borderBottomColor: '#f06d06',
    borderBottomWidth: 2,
    display: 'flex',
    alignSelf: 'flex-start',
    textAlign: 'center',
    marginBottom: 15,
  },
  projectBodyView: {
    padding: 15,
    borderTopColor: '#ebebeb',
    borderTopWidth: 2,
    width: '100%',
  },
  expStyle: {
    color: '#f06d06',
    fontFamily: 'Montserrat-SemiBold',
    marginBottom: vw(2),
  },
  detail: {
    fontFamily: 'Montserrat-Regular',
    color: 'rgba(0,0,0,.7)',
    marginBottom: vw(3),
  },
  logoAndName: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: vw(5),
  },
  orgLogo: {
    height: vw(screenWidth < 480 ? 10 : 9),
    width: vw(screenWidth < 480 ? 10 : 9),
    borderRadius: 10,
  },
  orgNameAndLocaView: {
    marginLeft: 10,
  },
  orgName: {
    color: '#f06d06',
    fontFamily: 'Montserrat-Bold',
  },
  orgLocation: {
    color: '#212529',
    fontFamily: 'Montserrat-Regular',
  },
  calenderView: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: vw(3),
  },
  postedDateStyle: {
    color: '#212529',
  },
  buttonView: {
    marginBottom: vw(3),
  },
});
