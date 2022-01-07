import React, {useEffect, useState} from 'react';
import {useLazyQuery} from '@apollo/client';
import {useNavigation} from '@react-navigation/native';
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {getEventDonors, getFunraisingEvent} from '../../../../graphql/queries';
import {
  InfoCard,
  RenderS3Image,
  ResponsiveText,
  CommentSection,
  CustomSpinner,
  CustomButton,
  ParticipateContainer,
} from '../../../components/common/common';
import {widthPercentageToDP as vw} from '../../../responsive/responsive';
import {
  newRenderDate,
  renderCurrencySign,
} from '../../../shared/services/helper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Progress} from 'native-base';

export default function FundraisingEventDetailScreen(props) {
  const {data} = props;
  let [getFundraisingEventByID, fundraisingEventData] =
    useLazyQuery(getFunraisingEvent);
  const [getEventDonorsByEventId, eventDonorsData] =
    useLazyQuery(getEventDonors);

  let [fundraisingEvent, setFundraisingEvent] = useState();
  let [user, setUser] = useState();
  const navigation = useNavigation();

  useEffect(() => {
    if (data) {
      AsyncStorage.getItem('volunteer').then(vol => {
        setUser(JSON.parse(vol));
      });
      getFundraisingEventByID({
        variables: {
          eventId: data?.eventId,
        },
      });
      getEventDonorsByEventId({
        variables: {eventId: data?.eventId},
        notifyOnNetworkStatusChange: true,
      });
    }
  }, [data]);

  !fundraisingEvent &&
    fundraisingEventData?.data?.getEvent &&
    setFundraisingEvent(fundraisingEventData?.data?.getEvent);

  let raisedAmount = fundraisingEvent?.raisedAmount || 0;

  function navigateTo() {
    navigation.push('detail-screen', {
      initialRouteName: 'organization_detail',
      data: fundraisingEvent?.organization,
      title: fundraisingEvent?.organization?.orgName,
    });
  }

  return fundraisingEvent ? (
    <ScrollView style={style.eventDetailScreenView}>
      <View style={style.headerView}>
        <RenderS3Image
          resizeMode="contain"
          s3Key={data && `EVENT/${data?.eventId}.webp`}
          style={style.imageStyle}
        />
        <ResponsiveText size={15} style={style.eventTitle}>
          {fundraisingEvent?.title}
        </ResponsiveText>
        <TouchableOpacity activeOpacity={0.5} onPress={navigateTo}>
          <ResponsiveText size={12} style={style.orgName}>
            {fundraisingEvent?.organization?.orgName}
          </ResponsiveText>
        </TouchableOpacity>
      </View>
      <View style={style.bodyView}>
        <ResponsiveText size={14} style={style.description}>
          {fundraisingEvent?.description}
        </ResponsiveText>

        <View>
          <ResponsiveText size={14} style={style.raisedAmount}>
            <ResponsiveText
              size={17}
              style={style.amountWithSign}>{`${renderCurrencySign(
              'eur',
            )} ${raisedAmount}`}</ResponsiveText>

            {` raised of ${renderCurrencySign('eur')} ${
              fundraisingEvent?.targetFunds
            } goal`}
          </ResponsiveText>
          <Progress
            colorScheme="orange"
            value={(raisedAmount / Number(fundraisingEvent?.targetFunds)) * 100}
            style={style.progressStyle}
          />
        </View>

        <InfoCard
          title="START DATE"
          subTitle={
            fundraisingEvent?.startDate
              ? newRenderDate(fundraisingEvent?.startDate)
              : null
          }
          styles={style.inforCardView}
        />
        <InfoCard
          title="END DATE"
          subTitle={
            fundraisingEvent?.endDate
              ? newRenderDate(fundraisingEvent?.endDate)
              : null
          }
          styles={style.inforCardView}
        />

        {user?.role !== 'STAFF' && (
          <CustomButton
            // onClick={() => {
            //   router.push({
            //      pathname: `/start-donation/${event?.eventId}`,
            //      query: {
            //        pageType: 'event',
            //        orgName: event?.organization?.orgName,
            //        orgId: event?.organization?.orgId,
            //        targetFunds: event?.targetFunds,
            //        raisedAmount: raisedAmount,
            //        donor: event?.donors?.length,
            //        days: difference,
            //      },
            //   });
            // }}
            buttonText="Donate"
          />
        )}

        <ParticipateContainer
          participants={eventDonorsData?.getDonations}
          title="DONORS"
        />
        {!fundraisingEvent || !user
          ? null
          : user?.volunteerId === fundraisingEvent?.createdBy && (
              <>
                <View style={style.buttonView}>
                  <CustomButton buttonText="Update Event" />
                </View>

                {!fundraisingEvent?.raisedAmount > 0 && (
                  <View style={style.buttonView}>
                    <CustomButton buttonText="Delete Event" />
                  </View>
                )}
              </>
            )}
        <CommentSection objId={fundraisingEvent?.eventId} objType={'EVENT'} />
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
    margin: vw(2),
  },
  orgName: {
    fontFamily: 'Montserrat-Bold',
    color: '#f06d06',
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
  raisedAmount: {
    color: '#212529',
    fontFamily: 'Montserrat-Regular',
  },
  amountWithSign: {
    color: '#212529',
    fontFamily: 'Montserrat-Bold',
  },
  progressStyle: {
    backgroundColor: '#e9ecef',
    marginBottom: vw(3),
    marginTop: vw(3),
    height: vw(1.5),
  },
  inforCardView: {
    marginBottom: 20,
  },

  buttonView: {
    marginBottom: 10,
  },
});
