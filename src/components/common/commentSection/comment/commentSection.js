import {useLazyQuery, useMutation} from '@apollo/client';
import {useFormik} from 'formik';
import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {getComments} from '../../../../../graphql/queries';
import {addComment} from '../../../../../graphql/mutations';
import {normalize} from '../../../../responsive/responsive';
import {commentValidation} from '../../../../shared/validation/commentValidation';
import InputField from '../../inputField/inputField';
import ResponsiveText from '../../responsiveText/responsiveText';
import CommentCard from '../commentCard/commentCard';
import style from './commentSectionStyle';
import {AsyncStorage} from '@aws-amplify/core';
import CustomSpinner from '../../spinner/spinner';

export default function CommentSection(props) {
  const {placeholder, objType, objId} = props;
  let [volunteer, setVolunteer] = useState();
  let [showInvalidInput, setShowInvalidInput] = useState(false);

  const [getCommentsQuery, {data, loading, error, fetchMore}] =
    useLazyQuery(getComments);
  const [
    addCommentMutation,
    {loading: addCommentLoading, error: addCommentError},
  ] = useMutation(addComment);

  let commentsList = {comments: null, totalCount: 0, hasMore: false, skip: 0};

  if (data?.getComments) {
    const {items, limit, skip, totalCount} = data['getComments'];
    commentsList = {
      comments: [...items],
      totalCount,
      skip,
      hasMore: totalCount > limit + skip,
    };
  }
  useEffect(() => {
    AsyncStorage.getItem('volunteer').then(volun => {
      setVolunteer(JSON.parse(volun));
    });
  }, []);

  useEffect(() => {
    if (objId) {
      getCommentsQuery({
        variables: {limit: 6, skip: 0, objId},
        notifyOnNetworkStatusChange: true,
        fetchPolicy: 'cache-and-network',
      });
    }
  }, [objId]);

  const formik = useFormik({
    initialValues: {
      comment: '',
    },
    validationSchema: commentValidation,
    onSubmit: values => {
      const commentObj = {
        comment: values.comment,
        commentId: null,
        objType,
        objId,
        createdBy: {
          volunteerName: volunteer?.volunteerName,
          volunteerId: volunteer?.volunteerId,
          __typename: volunteer?.__typename,
        },
        createdAt: new Date().getTime(),
      };
      addCommentMutation({
        variables: {
          input: {
            comment: values.comment,
            objType: objType,
            objId: objId,
            createdBy: volunteer?.volunteerId,
          },
        },
        optimisticResponse: {
          __typename: 'Mutation',
          addComment: {
            ...commentObj,
            __typename: 'Comment',
          },
        },
        update: (proxy, {data: {addComment}}) => {
          try {
            // Read the data from our cache for this query.
            const data = proxy.readQuery({
              query: getComments,
              variables: {objId, limit: 6, skip: commentsList['skip']},
            });

            // Write our data back to the cache with the new comment in it
            proxy.writeQuery({
              query: getComments,
              variables: {objId, limit: 6, skip: commentsList['skip']},
              data: {
                getComments: {
                  ...data['getComments'],
                  items: [addComment, ...data['getComments']['items']],
                },
              },
            });
          } catch (error) {
            console.log(error, '=== error ==');
          }
        },
      }).then(res => {
        // console.log(res.data.addComment, 'res');
        formik.handleReset();
        setShowInvalidInput(false);
      });
    },
  });

  return (
    <View>
      <ResponsiveText style={style.commentTitle} size={14}>
        COMMENTS
      </ResponsiveText>
      {volunteer && (
        <InputField
          placeholder={placeholder}
          value={formik.values.comment}
          setValue={formik.handleChange('comment')}
          invalidInput={showInvalidInput && formik.errors.comment}
          multiline={true}
          onPress={() => {
            if (!addCommentLoading) {
              setShowInvalidInput(true);
              formik.handleSubmit();
            }
          }}
          loading={addCommentLoading}
          icon={
            <Icon name="paper-plane" color="#f06f07" size={normalize(15)} />
          }
        />
      )}

      {commentsList['comments']?.length >= 0 ? (
        commentsList['comments']?.length > 0 ? (
          commentsList['comments']?.map((item, i) => {
            const updatedItem = {...item, commentIndex: i};
            return (
              <View style={style.allCommentsView}>
                <CommentCard
                  key={Date.now()}
                  item={updatedItem}
                  objId={objId}
                  skip={commentsList['skip']}
                />
              </View>
            );
          })
        ) : (
          <ResponsiveText style={style.noCommentStyle} size={15}>
            No Comments
          </ResponsiveText>
        )
      ) : (
        <CustomSpinner size="lg" color="#f06d06" />
      )}

      {/* {!loading && !commentsList['comments'].length ? (
        <ResponsiveText style={style.noCommentStyle} size={15}>
          No Comments
        </ResponsiveText>
      ) : (
        commentsList['comments'].map((item, i) => {
          const updatedItem = {...item, commentIndex: i};
          return (
            <View style={style.allCommentsView}>
              <CommentCard
                key={i}
                item={updatedItem}
                objId={objId}
                skip={commentsList['skip']}
              />
            </View>
          );
        })
      )} */}
    </View>
  );
}
