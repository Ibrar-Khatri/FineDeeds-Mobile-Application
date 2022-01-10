import React, {useEffect, useState} from 'react';
import {useLazyQuery} from '@apollo/client';
import {Platform, RefreshControl} from 'react-native';
import {getFundRaisingEvents} from '../../../../graphql/queries';
import {
  ListAllItem,
  CustomSpinner,
  EventCard,
} from '../../../components/index';

export default function FundraisingEventList() {
  const [getFundraisingEvent, {loading, data}] = useLazyQuery(
    getFundRaisingEvents,
    {
      fetchPolicy: 'network-only',
    },
  );

  const [fetchLimit, setFetchLimit] = useState({limit: 6, skip: 0});
  const [refetchLoading, setRefetchLoading] = useState(false);
  const [moreData, setMoreData] = useState(true);
  const [fundraisingEvents, setFundraisingEvents] = useState([]);

  useEffect(() => {
    if (data?.getEvents?.totalCount >= 0) {
      setFundraisingEvents([...fundraisingEvents, ...data.getEvents.items]);
      setRefetchLoading(false);
      data?.getEvents?.totalCount < 6 && setMoreData(false);
    }
  }, [data?.getEvents]);

  useEffect(() => {
    callQuery({
      ...fetchLimit,
    });
  }, []);

  function onDataReachEnd() {
    if (moreData && !loading) {
      if (data?.getEvents?.totalCount === 6) {
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
    setFundraisingEvents([]);
    setRefetchLoading(true);
    setMoreData(true);
    setFetchLimit({limit: 6, skip: 0});
    callQuery({
      limit: 6,
      skip: 0,
    });
  }

  function callQuery(fetchLim) {
    getFundraisingEvent({
      variables: {
        ...fetchLim,
        objType: 'FUND_RAISING',
      },
      notifyOnNetworkStatusChange: true,
    });
  }

  return (
    <ListAllItem
      data={fundraisingEvents}
      renderItem={({item, i}) => <EventCard data={item} />}
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
        fundraisingEvents?.length > 0 &&
        moreData && <CustomSpinner size="sm" color="#f06d06" />
      }
    />
  );
}
