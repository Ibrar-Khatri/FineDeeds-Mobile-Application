import React, {useEffect, useState} from 'react';
import {useLazyQuery} from '@apollo/client';
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

let screenWidth = Dimensions.get('window').width;

export default function ProjectDetailScreen(props) {
  const {data} = props;
  let [user, setUser] = useState();
  let [getProjectById, projectData] = useLazyQuery(getProject);
  const [
    getParticipantData,
    {loading: partcipantLoading, data: participantData},
  ] = useLazyQuery(getParticipants);
  let navigation = useNavigation();
  let toast = useToast();

  useEffect(() => {
    AsyncStorage.getItem('volunteer').then(vol => {
      setUser(JSON.parse(vol));
    });
  }, []);

  useEffect(() => {
    if (data?.projectId) {
      getProjectById({
        variables: {projectId: data?.projectId},
      });
      getParticipantData({
        variables: {
          objId: data?.projectId,
          objType: 'PROJECT',
          objStatus: 'ACCEPTED',
        },
      });
    }
  }, [data]);

  const checkDisabled = () => {
    const alreadyPart = participantData?.getParticipants?.find(
      participant => participant['volunteerId'] === user?.volunteerId,
    );
    if (alreadyPart) return true;
    else return false;
  };
  const alreadyPart = checkDisabled();

  const userExists = volunteerId => {
    return participantData?.getParticipants?.some(el => {
      return el?.volunteerId === volunteerId;
    });
  };

  const updateParticipants = type => {
    if (user) {
      // if (type === 'participate') {
      //   sendParticipateReq({
      //     variables: {
      //       input: {
      //         objId: data?.activityId,
      //         volunteerId: user?.volunteerId,
      //         objType: 'ACTIVITY',
      //         objStatus: 'ACCEPTED',
      //         createdBy: user?.volunteerId,
      //       },
      //     },
      //     update: (proxy, data) => {
      //       try {
      //         let updated = [
      //           ...participant,
      //           data?.data?.sendParticipateRequest,
      //         ];
      //         proxy.writeQuery({
      //           query: getParticipants,
      //           variables: {
      //             objId: data?.activityId,
      //             objType: 'ACTIVITY',
      //             objStatus: 'ACCEPTED',
      //           },
      //           data: {
      //             getParticipants: updated,
      //           },
      //         });
      //         setParticipant(updated);
      //       } catch (error) {
      //         console.log(error, '=== error ==');
      //       }
      //     },
      //   })
      //     .then(() => {
      //       renderToast('success', 'You have participated Successfully!');
      //     })
      //     .catch(err => renderToast('error', err.message));
      // } else {
      //   deleteParticipantReq({
      //     variables: {
      //       input: {
      //         objId: data?.activityId,
      //         objType: 'ACTIVITY',
      //         volunteerId: user?.volunteerId,
      //       },
      //     },
      //     update: proxy => {
      //       try {
      //         const filtered = participant?.filter(
      //           p => p?.volunteerId !== user?.volunteerId,
      //         );
      //         proxy.writeQuery({
      //           query: getParticipants,
      //           variables: {
      //             objId: data?.activityId,
      //             objType: 'ACTIVITY',
      //             objStatus: 'ACCEPTED',
      //           },
      //           data: {
      //             getParticipants: filtered,
      //           },
      //         });
      //         setParticipant(filtered);
      //       } catch (error) {
      //         renderToast('error', error.message);
      //       }
      //     },
      //   })
      //     .then(() => {
      //       renderToast('success', 'You have Unparticipted Successfully!');
      //     })
      //     .catch(err => {
      //       renderToast('error', 'You have Unparticipted Successfully!');
      //     });
      // }
    } else {
      navigation.push('authentication-screen', {
        screen: 'login',
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
  function navigateTo() {
    navigation.push('detail-screen', {
      initialRouteName: 'organization_detail',
      data: data?.organization,
      title: data?.organization?.orgName,
    });
  }

  return projectData?.data?.getProject ? (
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

        <InfoCard
          title="TIME FRAME"
          subTitle={`${data?.timeFrame} Weeks`}
          styles={style.inforCardView}
        />

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
        <ParticipateContainer
          participants={participantData?.getParticipants}
          length={participantData?.getParticipants?.length}
        />

        {user?.role !== 'STAFF' && (
          <View style={style.buttonView}>
            <CustomButton
              onClick={() =>
                updateParticipants(alreadyPart ? '' : 'participate')
              }
              buttonText={
                !user
                  ? 'Login to Participate'
                  : alreadyPart
                  ? 'Unparticipate'
                  : 'Participate'
              }
            />
          </View>
        )}

        {user && user?.volunteerId === data?.createdBy && (
          <>
            <View style={style.buttonView}>
              <CustomButton buttonText="Update Project" />
            </View>
            <View style={style.buttonView}>
              <CustomButton
                buttonText={
                  data?.projectStatus === 'COMPLETED'
                    ? 'Activate Project Again'
                    : 'Mark as Completed'
                }
              />
            </View>
            <View style={style.buttonView}>
              <CustomButton buttonText="Delete Project" />
            </View>
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
  },
  postedDateStyle: {
    color: '#212529',
  },
  buttonView: {
    marginBottom: 10,
  },
});
