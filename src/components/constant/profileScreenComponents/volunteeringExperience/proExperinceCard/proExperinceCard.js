import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import Octicons from 'react-native-vector-icons/Octicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {widthPercentageToDP as vw} from '../../../../../responsive/responsive';
import style from './proExperinceCardStyle';

export default function ProExperinceCard(props) {
  let {
    data,
    setConfirmationModal,
    setProExperienceId,
    setIsModalOpen,
    formik,
    setShowInvalidInput,
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
        <Text style={style.jobTitle}>{data.jobTitle}</Text>
        <Text style={style.jobDes}>{data.orgName}</Text>
        {data?.description ? (
          <Text style={style.jobDes}>{data?.description}</Text>
        ) : null}
      </View>
      <View style={style.iconView}>
        <TouchableOpacity onPress={updateExp}>
          <Octicons name="pencil" size={vw(4)} color="#f06d06" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setProExperienceId(data.proExpid);
            setConfirmationModal(true);
          }}>
          <MaterialIcons name="delete" size={vw(4)} color="red" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
