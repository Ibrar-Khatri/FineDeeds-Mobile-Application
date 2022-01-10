import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {useLazyQuery} from '@apollo/client';
import {CardTitle} from '../index';
import {
  FlatListComponent,
  CustomSpinner,
  ContributorCard,
} from '../../../../../components/index';
import {getContributors} from '../../../../../../graphql/queries';

export default function FeaturedContributors() {
  let [getCont, contributorData] = useLazyQuery(getContributors);
  let [contributors, setContributors] = useState();

  useEffect(() => {
    getCont({
      variables: {activeContributor: true, limit: 3},
    });
  }, []);

  !contributors &&
    contributorData?.data?.getContributors?.items &&
    setContributors(contributorData?.data?.getContributors?.items.slice(0, 3));

  return (
    <View style={style.mainView}>
      <CardTitle
        subTitle="Featured contributors"
        showLink={true}
        headerTitle="Contributors"
        screenName="listAll-screen"
        initialRouteName="contributor_list"
      />
      <FlatListComponent
        data={contributors}
        horizontal={true}
        showsHorizontalScrollIndicator={true}
        ListEmptyComponent={<CustomSpinner size="lg" color="#f06d06" />}
        renderItem={({item, i}) => <ContributorCard key={i} data={item} />}
      />
    </View>
  );
}
const style = StyleSheet.create({
  mainView: {
    marginBottom: 20,
  },
});
