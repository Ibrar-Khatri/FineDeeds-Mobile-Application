import {useLazyQuery} from '@apollo/client';
import React, {useEffect, useState} from 'react';
import {Platform, RefreshControl, View} from 'react-native';
import {
  getPublishedStories,
  getVolunteerPublishedStories,
} from '../../../../graphql/queries';
import StoriesCard from '../../../components/common/cards/storiesCard/storiesCard';
import ListAllItem from '../../../components/common/listAllItem/listAllItem';
import CustomSpinner from '../../../components/common/spinner/spinner';

export default function StoryList(props) {
  const {volunteerId} = props;
  const fetchQuery = volunteerId
    ? getVolunteerPublishedStories
    : getPublishedStories;

  const [getStoriesQuery, {data, loading}] = useLazyQuery(fetchQuery, {
    fetchPolicy: 'network-only',
  });

  const [fetchLimit, setFetchLimit] = useState({limit: 6, skip: 0});
  const [refetchLoading, setRefetchLoading] = useState(false);
  const [moreData, setMoreData] = useState(true);
  const [stories, setStories] = useState([]);

  useEffect(() => {
    if (data?.getStories?.totalCount > 0) {
      setStories(data.getStories?.items);
      setRefetchLoading(false);
      data?.getStories?.totalCount < 6 && setMoreData(false);
    }
  }, [data?.getStories]);

  useEffect(() => {
    callQuery({
      ...fetchLimit,
    });
  }, []);

  function onDataReachEnd() {
    if (moreData && !loading) {
      if (data?.getStories?.totalCount === 6) {
        setFetchLimit(prevFetchLimit => ({
          limit: prevFetchLimit.limit,
          skip: prevFetchLimit.skip + 6,
        }));
        callQuery({
          limit: 6,
          skip: fetchLimit.skip + 6,
        });
      } else {
        setMoreData(false);
      }
    }
  }

  function refControl() {
    setStories([]);
    setRefetchLoading(true);
    setMoreData(true);
    setFetchLimit({limit: 6, skip: 0});
    callQuery({
      limit: 6,
      skip: 0,
    });
  }

  function callQuery(fetchLim) {
    if (volunteerId) {
      getStoriesQuery({
        variables: {
          ...fetchLim,
          volunteerId: volunteerId,
        },
      });
    } else {
      getStoriesQuery({
        variables: {
          ...fetchLim,
          volunteerId: undefined,
        },
      });
    }
  }

  // useEffect(() => {
  //   if (data?.getStories) {
  //     if (data?.getStories?.totalCount > 0) {
  //       setStories(data.getStories.items);
  //       setRefetchLoading(false);
  //     } else {
  //       setMoreData(false);
  //     }
  //   }
  // }, [data?.getStories]);

  // useEffect(() => {
  //   if (volunteerId) {
  //     getStoriesQuery({
  //       variables: {
  //         ...fetchLimit,
  //         volunteerId: volunteerId,
  //       },
  //     });
  //   } else {
  //     getStoriesQuery({
  //       variables: {
  //         ...fetchLimit,
  //         volunteerId: undefined,
  //       },
  //     });
  //   }
  // }, []);

  // function onDataReachEnd() {
  //   if (moreData) {
  //     setFetchLimit(prevFetchLimit => ({
  //       limit: prevFetchLimit.limit,
  //       skip: prevFetchLimit.skip + 6,
  //     }));
  //     if (volunteerId) {
  //       getStoriesQuery({
  //         variables: {
  //           limit: 6,
  //           skip: fetchLimit.skip + 6,
  //           volunteerId: volunteerId,
  //         },
  //       });
  //     } else {
  //       getStoriesQuery({
  //         variables: {
  //           limit: 6,
  //           skip: fetchLimit.skip + 6,
  //           volunteerId: undefined,
  //         },
  //       });
  //     }
  //   }
  // }

  // function refControl() {
  //   setStories([]);
  //   setRefetchLoading(true);
  //   setMoreData(true);
  //   setFetchLimit({limit: 6, skip: 0});
  //   if (volunteerId) {
  //     getStoriesQuery({
  //       variables: {
  //         ...fetchLimit,
  //         volunteerId: volunteerId,
  //       },
  //     });
  //   } else {
  //     getStoriesQuery({
  //       variables: {
  //         limit: 6,
  //         skip: 0,
  //         volunteerId: undefined,
  //       },
  //     });
  //   }
  // }
  return (
    <ListAllItem
      data={stories}
      renderItem={({item, i}) => <StoriesCard data={item} />}
      refreshControl={
        <RefreshControl
          colors={Platform.OS === 'android' && ['#f06d06']}
          refreshing={refetchLoading}
          onRefresh={refControl}
        />
      }
      onEndReached={!loading && onDataReachEnd}
      ListEmptyComponent={
        !refetchLoading && <CustomSpinner size="lg" color="#f06d06" />
      }
      ListFooterComponent={
        stories.length > 0 &&
        moreData && <CustomSpinner size="sm" color="#f06d06" />
      }
    />
  );
}
