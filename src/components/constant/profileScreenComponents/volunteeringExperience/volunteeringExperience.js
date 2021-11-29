import React, {useEffect, useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {useFormik} from 'formik';
import Octicons from 'react-native-vector-icons/Octicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import CustomButton from '../../../common/button/button';
import ModalWrapper from '../../../common/modalWrapper/modalWrapper';
import style from './volunteeringExperienceStyle';
import InputField from '../../../common/inputField/inputField';
import DateAndTimePicker from '../../../common/datePicker/datePicker';
import CustomCheckBox from '../../../common/customCheckBox/customCheckBox';
import {volunteerAddExperienceValidation} from '../../../../shared/validation/profileValidation';
import {useLazyQuery, useMutation, useQuery} from '@apollo/client';
import {saveProExperience} from '../../../../../graphql/mutations';
import {getVolunteerProExperience} from '../../../../../graphql/queries';
import EmptyDataComponent from '../../../common/emptyDataComponent/emptyDataComponent';
import CustomSpinner from '../../../common/spinner/spinner';

export default function VolunteeringExperience(props) {
  let {volunteer} = props;
  let [isModalOpen, setIsModalOpen] = useState(false);
  let [loading, setLoading] = useState(true);
  let [isLoading, setIsLoading] = useState(false);
  let [volunteerExpeience, setVolunteerExpeience] = useState([]);
  let [showInvalidInput, setShowInvalidInput] = useState(false);
  let [saveVolunteerExp, saveVolunteerExpData] = useMutation(saveProExperience);
  let [getVolunteerProExperienceById, getVolunteerProExperienceData] =
    useLazyQuery(getVolunteerProExperience, {fetchPolicy: 'network-only'});

  function setModalOpen() {
    setIsModalOpen(true);
  }

  const formik = useFormik({
    initialValues: {
      jobTitle: '',
      orgName: '',
      fromDate: '',
      endDate: '',
      isCurrent: false,
      description: '',
    },
    validationSchema: volunteerAddExperienceValidation,
    onSubmit: expDet => {
      setIsLoading(true);
      let experienceData = {...expDet, createdBy: volunteer.volunteerId};
      saveVolunteerExp({
        variables: {input: experienceData},
      });
    },
  });
  useEffect(() => {
    if (volunteer.volunteerId) {
      getVolunteerProExperienceById({
        variables: {volunteerId: volunteer.volunteerId},
      });
    }
  }, [volunteer]);
  useEffect(() => {
    (async function () {
      if (getVolunteerProExperienceData?.data?.getVolunteerProExperience) {
        setLoading(false);
        setVolunteerExpeience(
          getVolunteerProExperienceData?.data?.getVolunteerProExperience,
        );
      }
      if (saveVolunteerExpData?.data?.saveProExperience && isLoading) {
        formik.handleReset();
        setIsLoading(false);
        setIsModalOpen(false);
        await setVolunteerExpeience([
          ...volunteerExpeience,
          saveVolunteerExpData?.data?.saveProExperience,
        ]);
      }
    })();
  }, [
    getVolunteerProExperienceData,
    saveVolunteerExpData?.data?.saveProExperience,
  ]);

  function onPressIsCurrent() {
    if (formik.values.isCurrent) {
      formik.setFieldValue('isCurrent', false),
        formik.setFieldValue('endDate', '');
    } else {
      formik.setFieldValue('isCurrent', true),
        formik.setFieldValue('endDate', '');
    }
  }

  return (
    <View style={style.mainViewVolunteeringExp}>
      {loading ? (
        <CustomSpinner size="lg" color="#f06d06" />
      ) : (
        <>
          {volunteerExpeience.length > 0 ? (
            volunteerExpeience?.map((item, i) => (
              <View style={style.volunteerExpView} key={i}>
                <View style={style.volunteerExpDetView}>
                  <Text style={style.jobTitle}>{item.jobTitle}</Text>
                  <Text style={style.jobDes}>{item.orgName}</Text>
                  {item?.description ? (
                    <Text style={style.jobDes}>{item?.description}</Text>
                  ) : null}
                </View>
                <View style={style.iconView}>
                  <Octicons name="pencil" size={18} color="#f06d06" />
                  <MaterialIcons name="delete" size={18} color="red" />
                </View>
              </View>
            ))
          ) : (
            <EmptyDataComponent title="Experience" />
          )}
          <View style={style.buttonView}>
            <CustomButton buttonText="Add Experience" onClick={setModalOpen} />
          </View>
        </>
      )}
      {isModalOpen && (
        <ModalWrapper
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          title="Professional Experience"
          buttonText="Add Experience"
          isLoading={isLoading}
          onClickFun={() => {
            setShowInvalidInput(true);
            formik.handleSubmit();
          }}
          isLoading={isLoading}>
          <View style={style.modalMainView}>
            <View>
              <Text style={style.titleStyle}>Job Title</Text>
              <InputField
                type="text"
                value={formik.values.jobTitle}
                setValue={formik.handleChange('jobTitle')}
                invalidInput={showInvalidInput && formik.errors.jobTitle}
              />
            </View>
            <View>
              <Text style={style.titleStyle}>Organisation Name</Text>
              <InputField
                type="text"
                value={formik.values.orgName}
                setValue={formik.handleChange('orgName')}
                invalidInput={showInvalidInput && formik.errors.orgName}
              />
            </View>
            <View>
              <Text style={style.titleStyle}>From</Text>
              <DateAndTimePicker
                value={formik.values.fromDate}
                setValue={formik.handleChange('fromDate')}
                invalidInput={showInvalidInput && formik.errors.fromDate}
                disabled={false}
                maximumDate={new Date()}
              />
            </View>
            <View>
              <Text style={style.titleStyle}>To</Text>
              <DateAndTimePicker
                value={formik.values.endDate}
                setValue={formik.handleChange('endDate')}
                invalidInput={showInvalidInput && formik.errors.endDate}
                isCurrent={formik.values.isCurrent}
                maximumDate={new Date()}
              />
            </View>
            <TouchableOpacity
              style={style.checkBoxAndTextView}
              onPress={onPressIsCurrent}
              activeOpacity={1}>
              <CustomCheckBox
                isChecked={formik.values.isCurrent}
                callOnPress={onPressIsCurrent}
              />
              <Text style={style.checkBoxText}> I currently work here</Text>
            </TouchableOpacity>
            <View>
              <Text style={style.titleStyle}>Description</Text>
              <InputField
                type="text"
                value={formik.values.description}
                setValue={formik.handleChange('description')}
                invalidInput={showInvalidInput && formik.errors.description}
                multiline={true}
                maxLength={300}
              />
              <Text
                style={
                  style.descriptionLengthStyle
                }>{`${formik.values.description.length}/300`}</Text>
            </View>
          </View>
        </ModalWrapper>
      )}
    </View>
  );
}
