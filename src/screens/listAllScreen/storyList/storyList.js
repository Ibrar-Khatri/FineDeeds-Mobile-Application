import {useLazyQuery} from '@apollo/client';
import React, {useEffect, useState} from 'react';
import {Platform, RefreshControl, View} from 'react-native';
import {
  getPublishedStories,
  getVolunteerPublishedStories,
} from '../../../../graphql/queries';
import {
  StoriesCard,
  ListAllItem,
  CustomSpinner,
} from '../../../components/common/common';

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
