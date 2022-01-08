import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {useLazyQuery} from '@apollo/client';
import {
  FlatListComponent,
  CustomSpinner,
  ProjectCard,
} from '../../../../../components/common/common';
import {getProjects} from '../../../../../../graphql/queries';
import {CardTitle} from '../index';

export default function ProjectsNearYou() {
  let [getRandomProjects, projectsData] = useLazyQuery(getProjects);
  let [projects, setProjects] = useState();

  useEffect(() => {
    getRandomProjects({
      variables: {limit: 3},
    });
  }, []);

  !projects &&
    projectsData?.data?.getProjects?.items &&
    setProjects(projectsData?.data?.getProjects?.items.slice(0, 3));

  return (
    <View style={style.mainView}>
      <CardTitle
        subTitle="PROJECTS NEAR YOU"
        showLink={true}
        headerTitle="Projects"
        screenName="listAll-screen"
        initialRouteName="project_list"
      />
      <FlatListComponent
        data={projects}
        horizontal={true}
        showsHorizontalScrollIndicator={true}
        ListEmptyComponent={<CustomSpinner size="lg" color="#f06d06" />}
        renderItem={({item, i}) => <ProjectCard key={i} data={item} />}
      />
    </View>
  );
}
const style = StyleSheet.create({
  mainView: {
    marginBottom: 20,
  },
});
