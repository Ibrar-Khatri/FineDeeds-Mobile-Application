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
import {getProject, getVolunteerById} from '../../../../graphql/queries';
import {
  InfoCard,
  RenderS3Image,
  ResponsiveText,
  CustomButton,
  CommentSection,
  CustomSpinner,
} from '../../../components/common/common';
import {
  heightPercentageToDP as vh,
  widthPercentageToDP as vw,
} from '../../../responsive/responsive';
import {
  newRenderDate,
  renderEndTime,
  renderTime,
} from '../../../shared/services/helper';
import {isLoggedIn} from '../../../shared/services/authServices';
import Tag from '../../../components/common/tag/tag';

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
    }
  }, [data]);

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
        <ResponsiveText size={12} style={style.detail}>
          {data?.projectShortDescription}
        </ResponsiveText>
        <ResponsiveText size={15} style={style.detailTitle}>
          What is Nedded
        </ResponsiveText>
        <ResponsiveText size={12} style={style.detail}>
          {data?.whatIsNeeded}
        </ResponsiveText>
        <ResponsiveText size={15} style={style.detailTitle}>
          Impact of your help
        </ResponsiveText>
        <ResponsiveText size={12} style={style.detail}>
          {data?.impactOfYourHelp}
        </ResponsiveText>
        <ResponsiveText size={15} style={style.detailTitle}>
          What we have in place
        </ResponsiveText>
        <ResponsiveText size={12} style={style.detail}>
          {data?.whatWeHaveInPlace}
        </ResponsiveText>
        <ResponsiveText size={16} style={style.expStyle}>
          Experince
        </ResponsiveText>
        <ResponsiveText size={12} style={style.detail}>
          {data?.experience ? data?.experience : 'No'}
        </ResponsiveText>

        <View style={style.logoAndName}>
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
        </View>

        <InfoCard
          title="TIME FRAME"
          subTitle={`${data?.timeFrame} Weeks`}
          styles={style.inforCardView}
        />

        <View>
          <ResponsiveText style={style.typeTitle} size={14}>
            Causes
          </ResponsiveText>
          <View style={style.skillsAndCausesView}>
            {data?.organization?.areaOfWorking?.map((cause, i) => {
              return <Tag key={i} bgColor="#ffe8ca" text={cause} />;
            })}
          </View>
        </View>
        <View>
          <ResponsiveText style={style.typeTitle} size={14}>
            Skills
          </ResponsiveText>
          <View style={style.skillsAndCausesView}>
            {data?.skills?.map((cause, i) => {
              return <Tag key={i} bgColor="#ffe8ca" text={cause} />;
            })}
          </View>
        </View>
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
  detailTitle: {
    fontFamily: 'Montserrat-Regular',
    color: 'rgba(0,0,0,.7)',
    fontWeight: 'bold',
    marginBottom: vw(2),
  },
  detail: {
    fontFamily: 'Montserrat-Regular',
    color: 'rgba(0,0,0,.7)',
    marginBottom: vw(3),
  },
  expStyle: {
    color: '#f06d06',
    fontFamily: 'Montserrat-SemiBold',
    marginBottom: vw(2),
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
  typeTitle: {
    fontFamily: 'Montserrat-Bold',
    color: '#212529',
    marginTop: vw(4),
  },
  skillsAndCausesView: {
    margin: vw(2),
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});
