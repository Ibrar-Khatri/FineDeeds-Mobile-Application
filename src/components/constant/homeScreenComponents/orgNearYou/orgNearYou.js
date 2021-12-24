import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {CardTitle} from '../../../constant/homeScreenComponents/index';
import {
  FlatListComponent,
  CustomSpinner,
  OrganizationCard,
} from '../../../common/common';
import {useLazyQuery} from '@apollo/client';
import {getOrganizations} from '../../../../../graphql/queries';

export default function OrganizationNearYou() {
  let [getOrg, organizationData] = useLazyQuery(getOrganizations);
  let [organization, setOrganization] = useState();

  useEffect(() => {
    getOrg({
      variables: {limit: 3},
    });
  }, []);

  !organization &&
    organizationData?.data?.getOrganizations?.items &&
    setOrganization(
      organizationData?.data?.getOrganizations?.items.slice(0, 3),
    );
  return (
    <View style={style.mainView}>
      <CardTitle
        title="ORGANIZATIONS NEAR YOU"
        subTitle="HELP THEM NOW"
        showLink={true}
        headerTitle="Stories"
        screenName="listAll-screen"
        initialRouteName="story_list"
      />
      <FlatListComponent
        data={organization}
        horizontal={true}
        showsHorizontalScrollIndicator={true}
        ListEmptyComponent={<CustomSpinner size="lg" color="#f06d06" />}
        renderItem={({item, i}) => <OrganizationCard key={i} data={item} />}
      />
    </View>
  );
}
const style = StyleSheet.create({
  mainView: {
    marginBottom: 20,
  },
});
