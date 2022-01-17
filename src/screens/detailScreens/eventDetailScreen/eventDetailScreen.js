import React, {useEffect, useState} from 'react';
import {useLazyQuery, useMutation} from '@apollo/client';
import {useNavigation} from '@react-navigation/native';
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import {getEvent, getParticipants} from '../../../../graphql/queries';
import {
  InfoCard,
  RenderS3Image,
  ResponsiveText,
  CustomButton,
  CommentSection,
  CustomSpinner,
  HostCard,
  ParticipateContainer,
  VolunteerManagementNavigatorCard,
  CustomToast,
} from '../../../components/index';
import {
  heightPercentageToDP as vh,
  widthPercentageToDP as vw,
} from '../../../responsive/responsive';
import {
  newRenderDate,
  renderCurrencySign,
  renderTime,
} from '../../../shared/services/helper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import {useToast} from 'native-base';
import {
  deleteParticipant,
  sendParticipateRequest,
} from '../../../../graphql/mutations';

let screenWidth = Dimensions.get('window').width;

export default function EventDetailScreen(props) {
  const {data} = props;
  let [event, setEvent] = useState();
  let [user, setUser] = useState();
  let [participants, setParticipants] = useState(null);
  let [getEventByID, eventData] = useLazyQuery(getEvent);
  const [
    getParticipantData,
    {loading: partcipantLoading, data: participantData},
  ] = useLazyQuery(getParticipants, {fetchPolicy: 'network-only'});
  const [sendParticipateReq, {loading: requestLoading}] = useMutation(
    sendParticipateRequest,
  );
  const [deleteParticipantReq, {loading: deleteLoading}] =
    useMutation(deleteParticipant);
  let toast = useToast();

  const navigation = useNavigation();

  useEffect(() => {
    AsyncStorage.getItem('volunteer').then(vol => {
      setUser(JSON.parse(vol));
    });
    data &&
      getEventByID({
        variables: {
          eventId: data?.eventId,
        },
      });
    const unsubscribe = navigation.addListener('focus', () => {
      getParticipantData({
        variables: {
          objId: data?.eventId,
          objType: 'EVENT',
          objStatus: 'ACCEPTED',
        },
      });
    });
    return unsubscribe;
  }, [data]);

  useEffect(() => {
    participantData?.getParticipants?.length >= 0 &&
      setParticipants(participantData?.getParticipants);
  }, [participantData?.getParticipants]);

  !event && eventData?.data?.getEvent && setEvent(eventData?.data?.getEvent);

  const checkPastDate = event && moment(event?.startDate).isAfter();
  let currentDate = moment().format('YYYY-MM-DD HH:mm');
  let eventDatewithTime = moment(event?.startDate + ' ' + event?.eventTime);
  let hoursDiff = moment(eventDatewithTime).diff(moment(currentDate), 'hours');

  const _renderButtons = () => {
    if (
      user?.role === 'STAFF' &&
      user?.volunteerId === event?.createdBy &&
      checkPastDate
    ) {
      return (
        <>
          <View style={style.buttonView}>
            <CustomButton buttonText="Update Event" />
          </View>
          <View style={style.buttonView}>
            <CustomButton buttonText="Delete Event" />
          </View>
        </>
      );
    }
  };

  const checkDisabled = () => {
    const alreadyPart = participants?.find(
      parti => parti['volunteerId'] === user?.volunteerId,
    );
    if (alreadyPart)
      return {
        participated: true,
        paymentId: event?.isPaid && alreadyPart?.paymentId,
      };
    else return false;
  };

  const eventTime = event?.eventTime?.split(':');
  const addDuration = parseInt(eventTime?.[0]) + event?.duration;
  const endingTime = `${addDuration}:${eventTime?.[1]}`;
  const alreadyPart = checkDisabled();

  const participateRequest = () => {
    if (user) {
      sendParticipateReq({
        variables: {
          input: {
            objId: event?.eventId,
            volunteerId: user?.volunteerId,
            objType: 'EVENT',
            objStatus: 'PENDING',
            createdBy: user?.volunteerId,
            orgId: event?.orgId,
          },
        },
      })
        .then(() => {
          renderToast('success', "Request on it's way!");
        })
        .catch(err =>
          renderToast('error', err.message.replace('GraphQL error: ', '')),
        );
    }
  };
  const unparticipateRequest = () => {
    let variables = {
      objId: event?.eventId,
      objType: 'EVENT',
      volunteerId: user?.volunteerId,
    };

    deleteParticipantReq({
      variables: {
        input: variables,
      },
      update: (proxy, data) => {
        try {
          const filtered = participants?.filter(
            p => p?.volunteerId !== user?.volunteerId,
          );
          setParticipants(filtered);
          proxy.writeQuery({
            query: getParticipants,
            variables: {
              objId: event?.eventId,
              objType: 'EVENT',
              objStatus: 'ACCEPTED',
            },
            data: {
              getParticipants: filtered,
            },
          });
        } catch (error) {
          console.log(error, '=== error ==');
        }
      },
    })
      .then(() => {
        renderToast('success', 'You have Unparticipted Successfully.');
      })
      .catch(err => {
        renderToast('error', err.message);
      });
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

  return event && participants ? (
    <ScrollView style={style.eventDetailScreenView}>
      <View style={style.headerView}>
        <RenderS3Image
          resizeMode="contain"
          s3Key={data && `EVENT/${data?.eventId}.webp`}
          style={style.imageStyle}
        />
        <ResponsiveText size={15} style={style.eventTitle}>
          {data?.title}
        </ResponsiveText>
        {data?.isPaid && (
          <CustomButton
            buttonText={`${renderCurrencySign('eur')} ${event?.entry_fee}`}
          />
        )}
      </View>
      <View style={style.bodyView}>
        <ResponsiveText size={13} style={style.description}>
          {event?.description}
        </ResponsiveText>
        <TouchableOpacity style={style.logoAndName} onPress={navigateTo}>
          <RenderS3Image
            s3Key={
              data && `ORGANIZATION/LOGO/${event?.organization?.orgId}.webp`
            }
            style={style.orgLogo}
          />
          <ResponsiveText size={16} style={style.orgName}>
            {event?.organization?.orgName}
          </ResponsiveText>
        </TouchableOpacity>
        <View style={style.locationView}>
          <ResponsiveText size={16} style={style.locationTitle}>
            LOCATION
          </ResponsiveText>
          <View style={style.addressAndIconView}>
            <Icon name="location-pin" color="#f06d06" size={vh(3.2)} />
            <ResponsiveText size={12} style={style.address}>
              {` ${event?.address}`}
            </ResponsiveText>
          </View>
        </View>
        <InfoCard
          title="START DATE"
          subTitle={event?.startDate ? newRenderDate(event?.startDate) : null}
          styles={style.inforCardView}
        />
        <InfoCard
          title="END DATE"
          subTitle={event?.endDate ? newRenderDate(event?.endDate) : null}
          styles={style.inforCardView}
        />
        <InfoCard
          title="DURATION"
          subTitle={
            event?.eventTime
              ? `${renderTime(`${event?.eventTime}`)} - ${renderTime(
                  `${endingTime}`,
                )}`
              : 'No Duration'
          }
          styles={style.inforCardView}
        />
        <View style={style.hostView}>
          <HostCard data={event?.host} host />
          {event?.eventHosts?.map((event, i) => (
            <HostCard data={event} key={i} />
          ))}
        </View>
        {!user ? null : user?.role === 'STAFF' ? null : (
          <CustomButton
            isLoading={requestLoading || deleteLoading}
            // onClick={() =>
            //   event?.isPaid && !alreadyPart?.participated
            //     ? setPayModal(!payModal)
            //     : alreadyPart?.participated && !event?.isPaid
            //     ? UnparticipateRequest()
            //     : alreadyPart?.participated && event?.isPaid
            //     ? UnparticipateRequest(alreadyPart?.paymentId)
            //     : participateRequest()
            // }
            onClick={() =>
              !event.isPaid &&
              (alreadyPart?.participated
                ? unparticipateRequest()
                : participateRequest())
            }
            buttonText={
              requestLoading || deleteLoading
                ? 'LOADING'
                : !user
                ? 'Login to Participate'
                : alreadyPart?.participated
                ? 'Unparticipate'
                : event?.isPaid
                ? 'Pay and Register'
                : 'Participate'
            }
          />
        )}
        <ParticipateContainer
          participants={participants}
          length={participants?.length}
        />

        {event?.isPaid && hoursDiff > 24 ? _renderButtons() : _renderButtons()}

        {user?.volunteerId === event?.createdBy && (
          <>
            <VolunteerManagementNavigatorCard
              navigation={navigation}
              objId={data?.eventId}
              objType="EVENT"
              title="Joining Requests"
              screenName="request_screen"
            />
            <VolunteerManagementNavigatorCard
              navigation={navigation}
              objId={data?.eventId}
              objType="EVENT"
              title="Declined Requests"
              screenName="decline_screen"
            />
            <VolunteerManagementNavigatorCard
              navigation={navigation}
              objId={data?.eventId}
              objType="EVENT"
              title="Accepted Requests"
              screenName="volunteer_screen"
            />
          </>
        )}

        <CommentSection objId={event?.eventId} objType={'EVENT'} />
      </View>
    </ScrollView>
  ) : (
    <View style={style.spinnerView}>
      <CustomSpinner size="lg" color="#f06d06" />
    </View>
  );
}

let style = StyleSheet.create({
  eventDetailScreenView: {
    backgroundColor: '#fff',
  },
  spinnerView: {flex: 1, backgroundColor: '#fff', justifyContent: 'center'},
  headerView: {
    display: 'flex',
    alignItems: 'center',
  },
  imageStyle: {
    height: vw(55),
    width: '100%',
    borderRadius: 10,
  },
  eventTitle: {
    fontFamily: 'Montserrat-Bold',
    color: '#212529',
    padding: vw(2),
  },
  bodyView: {
    marginTop: vw(3),
    padding: vw(3),
    borderTopColor: '#eaeaea',
    borderTopWidth: 1,
  },
  description: {
    color: 'rgba(0,0,0,.7)',
    fontFamily: 'Montserrat-Regular',
    marginBottom: vw(5),
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
  orgName: {
    color: '#212529',
    fontFamily: 'Montserrat-SeimBold',
    marginLeft: 10,
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
  hostView: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  buttonView: {
    marginBottom: 10,
  },
});
