import React, {useEffect, useState} from 'react';
import {useLazyQuery} from '@apollo/client';
import {Platform, RefreshControl} from 'react-native';
import {getOrganizations} from '../../../../graphql/queries';
import {
  ListAllItem,
  CustomSpinner,
  OrganizationCard,
} from '../../../components/index';

export default function OrganizationList(props) {
  const [getActivitiesQuery, {loading, data}] = useLazyQuery(getOrganizations, {
    fetchPolicy: 'network-only',
  });
  const [fetchLimit, setFetchLimit] = useState({limit: 6, skip: 0});
  const [refetchLoading, setRefetchLoading] = useState(false);
  const [moreData, setMoreData] = useState(true);
  const [organizations, setOrganization] = useState([]);

  useEffect(() => {
    console.log(data?.getOrganizations?.totalCount);
    if (data?.getOrganizations?.totalCount >= 0) {
      setOrganization([...organizations, ...data.getOrganizations.items]);
      setRefetchLoading(false);
      data?.getOrganizations?.totalCount < 6 && setMoreData(false);
    }
  }, [data?.getOrganizations]);

  useEffect(() => {
    callQuery({
      ...fetchLimit,
    });
  }, []);

  function onDataReachEnd() {
    if (moreData && !loading) {
      if (data?.getOrganizations?.totalCount === 6) {
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
    setOrganization([]);
    setRefetchLoading(true);
    setMoreData(true);
    setFetchLimit({limit: 6, skip: 0});
    callQuery({
      limit: 6,
      skip: 0,
    });
  }

  function callQuery(fetchLim) {
    getActivitiesQuery({
      variables: {
        ...fetchLim,
      },
    });
  }

  return (
    <ListAllItem
      data={organizations}
      renderItem={({item, i}) => <OrganizationCard data={item} />}
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
        organizations?.length > 0 &&
        moreData && <CustomSpinner size="sm" color="#f06d06" />
      }
    />
  );
}
