import React, {useEffect, useState} from 'react';
import {useLazyQuery, useMutation} from '@apollo/client';
import {useNavigation} from '@react-navigation/native';
import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import {getParticipants, getVolunteerById} from '../../../../graphql/queries';
import {
  InfoCard,
  RenderS3Image,
  ResponsiveText,
  CustomButton,
  CommentSection,
  CustomSpinner,
  Tag,
  ParticipateContainer,
  CustomToast,
} from '../../../components/index';
import {
  heightPercentageToDP as vh,
  widthPercentageToDP as vw,
} from '../../../responsive/responsive';
import {
  newRenderDate,
  renderEndTime,
  renderTime,
} from '../../../shared/services/helper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  deleteParticipant,
  sendParticipateRequest,
} from '../../../../graphql/mutations';
import {useToast} from 'native-base';

export default function ActivityDetailScreen(props) {
  const {data} = props;

  let [user, setUser] = useState();
  let [participant, setParticipant] = useState(null);
  let navigation = useNavigation();
  let [getVolunteer, volunteerData] = useLazyQuery(getVolunteerById);
  const [getPartQuery, participantData] = useLazyQuery(getParticipants, {
    fetchPolicy: 'network-only',
  });
  const [sendParticipateReq, {loading: participantLaoding}] = useMutation(
    sendParticipateRequest,
  );
  const [deleteParticipantReq, {loading: deleteParticipantLoading}] =
    useMutation(deleteParticipant);
  let toast = useToast();

  useEffect(() => {
    if (data?.createdBy) {
      getVolunteer({
        variables: {volunteerId: data?.createdBy},
      });
      getPartQuery({
        variables: {
          objId: data?.activityId,
          objType: 'ACTIVITY',
          objStatus: 'ACCEPTED',
        },
      });
    }
    AsyncStorage.getItem('volunteer').then(u => {
      setUser(JSON.parse(u));
    });
  }, []);
  useEffect(() => {
    if (participantData?.data?.getParticipants) {
      setParticipant(participantData?.data?.getParticipants);
    }
  }, [participantData?.data]);

  const checkDisabled = () => {
    const alreadyPart = participant?.find(
      participant => participant['volunteerId'] === user?.volunteerId,
    );
    if (alreadyPart) return true;
    else return false;
  };
  const alreadyPart = checkDisabled();

  const updateParticipants = type => {
    if (user) {
      if (type === 'participate') {
        sendParticipateReq({
          variables: {
            input: {
              objId: data?.activityId,
              volunteerId: user?.volunteerId,
              objType: 'ACTIVITY',
              objStatus: 'ACCEPTED',
              createdBy: user?.volunteerId,
            },
          },
          update: (proxy, data) => {
            try {
              let updated = [
                ...participant,
                data?.data?.sendParticipateRequest,
              ];
              proxy.writeQuery({
                query: getParticipants,
                variables: {
                  objId: data?.activityId,
                  objType: 'ACTIVITY',
                  objStatus: 'ACCEPTED',
                },
                data: {
                  getParticipants: updated,
                },
              });
              setParticipant(updated);
            } catch (error) {
              console.log(error, '=== error ==');
            }
          },
        })
          .then(() => {
            renderToast('success', 'You have participated Successfully!');
          })
          .catch(err => renderToast('error', err.message));
      } else {
        deleteParticipantReq({
          variables: {
            input: {
              objId: data?.activityId,
              objType: 'ACTIVITY',
              volunteerId: user?.volunteerId,
            },
          },
          update: proxy => {
            try {
              const filtered = participant?.filter(
                p => p?.volunteerId !== user?.volunteerId,
              );
              proxy.writeQuery({
                query: getParticipants,
                variables: {
                  objId: data?.activityId,
                  objType: 'ACTIVITY',
                  objStatus: 'ACCEPTED',
                },
                data: {
                  getParticipants: filtered,
                },
              });
              setParticipant(filtered);
            } catch (error) {
              renderToast('error', error.message);
            }
          },
        })
          .then(() => {
            renderToast('success', 'You have Unparticipted Successfully!');
          })
          .catch(err => {
            renderToast('error', 'You have Unparticipted Successfully!');
          });
      }
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
  function viewProfile() {
    navigation.push('drawer', {
      screen: 'profile-screen',
      params: {volunteer: volunteerData?.data?.getVolunteerById},
    });
  }

  return volunteerData?.data?.getVolunteerById && participant ? (
    <ScrollView style={style.activityDetailScreenView}>
      <RenderS3Image
        resizeMode="contain"
        s3Key={data?.activityId && `ACTIVITY/${data?.activityId}.webp`}
        style={style.imageStyle}
      />
      <ResponsiveText style={style.descriptionTitle} size={18}>
        Description
      </ResponsiveText>
      <View style={style.activityBodyView}>
        <ResponsiveText style={style.descriptionStyle} size={12}>
          {data?.activityDescription}
        </ResponsiveText>
        <View style={style.locationView}>
          <ResponsiveText size={16} style={style.locationTitle}>
            LOCATION
          </ResponsiveText>
          <View style={style.addressAndIconView}>
            <Icon name="location-pin" color="#f06d06" size={vh(3.2)} />
            <ResponsiveText size={12} style={style.address}>
              {` ${data?.activityAddress}`}
            </ResponsiveText>
          </View>
        </View>
        <InfoCard
          title="START DATE"
          subTitle={data?.startDate ? newRenderDate(data?.startDate) : null}
          styles={style.inforCardView}
        />
        <InfoCard
          title="END DATE"
          subTitle={data?.endDate ? newRenderDate(data?.endDate) : null}
          styles={style.inforCardView}
        />
        <InfoCard
          title="DURATION"
          subTitle={
            data?.startTime
              ? `${renderTime(data.startTime)} ${
                  data?.duration
                    ? renderEndTime(data.startTime, data.duration)
                    : ''
                }`
              : 'No Duration'
          }
          styles={style.inforCardView}
        />

        <TouchableOpacity
          style={style.profileView}
          activeOpacity={0.5}
          onPress={viewProfile}>
          <View style={style.profileImageView}>
            <RenderS3Image
              s3Key={`VOLUNTEER/${data?.createdBy}.webp`}
              style={style.profileImage}
            />
          </View>
          <View style={style.volunteerNameView}>
            <ResponsiveText size={13} style={style.volunteerName}>
              {volunteerData?.data?.getVolunteerById?.volunteerName}
            </ResponsiveText>
            <ResponsiveText size={12} style={style.volunteerHost}>
              Activity
            </ResponsiveText>
          </View>
        </TouchableOpacity>
        {user?.volunteerId !== data?.createdBy && (
          <CustomButton
            isLoading={participantLaoding || deleteParticipantLoading}
            onClick={() => updateParticipants(alreadyPart ? '' : 'participate')}
            buttonText={
              participantLaoding || deleteParticipantLoading
                ? 'LOADING'
                : !user
                ? 'Login to Participate'
                : alreadyPart
                ? 'Unparticipate'
                : 'Participate'
            }
          />
        )}

        <ParticipateContainer participants={participant} />

        {!data
          ? null
          : user?.volunteerId === data?.createdBy && (
              <>
                <CustomButton
                  buttonText="Update Activity"
                  style={style.buttonView}
                />
                <CustomButton
                  buttonText="Delete Activity"
                  style={style.buttonView}
                />
              </>
            )}

        <View>
          <ResponsiveText style={style.causesTitle} size={13}>
            CAUSES
          </ResponsiveText>
          <View style={style.causesItemView}>
            {data?.activityCauses?.map((item, i) => (
              <Tag key={i} bgColor="#ffe8ca" text={item} />
            ))}
          </View>
        </View>
        <CommentSection objType="ACTIVITY" objId={data?.activityId} />
      </View>
    </ScrollView>
  ) : (
    <CustomSpinner size="lg" color="#f06d06" center={true} />
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
  activityBodyView: {
    padding: 15,
    borderTopColor: '#ebebeb',
    borderTopWidth: 2,
    width: '100%',
  },
  descriptionStyle: {
    fontFamily: 'Montserrat-Regular',
    color: 'rgba(0,0,0,.7)',
    marginBottom: 15,
  },
  locationView: {
    backgroundColor: '#ffefe2',
    padding: vw(3),
    borderRadius: 10,
    marginBottom: 15,
  },
  locationTitle: {
    fontFamily: 'Montserrat-Bold',
    color: '#f06d06',
  },
  address: {
    color: '#212529',
    textAlign: 'center',
  },
  addressAndIconView: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  inforCardView: {
    marginBottom: 20,
  },
  profileView: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  profileImageView: {
    borderColor: '#f06d06',
    borderWidth: 3,
    height: vw(16),
    width: vw(16),
    borderRadius: 100,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImage: {
    height: vw(15),
    width: vw(15),
    borderRadius: 100,
    overflow: 'hidden',
  },
  volunteerNameView: {
    marginLeft: 15,
  },
  volunteerName: {
    fontFamily: 'Montserrat-SemiBold',
    color: '#212529',
  },
  volunteerHost: {
    fontFamily: 'Montserrat-Regular',
    color: '#888',
  },
  buttonView: {
    marginBottom: vw(2),
  },
  causesTitle: {
    fontFamily: 'Montserrat-Bold',
    color: '#212529',
  },
  causesItemView: {
    marginTop: 15,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '85%',
    alignSelf: 'center',
    justifyContent: 'center',
  },
});
