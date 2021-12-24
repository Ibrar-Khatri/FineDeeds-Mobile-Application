import {useLazyQuery} from '@apollo/client';
import React, {useEffect, useState} from 'react';
import {Platform, RefreshControl, View} from 'react-native';
import {getActivities} from '../../../../graphql/queries';
import {
  ActivitiesCard,
  ListAllItem,
  CustomSpinner,
} from '../../../components/common/common';

export default function ActivityList(props) {
  const {volunteerId} = props;
  const [getActivitiesQuery, {loading, data}] = useLazyQuery(getActivities, {
    fetchPolicy: 'network-only',
  });
  const [fetchLimit, setFetchLimit] = useState({limit: 6, skip: 0});
  const [refetchLoading, setRefetchLoading] = useState(false);
  const [moreData, setMoreData] = useState(true);
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    if (data?.getActivities?.totalCount > 0) {
      setActivities(data.getActivities.items);
      setRefetchLoading(false);
      data?.getActivities?.totalCount < 6 && setMoreData(false);
    }
  }, [data?.getActivities]);

  useEffect(() => {
    callQuery({
      ...fetchLimit,
    });
  }, []);

  function onDataReachEnd() {
    if (moreData && !loading) {
      if (data?.getActivities?.totalCount === 6) {
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
    setActivities([]);
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
      getActivitiesQuery({
        variables: {
          ...fetchLim,
          volunteerId: volunteerId,
        },
      });
    } else {
      getActivitiesQuery({
        variables: {
          ...fetchLim,
          volunteerId: undefined,
        },
      });
    }
  }

  return (
    <ListAllItem
      data={activities}
      renderItem={({item, i}) => <ActivitiesCard data={item} />}
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
        activities.length > 0 &&
        moreData && <CustomSpinner size="sm" color="#f06d06" />
      }
    />
  );
}
