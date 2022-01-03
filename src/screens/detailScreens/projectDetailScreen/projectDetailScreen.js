import React, {useEffect, useState} from 'react';
import {useLazyQuery} from '@apollo/client';
import {useNavigation} from '@react-navigation/native';
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import {
  getParticipants,
  getProject,
  getVolunteerById,
} from '../../../../graphql/queries';
import {
  InfoCard,
  RenderS3Image,
  ResponsiveText,
} from '../../../components/common/common';
import {
  heightPercentageToDP as vh,
  widthPercentageToDP as vw,
  normalize,
} from '../../../responsive/responsive';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {
  newRenderDate,
} from '../../../shared/services/helper';
import {isLoggedIn} from '../../../shared/services/authServices';
import Tag from '../../../components/common/tag/tag';
import {
  DescriptionCard,
  ParticipateCard,
  TagView,
} from '../../../components/constant/projectDetailScreenComponent/index';

let screenWidth = Dimensions.get('window').width;

export default function ProjectDetailScreen(props) {
  const {data} = props;
  let [getVolunteer, volunteerData] = useLazyQuery(getVolunteerById);
  let [getProjectById, projectData] = useLazyQuery(getProject);
  let [isUserAuthenticated, setIsUserAuthenticated] = useState(false);
  let navigation = useNavigation();

  //   useEffect(() => {
  //     if (data?.createdBy) {
  //       getVolunteer({
  //         variables: {volunteerId: data?.createdBy},
  //       });
  //     }
  //     isLoggedIn()
  //       .then(res => {
  //         setIsUserAuthenticated(true);
  //       })
  //       .catch(err => {
  //         setIsUserAuthenticated(false);
  //       });
  //   }, []);

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

  const [
    getParticipantData,
    {loading: partcipantLoading, data: participantData},
  ] = useLazyQuery(getParticipants);

  function viewProfile() {
    navigation.push('drawer', {
      screen: 'profile-screen',
      params: {volunteer: volunteerData?.data?.getVolunteerById},
    });
  }

  return (
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

        <TouchableOpacity style={style.logoAndName}>
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
        <ParticipateCard
          noOfParticipants={projectData?.data?.getProject?.noOfParticipants}
          participants={participantData?.getParticipants}
        />
      </View>
    </ScrollView>
  );
}

let style = StyleSheet.create({
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
    marginBottom: vw(5),
  },
  postedDateStyle: {
    color: '#212529',
  },
});
