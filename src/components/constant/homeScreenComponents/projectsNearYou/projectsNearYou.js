import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {CardTitle} from '../../../constant/homeScreenComponents/index';
import {
  FlatListComponent,
  CustomSpinner,
  ProjectCard,
} from '../../../common/common';
import {useLazyQuery} from '@apollo/client';
import {getProjects} from '../../../../../graphql/queries';

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
