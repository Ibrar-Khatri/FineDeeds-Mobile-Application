import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {AsyncStorage} from '@aws-amplify/core';
import RenderS3Image from '../../renderS3Image/renderS3Image';
import ResponsiveText from '../../responsiveText/responsiveText';
import style from './commentCardStyle';
import {useLazyQuery, useMutation} from '@apollo/client';
import {deleteComment} from '../../../../../graphql/mutations';
import {getComments, getVolunteerById} from '../../../../../graphql/queries';
import DeleteConfirmationModal from '../../deleteConfirmationModal/deleteConfirmationModal';
import {useToast} from 'native-base';
import CustomToast from '../../customToast/customToast';
import {useNavigation} from '@react-navigation/native';

export default function CommentCard(props) {
  let [loggedInVol, setLoggedInVol] = useState();
  let [isLoading, setIsLoading] = useState(false);
  let [confirmationModal, setConfirmationModal] = useState(false);
  let [getVolunteer, volunteerData] = useLazyQuery(getVolunteerById);
  const [deleteCommentReq, {loading}] = useMutation(deleteComment);
  const {item, objId, skip} = props;
  let toast = useToast();
  let navigation = useNavigation();

  useEffect(() => {
    AsyncStorage.getItem('volunteer').then(volun => {
      setLoggedInVol(JSON.parse(volun));
    });
    if (item) {
      getVolunteer({
        variables: {volunteerId: item?.['createdBy'].volunteerId},
      });
    }
  }, []);

  const handleDeleteComement = () => {
    setIsLoading(true);
    if (loggedInVol) {
      deleteCommentReq({
        variables: {
          input: {
            commentId: item?.commentId,
            objType: item?.objType,
            volunteerId: item?.['createdBy'].volunteerId,
          },
        },
        optimisticResponse: {
          __typename: 'Mutation',
          deleteComment: true,
        },
        update: proxy => {
          try {
            // Read the data from our cache for this query.
            const data = proxy.readQuery({
              query: getComments,
              variables: {objId, limit: 6, skip},
            });

            let updatedCommentsList = [...data['getComments']['items']];
            updatedCommentsList.splice(item['commentIndex'], 1);

            // Write our data back to the cache with the new comment in it
            proxy.writeQuery({
              query: getComments,
              variables: {objId, limit: 6, skip},
              data: {
                getComments: {
                  ...data['getComments'],
                  items: updatedCommentsList,
                },
              },
            });
          } catch (error) {
            console.log(error, '=== error ==');
          }
        },
      })
        .then(({data}) => {
          console.log(data);
          toast.show({
            placement: 'top',
            duration: 2000,
            render: () => (
              <CustomToast type="success" description="Comment Deleted!" />
            ),
          });
          setConfirmationModal(false);
          setIsLoading(false);
        })
        .catch(err => {
          toast.show({
            placement: 'top',
            duration: 2000,
            render: () => (
              <CustomToast
                type="error"
                description={err.message.replace('GraphQL error: ', '')}
              />
            ),
          });
          setConfirmationModal(false);
          setIsLoading(false);
        });
    }
  };

  function removeCommentConfirmation() {
    setConfirmationModal(true);
  }

  function viewProfile() {
    if (volunteerData?.data?.getVolunteerById)
      navigation.navigate('profile-screen', {
        volunteer: volunteerData?.data?.getVolunteerById,
      });
  }

  return (
    <>
      <TouchableOpacity
        style={style.CommentCardMainView}
        activeOpacity={volunteerData?.data?.getVolunteerById ? 0.5 : 1}
        onPress={viewProfile}>
        <RenderS3Image
          s3Key={`VOLUNTEER/${item?.createdBy?.volunteerId}.webp`}
          style={style.imageStyle}
        />
        <View style={style.commentSection}>
          <View style={style.volunteerNameView}>
            <ResponsiveText size={13} style={style.volunName}>
              {item['createdBy']['volunteerName']}
            </ResponsiveText>
            <ResponsiveText size={12} style={style.since}>
              {moment(item['createdAt']).fromNow()}
            </ResponsiveText>
          </View>
          <ResponsiveText size={13} style={style.comment}>
            {item['comment']}
          </ResponsiveText>
          {loggedInVol?.volunteerId === item?.createdBy?.volunteerId && (
            <TouchableOpacity
              style={style.removeCommentView}
              onPress={removeCommentConfirmation}>
              <ResponsiveText size={13} style={style.removeComment}>
                Delete
              </ResponsiveText>
            </TouchableOpacity>
          )}
        </View>
      </TouchableOpacity>
      {confirmationModal && (
        <DeleteConfirmationModal
          isModalOpen={confirmationModal}
          setIsModalOpen={setConfirmationModal}
          confrimDelete={handleDeleteComement}
          isLoading={isLoading}
        />
      )}
    </>
  );
}
