import React, {useEffect, useState} from 'react';
import {useLazyQuery, useMutation} from '@apollo/client';
import Icon from 'react-native-vector-icons/AntDesign';
import {TouchableOpacity, View, StyleSheet, ScrollView} from 'react-native';
import {changeParticipateStatus} from '../../../../graphql/mutations';
import {getParticipants} from '../../../../graphql/queries';
import {
  AcceptModal,
  CustomToast,
  DeclineModal,
  EmptyDataComponent,
  ModalWrapper,
  ResponsiveText,
} from '../..';
import {
  normalize,
  widthPercentageToDP as vw,
} from '../../../responsive/responsive';
import RequestCard from '../requestCard/requestCard';
import {useToast} from 'native-base';

export default function Request(props) {
  const {objId, objType, user} = props;

  const [requestHandler] = useMutation(changeParticipateStatus);
  const [getParticipantsQuery, {data, error, loading}] = useLazyQuery(
    getParticipants,
    {
      fetchPolicy: 'network-only',
    },
  );
  useEffect(() => {
    objId &&
      objType &&
      getParticipantsQuery({
        variables: {objId: objId, objType: objType, objStatus: 'PENDING'},
      });
  }, [objId, objType]);

  let [isModalOpen, setIsModalOpen] = useState(false);
  let [acceptModal, setAcceptModal] = useState(false);
  let [declineModal, setDeclineModal] = useState(false);
  let [isLoading, setIsLoading] = useState(false);
  let [volunteerId, setVolunteerId] = useState('');
  let toast = useToast();

  const declineRequestHandler = values => {
    // setIsLoading(true);
    // requestHandler({
    //   variables: {
    //     input: {
    //       objId: objId,
    //       objType: objType,
    //       objStatus: 'DECLINED',
    //       volunteerId,
    //       updatedBy: user?.volunteerId,
    //       reason: values.note,
    //     },
    //   },
    //   update: proxy => {
    //     try {
    //       const data2 = proxy.readQuery({
    //         query: getParticipants,
    //         variables: {
    //           objId: objId,
    //           objType: objType,
    //           objStatus: 'PENDING',
    //         },
    //       });
    //       console.log('data2', data2);
    //       const updated = data2?.getParticipants?.filter(
    //         v => v?.volunteerId !== volunteerId,
    //       );

    //       proxy.writeQuery({
    //         query: getParticipants,
    //         variables: {
    //           objId: objId,
    //           objType: objType,
    //           objStatus: 'PENDING',
    //         },
    //         data: {
    //           getParticipants: updated,
    //         },
    //       });
    //     } catch (error) {
    //       console.log(error, '=== error ==');
    //     }
    //   },
    //   // refetchQueries: [
    //   //   {
    //   //     query: getParticipants,
    //   //     variables: { objId: objId, objType: objType, objStatus: "PENDING" },
    //   //   },
    //   // ],
    // })
    //   .then(() => {
    //     renderToast(
    //       'success',
    //       'Volunteer Request has been Declined Successfully',
    //     );
    //     setDeclineModal(!declineModal);
    //     setIsLoading(!isLoading);
    //   })
    //   .catch(err => {
    //     renderToast('error', err.message);
    //     setDeclineModal(!declineModal);
    //     setIsLoading(!isLoading);
    //   });
  };

  const acceptRequestHandler = () => {
    renderToast('success', 'Volunteer Request has been Accepted Successfully');
    // setIsLoading(true);
    // requestHandler({
    //   variables: {
    //     input: {
    //       objId: objId,
    //       objType: objType,
    //       objStatus: 'ACCEPTED',
    //       volunteerId: volunteerId,
    //       updatedBy: user?.volunteerId,
    //     },
    //   },
    //   update: proxy => {
    //     try {
    //       const data2 = proxy.readQuery({
    //         query: getParticipants,
    //         variables: {
    //           objId: objId,
    //           objType: objType,
    //           objStatus: 'PENDING',
    //         },
    //       });
    //       const updated = data2?.getParticipants?.filter(
    //         v => v?.volunteerId !== volunteerId,
    //       );

    //       proxy.writeQuery({
    //         query: getParticipants,
    //         variables: {
    //           objId: objId,
    //           objType: objType,
    //           objStatus: 'PENDING',
    //         },
    //         data: {
    //           getParticipants: updated,
    //         },
    //       });
    //     } catch (error) {
    //       console.log(error, '=== error ==');
    //     }
    //   },
    // })
    //   .then(() => {
    //     renderToast(
    //       'success',
    //       'Volunteer Request has been Accepted Successfully',
    //     );
    //     setAcceptModal(!acceptModal);
    //     setIsLoading(!isLoading);
    //   })
    //   .catch(err => {
    //     renderToast('error', err.message);
    //     setAcceptModal(!acceptModal);
    //     setIsLoading(!isLoading);
    //   });
  };

  function closeModal() {
    setIsModalOpen(false);
  }
  // function renderToast(type, description) {
  //   console.log('redner toast');
  //   toast.show({
  //     placement: 'top',
  //     duration: 3000,
  //     render: () => <CustomToast type={type} description={description} />,
  //   });
  // }

  return (
    <>
      <TouchableOpacity
        style={style.requestMainView}
        onPress={() => setIsModalOpen(!isModalOpen)}>
        <ResponsiveText size={14} style={style.requestText}>
          Joining Request
        </ResponsiveText>
        <Icon name="rightcircleo" size={normalize(18)} />
      </TouchableOpacity>
      <ModalWrapper
        hello={true}
        onBackButtonPress={closeModal}
        onBackdropPress={closeModal}
        closeModalIcon={closeModal}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        title={'Joining Request'}>
        {data?.getParticipants?.length > 0 ? (
          <ScrollView style={style.cardsViews}>
            {data?.getParticipants?.map((item, i) => (
              <RequestCard
                key={i}
                data={item}
                acceptRequest={() => {
                  setAcceptModal(true);
                }}
                removeRequest={() => setDeclineModal(true)}
                setVolunteerId={setVolunteerId}
              />
            ))}
          </ScrollView>
        ) : (
          <View style={style.emptyDataView}>
            <EmptyDataComponent title="No Requests Yet" />
          </View>
        )}

        <View style={style.cardsViews}></View>
      </ModalWrapper>
      <AcceptModal
        title="Accept Volunteer Request"
        isModalOpen={acceptModal}
        setIsModalOpen={setAcceptModal}
        confrimed={acceptRequestHandler}
        isLoading={isLoading}
        subTitle="Are you sure you want to Accept Request?"
      />
      <DeclineModal
        title="Decline Volunteer Request"
        isModalOpen={declineModal}
        setIsModalOpen={setDeclineModal}
        confrimDelete={declineRequestHandler}
        isLoading={isLoading}
        subTitle="Are you sure you want to Decline Request?"
      />
    </>
  );
}

const style = StyleSheet.create({
  requestMainView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: vw(3),
    borderRadius: 8,
    borderColor: '#eaeaea',
    borderWidth: 1,
    marginTop: vw(3),
    marginBottom: vw(3),
  },
  requestText: {
    fontFamily: 'Montserrat-Regular',
    color: '#000',
  },
  cardsViews: {
    alignSelf: 'center',
  },
  emptyDataView: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
});
