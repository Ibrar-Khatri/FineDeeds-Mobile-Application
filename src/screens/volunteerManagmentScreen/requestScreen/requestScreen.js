import React, {useEffect, useState} from 'react';
import {useLazyQuery, useMutation} from '@apollo/client';
import {getParticipants} from '../../../../graphql/queries';
import {useToast} from 'native-base';
import {ScrollView, StyleSheet, View} from 'react-native';
import {
  AcceptModal,
  CustomSpinner,
  CustomToast,
  DeclineModal,
  EmptyDataComponent,
  RequestCard,
} from '../../../components';
import {changeParticipateStatus} from '../../../../graphql/mutations';
import {widthPercentageToDP as vw} from '../../../responsive/responsive';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function RequestScreen(props) {
  const {objId, objType} = props;

  let [user, setUser] = useState();
  let [acceptModal, setAcceptModal] = useState(false);
  let [declineModal, setDeclineModal] = useState(false);
  let [isLoading, setIsLoading] = useState(false);
  let [volunteerId, setVolunteerId] = useState('');
  let toast = useToast();
  const [requestHandler] = useMutation(changeParticipateStatus);
  const [getParticipantsQuery, {data, error, loading}] = useLazyQuery(
    getParticipants,
    {
      fetchPolicy: 'network-only',
    },
  );

  useEffect(() => {
    if (objId && objType) {
      AsyncStorage.getItem('volunteer').then(vol => {
        setUser(JSON.parse(vol));
      });
      getParticipantsQuery({
        variables: {objId: objId, objType: objType, objStatus: 'PENDING'},
      });
    }
  }, [objId, objType]);

  const declineRequestHandler = values => {
    console.log(volunteerId, 'volunteerId');
    setIsLoading(true);
    requestHandler({
      variables: {
        input: {
          objId: objId,
          objType: objType,
          objStatus: 'DECLINED',
          volunteerId,
          updatedBy: user?.volunteerId,
          reason: values.note,
        },
      },
      update: proxy => {
        try {
          const data2 = proxy.readQuery({
            query: getParticipants,
            variables: {
              objId: objId,
              objType: objType,
              objStatus: 'PENDING',
            },
          });
          console.log('data2', data2);
          const updated = data2?.getParticipants?.filter(
            v => v?.volunteerId !== volunteerId,
          );
          proxy.writeQuery({
            query: getParticipants,
            variables: {
              objId: objId,
              objType: objType,
              objStatus: 'PENDING',
            },
            data: {
              getParticipants: updated,
            },
          });
        } catch (error) {
          console.log(error, '=== error ==');
        }
      },
      // refetchQueries: [
      //   {
      //     query: getParticipants,
      //     variables: { objId: objId, objType: objType, objStatus: "PENDING" },
      //   },
      // ],
    })
      .then(() => {
        setDeclineModal(!declineModal);
        setIsLoading(!isLoading);
        renderToast(
          'success',
          'Volunteer Request has been Declined Successfully',
        );
      })
      .catch(err => {
        setDeclineModal(!declineModal);
        setIsLoading(!isLoading);
        renderToast('error', err.message);
      });
  };

  const acceptRequestHandler = () => {
    setIsLoading(true);
    requestHandler({
      variables: {
        input: {
          objId: objId,
          objType: objType,
          objStatus: 'ACCEPTED',
          volunteerId: volunteerId,
          updatedBy: user?.volunteerId,
        },
      },
      update: proxy => {
        try {
          const data2 = proxy.readQuery({
            query: getParticipants,
            variables: {
              objId: objId,
              objType: objType,
              objStatus: 'PENDING',
            },
          });

          const updated = data2?.getParticipants?.filter(
            v => v?.volunteerId !== volunteerId,
          );

          proxy.writeQuery({
            query: getParticipants,
            variables: {
              objId: objId,
              objType: objType,
              objStatus: 'PENDING',
            },
            data: {
              getParticipants: updated,
            },
          });
        } catch (error) {
          console.log(error, '=== error ==');
        }
      },
    })
      .then(() => {
        setAcceptModal(!acceptModal);
        setIsLoading(!isLoading);
        renderToast(
          'success',
          'Volunteer Request has been Accepted Successfully',
        );
      })
      .catch(err => {
        setAcceptModal(!acceptModal);
        setIsLoading(!isLoading);
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

  return (
    <>
      {data ? (
        data?.getParticipants?.length > 0 ? (
          <ScrollView
            contentContainerStyle={style.contentContainerStyle}
            style={style.scrollView}>
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
        )
      ) : (
        <View style={style.emptyDataView}>
          <CustomSpinner size="lg" color="#f06d06" />
        </View>
      )}
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
  contentContainerStyle: {
    alignItems: 'center',
  },
  scrollView: {
    backgroundColor: '#fff',
  },
  emptyDataView: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    backgroundColor: '#fff',
  },
});
