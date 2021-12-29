import {useLazyQuery} from '@apollo/client';
import React, {useEffect, useState} from 'react';
import {Platform, RefreshControl} from 'react-native';
import {getProjects} from '../../../../graphql/queries';
import {
  ListAllItem,
  CustomSpinner,
  ProjectCard,
} from '../../../components/common/common';

export default function ProjectList(props) {
  const [getProjectsQuery, {loading, data}] = useLazyQuery(getProjects, {
    fetchPolicy: 'network-only',
  });
  const [fetchLimit, setFetchLimit] = useState({limit: 6, skip: 0});
  const [refetchLoading, setRefetchLoading] = useState(false);
  const [moreData, setMoreData] = useState(true);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    if (data?.getProjects?.totalCount > 0) {
      setProjects(data?.getProjects?.items);
      setRefetchLoading(false);
      data?.getProjects?.totalCount < 6 && setMoreData(false);
    }
  }, [data?.getProjects]);

  useEffect(() => {
    callQuery({
      ...fetchLimit,
    });
  }, []);

  function onDataReachEnd() {
    if (moreData && !loading) {
      if (data?.getProjects?.totalCount === 6) {
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
    setProjects([]);
    setRefetchLoading(true);
    setMoreData(true);
    setFetchLimit({limit: 6, skip: 0});
    callQuery({
      limit: 6,
      skip: 0,
    });
  }

  function callQuery(fetchLim) {
    getProjectsQuery();
    //     {
    //   variables: {
    //     ...fetchLim,
    //   },
    // }
  }

  return (
    <ListAllItem
      data={projects}
      renderItem={({item, i}) => <ProjectCard data={item} />}
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
        projects.length > 0 &&
        moreData && <CustomSpinner size="sm" color="#f06d06" />
      }
    />
  );
}
