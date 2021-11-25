import React, {useState} from 'react';
import {Text, View} from 'react-native';
import * as yup from 'yup';
import {useFormik} from 'formik';
import CustomButton from '../../../common/button/button';
import ModalWrapper from '../../../common/modalWrapper/modalWrapper';
import style from './volunteeringExperienceStyle';
import InputField from '../../../common/inputField/inputField';
import DateAndTimePicker from '../../../common/datePicker/datePicker';
import CustomCheckBox from '../../../common/customCheckBox/customCheckBox';

export default function VolunteeringExperience() {
  let [isModalOpen, setIsModalOpen] = useState(false);
  let [isLoading, setIsLoading] = useState(false);
  let [showInvalidInput, setShowInvalidInput] = useState(false);
  let [currentlyWorkHere, setCurrentlyWorkHere] = useState(false);
  let [from, setFrom] = useState();
  let [to, setTo] = useState();

  function setModalOpen() {
    setIsModalOpen(true);
  }

  let professionalExperience = yup.object().shape({
    jobTitle: yup.string().required('This field is required'),
    organisationName: yup.string().required('This field is required'),
    from: yup.string().required('This field is required'),
    to: yup.string().required('This field is required'),
    description: yup.string(),
  });

  const formik = useFormik({
    initialValues: {
      jobTitle: '',
      organisationName: '',
      from: '',
      to: '',
      description: '',
    },
    validationSchema: professionalExperience,
    onSubmit: expDet => {
      console.log('expDet');
    },
  });

  return (
    <View style={style.mainViewVolunteeringExp}>
      {isModalOpen && (
        <ModalWrapper
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          title="Professional Experience"
          buttonText="Add Experience"
          onClickFun={() => {
            formik.handleSubmit();
            setShowInvalidInput(true);
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
                value={formik.values.organisationName}
                setValue={formik.handleChange('organisationName')}
                invalidInput={
                  showInvalidInput && formik.errors.organisationName
                }
              />
            </View>
            <View>
              <Text style={style.titleStyle}>From</Text>
              <DateAndTimePicker
                value={formik.values.from}
                setValue={formik.handleChange('from')}
                invalidInput={showInvalidInput && formik.errors.from}
              />
            </View>
            <View>
              <Text style={style.titleStyle}>To</Text>
              <DateAndTimePicker
                value={formik.values.to}
                setValue={formik.handleChange('to')}
                invalidInput={showInvalidInput && formik.errors.to}
                disabled={currentlyWorkHere && true}
              />
            </View>
            <View style={style.checkBoxAndTextView}>
              <CustomCheckBox
                isChecked={currentlyWorkHere}
                setIsChecked={setCurrentlyWorkHere}
              />
              <Text style={style.checkBoxText}> I currently work here</Text>
            </View>
            <View>
              <Text style={style.titleStyle}>Description</Text>
              <InputField
                type="text"
                value={formik.values.description}
                setValue={formik.handleChange('name')}
                invalidInput={showInvalidInput && formik.errors.description}
                multiline={true}
              />
            </View>
          </View>
        </ModalWrapper>
      )}
      <CustomButton buttonText="Add Experience" onClick={setModalOpen} />
    </View>
  );
}
