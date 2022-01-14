import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {useLazyQuery} from '@apollo/client';
import {
  FlatListComponent,
  CustomSpinner,
  OrganizationCard,
} from '../../../../../components/index';
import {getOrganizations} from '../../../../../../graphql/queries';
import {CardTitle} from '../index';

export default function OrganizationNearYou() {
  let [getOrg, organizationData] = useLazyQuery(getOrganizations);
  let [organization, setOrganization] = useState();

  useEffect(() => {
    getOrg({
      variables: {limit: 3},
    });
  }, []);

  console.log(organizationData.error, 'organizationData');

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
        headerTitle="Non-Profits Near You"
        screenName="listAll-screen"
        initialRouteName="organization_list"
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
