import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import Octicons from 'react-native-vector-icons/Octicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {
  normalize,
  widthPercentageToDP as vw,
} from '../../../../../responsive/responsive';
import ResponsiveText from '../../../../common/responsiveText/responsiveText';

export default function ProExperinceCard(props) {
  const {
    data,
    setConfirmationModal,
    setProExperienceId,
    setIsModalOpen,
    formik,
    setShowInvalidInput,
    authorized,
  } = props;

  function updateExp() {
    setIsModalOpen(true);
    setShowInvalidInput(false);
    setProExperienceId(data.proExpid);
    formik.setFieldValue('jobTitle', data.jobTitle);
    formik.setFieldValue('orgName', data.orgName);
    formik.setFieldValue('fromDate', data.fromDate);
    formik.setFieldValue('endDate', data.endDate);
    formik.setFieldValue('isCurrent', data.isCurrent);
    formik.setFieldValue('description', data.description);
  }
  return (
    <View style={style.volunteerExpView}>
      <View style={style.volunteerExpDetView}>
        <ResponsiveText style={style.jobTitle} size={13}>
          {data.jobTitle}
        </ResponsiveText>
        <ResponsiveText style={style.jobDes} size={11}>
          {data.orgName}
        </ResponsiveText>
        {data?.description ? (
          <ResponsiveText style={style.jobDes} size={11}>
            {data?.description}
          </ResponsiveText>
        ) : null}
      </View>
      {authorized && (
        <View style={style.iconView}>
          <TouchableOpacity onPress={updateExp}>
            <Octicons name="pencil" size={normalize(14)} color="#f06d06" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setProExperienceId(data.proExpid);
              setConfirmationModal(true);
            }}>
            <MaterialIcons name="delete" size={normalize(14)} color="red" />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

let style = StyleSheet.create({
  volunteerExpDetView: {
    paddingLeft: 5,
    width: '85%',
  },
  volunteerExpView: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 15,
    paddingBottom: 7,
    borderBottomColor: ' rgba(0,0,0,.1)',
    borderBottomWidth: 1,
  },
  jobTitle: {
    color: '#212529',
    fontWeight: '500',
    marginBottom: 5,
  },
  jobDes: {
    color: 'rgba(0,0,0,.5)',
  },
  iconView: {
    display: 'flex',
    flexDirection: 'row',
    width: vw(10),
    justifyContent: 'space-around',
  },
});
