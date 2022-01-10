import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {TopPanel, BottomPanel} from './components/index';
import {CustomButton, CustomSpinner} from '../../../components/index';
import {useLazyQuery} from '@apollo/client';
import {getOrgById} from '../../../../graphql/queries';
import {widthPercentageToDP as vw} from '../../../responsive/responsive';

export default function OrganizationDetailScreen(props) {
  const {data} = props;
  let [user, setUser] = useState();
  let [loading, setLoading] = useState(true);
  let [getOrganizationsById, orgData] = useLazyQuery(getOrgById);

  useEffect(() => {
    AsyncStorage.getItem('volunteer').then(vol => {
      setUser(JSON.parse(vol));
      console.log('kjdsbfksjdbf');
    });
    if (data) {
      getOrganizationsById({
        variables: {
          orgId: data.orgId,
        },
      });
    }
  }, [data]);

  loading && orgData?.data?.getOrgById && setLoading(false);

  return (
    <ScrollView
      style={style.activityDetailScreenView}
      contentContainerStyle={loading && style.contentContainerStyle}>
      {loading ? (
        <CustomSpinner size="lg" color="#f06d06" />
      ) : (
        <>
          <TopPanel org={orgData?.data?.getOrgById} user={user} />
          <BottomPanel org={orgData?.data?.getOrgById} />
          {user?.role === 'STAFF' ||
          !orgData?.data?.getOrgById?.accountId ? null : (
            <View style={style.buttonView}>
              <CustomButton buttonText="Donate Now" />
            </View>
          )}
        </>
      )}
    </ScrollView>
  );
}

let style = StyleSheet.create({
  activityDetailScreenView: {
    backgroundColor: '#fff',
  },
  contentContainerStyle: {
    marginTop: 'auto',
    marginBottom: 'auto',
  },
  buttonView: {
    margin: vw(3),
  },
});
