import React, {useEffect, useState} from 'react';
import {useLazyQuery, useMutation} from '@apollo/client';
import Icon from 'react-native-vector-icons/AntDesign';
import {changeParticipateStatus} from '../../../../graphql/mutations';
import {getParticipants} from '../../../../graphql/queries';
import {TouchableOpacity, View} from 'react-native';
import {ResponsiveText} from '../..';
import {
  normalize,
  widthPercentageToDP as vw,
} from '../../../responsive/responsive';
import {StyleSheet} from 'react-native';
import Requestmodal from '../requestmodal/requestmodal';

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

  // const declineRequestHandler = values => {
  //   setDeclineLoading(true);
  //   requestHandler({
  //     variables: {
  //       input: {
  //         objId: objId,
  //         objType: objType,
  //         objStatus: 'DECLINED',
  //         volunteerId,
  //         updatedBy: user && user?.volunteerId,
  //         reason: values.note,
  //       },
  //     },
  //     update: proxy => {
  //       try {
  //         const data2 = proxy.readQuery({
  //           query: getParticipants,
  //           variables: {
  //             objId: objId,
  //             objType: objType,
  //             objStatus: 'PENDING',
  //           },
  //         });
  //         // console.log("data2", data2);
  //         const updated = data2?.getParticipants?.filter(
  //           v => v?.volunteerId !== volunteerId,
  //         );

  //         proxy.writeQuery({
  //           query: getParticipants,
  //           variables: {
  //             objId: objId,
  //             objType: objType,
  //             objStatus: 'PENDING',
  //           },
  //           data: {
  //             getParticipants: updated,
  //           },
  //         });
  //       } catch (error) {
  //         console.log(error, '=== error ==');
  //       }
  //     },
  //     // refetchQueries: [
  //     //   {
  //     //     query: getParticipants,
  //     //     variables: { objId: objId, objType: objType, objStatus: "PENDING" },
  //     //   },
  //     // ],
  //   })
  //     .then(() => {
  //       toast.success('Volunteer Request has been Declined Successfully');
  //       setDeclineModal(!declineModal);
  //       setDeclineLoading(false);
  //     })
  //     .catch(err => {
  //       toast.error(err.message);
  //       setDeclineLoading(false);
  //       setDeclineModal(!declineModal);
  //     });
  // };

  // const acceptRequestHandler = () => {
  //   setAcceptLoading(true);
  //   requestHandler({
  //     variables: {
  //       input: {
  //         objId: objId,
  //         objType: objType,
  //         objStatus: 'ACCEPTED',
  //         volunteerId,
  //         updatedBy: user && user?.volunteerId,
  //       },
  //     },
  //     update: proxy => {
  //       try {
  //         const data2 = proxy.readQuery({
  //           query: getParticipants,
  //           variables: {
  //             objId: objId,
  //             objType: objType,
  //             objStatus: 'PENDING',
  //           },
  //         });
  //         // console.log("data2", data2);
  //         const updated = data2?.getParticipants?.filter(
  //           v => v?.volunteerId !== volunteerId,
  //         );

  //         proxy.writeQuery({
  //           query: getParticipants,
  //           variables: {
  //             objId: objId,
  //             objType: objType,
  //             objStatus: 'PENDING',
  //           },
  //           data: {
  //             getParticipants: updated,
  //           },
  //         });
  //       } catch (error) {
  //         console.log(error, '=== error ==');
  //       }
  //     },
  //     // refetchQueries: [
  //     //   {
  //     //     query: getParticipants,
  //     //     variables: { objId: objId, objType: objType, objStatus: "PENDING" },
  //     //   },
  //     // ],
  //   })
  //     .then(() => {
  //       toast.success('Volunteer Request has been Accepted Successfully');
  //       setModal(!modal);
  //       setAcceptLoading(false);
  //     })
  //     .catch(err => {
  //       toast.error(err.message);
  //       setAcceptLoading(false);
  //       setModal(!modal);
  //     });
  // };

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
      <Requestmodal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        title="Joining Request"
        participants={data?.getParticipants}
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
});
