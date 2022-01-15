import React, {useEffect, useState} from 'react';
import {useLazyQuery, useMutation} from '@apollo/client';
import {getParticipants} from '../../../../graphql/queries';
import {useToast} from 'native-base';
import {ScrollView, StyleSheet, View} from 'react-native';
import {
  CustomSpinner,
  CustomToast,
  DeleteConfirmationModal,
  EmptyDataComponent,
  RequestCard,
} from '../../../components';
import {deleteParticipant} from '../../../../graphql/mutations';
import {widthPercentageToDP as vw} from '../../../responsive/responsive';

export default function DeclineScreen(props) {
  const {objId, objType} = props;

  let [modal, setModal] = useState(false);
  let [isLoading, setIsLoading] = useState(false);
  let [volunteerId, setVolunteerId] = useState('');
  let [participants, setParticipants] = useState(null);
  let toast = useToast();
  const [deleteParticipantReq, {loading: deleteLoading}] =
    useMutation(deleteParticipant);
  const [getParticipantsQuery, {data, error, loading}] = useLazyQuery(
    getParticipants,
    {
      fetchPolicy: 'network-only',
    },
  );
  
  !participants &&
    data?.getParticipants &&
    setParticipants(data?.getParticipants);
  useEffect(() => {
    if (objId && objType) {
      getParticipantsQuery({
        variables: {objId: objId, objType: objType, objStatus: 'DECLINED'},
      });
    }
  }, [objId, objType]);

  const deleteVolunteerHandler = () => {
    setIsLoading(true);
    deleteParticipantReq({
      variables: {
        input: {
          objId: objId,
          objType: objType,
          volunteerId,
        },
      },
      update: proxy => {
        try {
          const data2 = proxy.readQuery({
            query: getParticipants,
            variables: {
              objId: objId,
              objType: objType,
              objStatus: 'DECLINED',
            },
          });
          const updated = participants?.filter(
            v => v?.volunteerId !== volunteerId,
          );
          setParticipants(updated);

          proxy.writeQuery({
            query: getParticipants,
            variables: {
              objId: objId,
              objType: objType,
              objStatus: 'DECLINED',
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
        setIsLoading(!isLoading);
        renderToast('success', 'Volunteer Request Successfully Deleted');
        setModal(!modal);
      })
      .catch(err => {
        renderToast('error', err.message);
        setIsLoading(!isLoading);
        setModal(!modal);
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
      {participants ? (
        participants?.length > 0 ? (
          <ScrollView
            contentContainerStyle={style.contentContainerStyle}
            style={style.scrollView}>
            {participants?.map((item, i) => (
              <RequestCard
                key={i}
                data={item}
                removeRequest={() => setModal(true)}
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
      <DeleteConfirmationModal
        title="Delete Volunteer"
        isModalOpen={modal}
        setIsModalOpen={setModal}
        confrimDelete={deleteVolunteerHandler}
        isLoading={isLoading}
        subTitle="Are you sure you want to delete volunteer.?"
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
