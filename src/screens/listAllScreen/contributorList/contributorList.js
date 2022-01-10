import {useLazyQuery} from '@apollo/client';
import React, {useEffect, useState} from 'react';
import {Platform, RefreshControl, View} from 'react-native';
import {getContributors} from '../../../../graphql/queries';
import {
  ListAllItem,
  CustomSpinner,
  ContributorCard,
} from '../../../components/index';

export default function ContributorList() {
  let [getCont, {loading, data}] = useLazyQuery(getContributors);
  const [fetchLimit, setFetchLimit] = useState({limit: 6, skip: 0});
  const [refetchLoading, setRefetchLoading] = useState(false);
  const [moreData, setMoreData] = useState(true);
  let [contributors, setContributors] = useState([]);

  useEffect(() => {
    if (data?.getContributors?.totalCount >= 0) {
      setContributors([...contributors, ...data.getContributors.items]);
      setRefetchLoading(false);
      data?.getContributors?.totalCount < 6 && setMoreData(false);
    }
  }, [data?.getContributors]);

  useEffect(() => {
    callQuery({
      ...fetchLimit,
    });
  }, []);

  function onDataReachEnd() {
    if (moreData && !loading) {
      if (data?.getContributors?.totalCount === 6) {
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
    setContributors([]);
    setRefetchLoading(true);
    setMoreData(true);
    setFetchLimit({limit: 6, skip: 0});
    callQuery({
      limit: 6,
      skip: 0,
    });
  }

  function callQuery(fetchLim) {
    getCont({
      variables: {
        ...fetchLim,
        activeContributor: true,
      },
    });
  }

  return (
    <ListAllItem
      data={contributors}
      renderItem={({item, i}) => <ContributorCard data={item} />}
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
        contributors.length > 0 &&
        moreData && <CustomSpinner size="sm" color="#f06d06" />
      }
    />
  );
}
