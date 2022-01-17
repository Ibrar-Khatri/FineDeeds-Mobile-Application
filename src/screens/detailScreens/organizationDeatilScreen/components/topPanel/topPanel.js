import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import DropShadow from 'react-native-drop-shadow';
import {
  widthPercentageToDP as vw,
  heightPercentageToDP as vh,
  normalize,
} from '../../../../../responsive/responsive';
import {
  AcceptModal,
  CustomButton,
  CustomToast,
  RenderS3Image,
} from '../../../../../components/index';
import Location from './location/location';
import {useToast} from 'native-base';
import {useLazyQuery, useMutation} from '@apollo/client';
import {
  removeVolunteerFromOrg,
  sendJoinOrgRequest,
} from '../../../../../../graphql/mutations';
import {checkOrgJoinStatus} from '../../../../../../graphql/queries';

export default function TopPanel(props) {
  const {org, user} = props;
  const [modal, setModal] = useState(false);
  const toast = useToast();
  const [sendJoinOrgReq, {loading: sendJoinOrgReqLoading}] =
    useMutation(sendJoinOrgRequest);
  const [removeVolunteer, {loading: removeVolunteerLoading}] = useMutation(
    removeVolunteerFromOrg,
  );
  const [getRequest, {data, error}] = useLazyQuery(checkOrgJoinStatus, {
    fetchPolicy: 'network-only',
  });

  useEffect(() => {
    org &&
      user &&
      getRequest({
        variables: {volunteerId: user?.volunteerId, orgId: org?.orgId},
      });
  }, [org, user]);

  const joinOrg = () => {
    if (user) {
      let {volunteerId} = user;
      sendJoinOrgReq({
        variables: {
          input: {
            volunteerId,
            orgId: org?.orgId,
          },
        },
        // refetchQueries: [
        //   {
        //     query: checkOrgJoinStatus,
        //     variables: {volunteerId: user?.volunteerId, orgId: orgId},
        //   },
        //   {
        //     query: getOrgVolunteers,
        //     variables: {orgId, status: 'ACCEPTED'},
        //   },
        // ],
      })
        .then(() => {
          renderToast('success', "Request on it's way!");
          // router.push('/next-step');
        })
        .catch(err =>
          renderToast('error', err.message.replace('GraphQL error: ', '')),
        );
    } else {
      renderToast('warning', 'Please Signin for join organization');
    }
  };

  const unJoinOrg = () => {
    let {volunteerId} = user;

    removeVolunteer({
      variables: {
        input: {
          volunteerId: volunteerId,
          orgId: org?.orgId,
          status: 'ACCEPTED',
        },
      },
    })
      .then(() => {
        setModal(!modal);
        renderToast('success', 'You left this organization successfully!');
        getRequest({
          variables: {volunteerId: user?.volunteerId, orgId: org?.orgId},
        });
      })
      .catch(err => {
        setModal(!modal);
        renderToast('error', err.message.replace('GraphQL error: ', ''));
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
    <DropShadow style={style.dropShadow}>
      <View style={style.headerViewInsideDropShadow}>
        <RenderS3Image
          resizeMode="cover"
          s3Key={org && `ORGANIZATION/IMAGE/${org?.orgId}.webp`}
          style={style.orgImage}>
          {user?.role === 'STAFF' ? null : (
            <View style={style.orgButtonView}>
              <CustomButton
                isLoading={sendJoinOrgReqLoading}
                onClick={
                  data?.checkOrgJoinStatus?.status === 'ACCEPTED'
                    ? () => setModal(true)
                    : () => joinOrg()
                }
                // loader={loading}
                // disabled={
                //   org?.checkOrgJoinStatus?.status === 'PENDING' ||
                //   org?.checkOrgJoinStatus?.status === 'DECLINED'
                // }

                buttonText={
                  !user
                    ? 'Join'
                    : data?.checkOrgJoinStatus?.status === 'ACCEPTED'
                    ? 'UnJoin'
                    : 'Join'
                  // !user
                  //   ? 'Join'
                  //   : org?.checkOrgJoinStatus?.status === 'NO_REQUEST'
                  //   ? 'Join'
                  //   : org?.checkOrgJoinStatus?.status === 'PENDING'
                  //   ? 'Request Pending'
                  //   : org?.checkOrgJoinStatus?.status === 'DECLINED'
                  //   ? 'Request Declined'
                  //   : 'UnJoin'
                }
              />
            </View>
          )}
        </RenderS3Image>
        <Location orgId={org?.orgId} />
      </View>
      <AcceptModal
        title="Confirmation"
        isModalOpen={modal}
        setIsModalOpen={setModal}
        confrimed={unJoinOrg}
        isLoading={removeVolunteerLoading}
        subTitle="We are sorry to part ways with you, are you sure you want to leave the organisation?"
      />
    </DropShadow>
  );
}

let style = StyleSheet.create({
  activityDetailScreenView: {
    backgroundColor: '#fff',
  },
  orgImage: {
    height: vw(50),
    width: '100%',
  },
  dropShadow: {
    margin: vw(3),
    shadowColor: '#818181',
    shadowOpacity: 1,
    shadowRadius: 4,
    shadowOffset: {
      height: 0,
      width: 0,
    },
    elevation: 1,
  },
  headerViewInsideDropShadow: {
    padding: vw(3),
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  orgButtonView: {
    alignSelf: 'flex-end',
    marginTop: vw(35),
    marginRight: vw(3),
    width: vw(25),
    backgroundColor: 'white',
    borderRadius: 7,
  },
});
