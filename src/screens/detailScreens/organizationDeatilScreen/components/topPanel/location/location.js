import {useLazyQuery} from '@apollo/client';
import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import {getOrgCenters} from '../../../../../../../graphql/queries';
import {
  normalize,
} from '../../../../../../responsive/responsive';
import {ResponsiveText} from '../../../../../../components/common/common';
import CustomAccordion from './accordion/accordion';

export default function Location(props) {
  const {orgId} = props;
  const [headOffice, setHeadOffice] = useState(null);
  const [centers, setCenters] = useState([]);
  const [accordionData, setAccordionData] = useState([]);

  const [getOrgCentersQuert, {data, error, loading}] =
    useLazyQuery(getOrgCenters);

  useEffect(() => {
    if (orgId) {
      getOrgCentersQuert({variables: {orgId}});
    }
  }, [orgId]);

  useEffect(() => {
    if (!loading && data) {
      const headofAddress = data?.getOrgCenters?.find(
        center => center.objType === 'HEAD_OFFICE',
      );
      const orgCenters = data?.getOrgCenters?.filter(
        center => center.objType !== 'HEAD_OFFICE',
      );
      setHeadOffice(headofAddress);
      setCenters(orgCenters);
    }
  }, [data, loading]);

  const HeadOffice = (
    <View style={style.addressAndIconView}>
      <Icon name="location-pin" color="#f06d06" size={normalize(15)} />
      <ResponsiveText size={12} style={style.addressStyle}>
        {`Location : ${headOffice?.address}`}
      </ResponsiveText>
    </View>
  );

  const Centers = centers?.length
    ? centers?.map((center, i) => {
        return (
          <View key={i} style={style.addressAndIconView}>
            <Icon name="location-pin" color="#f06d06" size={normalize(15)} />
            <ResponsiveText size={12} style={style.addressStyle}>
              {`Location : ${center?.address}`}
            </ResponsiveText>
          </View>
        );
      })
    : null;
  useEffect(() => {
    setAccordionData([{title: 'Head Office', body: HeadOffice}]);
    if (centers.length) {
      let centersss = [{title: 'Head Office', body: HeadOffice}];
      centersss.push({title: 'Centers', body: Centers});
      setAccordionData(centersss);
    }
  }, [centers]);
  return (
    <View>
      <CustomAccordion data={accordionData} />
    </View>
  );
}

let style = StyleSheet.create({
  addressAndIconView: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',

    marginBottom: 10,
  },
  addressStyle: {
    color: '#212529',
    marginLeft: 8,
  },
});
