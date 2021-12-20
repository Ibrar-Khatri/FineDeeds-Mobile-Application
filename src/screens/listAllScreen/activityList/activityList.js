import {useLazyQuery} from '@apollo/client';
import React, {useEffect, useState} from 'react';
import {Platform, RefreshControl, View} from 'react-native';
import {getActivities} from '../../../../graphql/queries';
import ActivitiesCard from '../../../components/common/cards/activitiesCard/activitiesCard';
import ListAllItem from '../../../components/common/listAllItem/listAllItem';
import CustomSpinner from '../../../components/common/spinner/spinner';

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
    if (data?.getActivities) {
      if (data?.getActivities?.totalCount > 0) {
        setActivities(data.getActivities.items);
        setRefetchLoading(false);
      } else {
        setMoreData(false);
      }
    }
  }, [data?.getActivities]);

  useEffect(() => {
    if (volunteerId) {
      getActivitiesQuery({
        variables: {
          ...fetchLimit,
          volunteerId: volunteerId,
        },
      });
    } else {
      getActivitiesQuery({
        variables: {
          ...fetchLimit,
          volunteerId: undefined,
        },
      });
    }
  }, []);

  function onDataReachEnd() {
    if (moreData && !loading) {
      setFetchLimit(prevFetchLimit => ({
        limit: prevFetchLimit.limit,
        skip: prevFetchLimit.skip + 6,
      }));
      if (volunteerId) {
        getActivitiesQuery({
          variables: {
            limit: 6,
            skip: fetchLimit.skip + 6,
            volunteerId: volunteerId,
          },
        });
      } else {
        getActivitiesQuery({
          variables: {
            limit: 6,
            skip: fetchLimit.skip + 6,
            volunteerId: undefined,
          },
        });
      }
    }
  }

  function refControl() {
    setActivities([]);
    setRefetchLoading(true);
    setMoreData(true);
    setFetchLimit({limit: 6, skip: 0});
    if (volunteerId) {
      getActivitiesQuery({
        variables: {
          limit: 6,
          skip: 0,
          volunteerId: volunteerId,
        },
      });
    } else {
      getActivitiesQuery({
        variables: {
          limit: 6,
          skip: 0,
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
