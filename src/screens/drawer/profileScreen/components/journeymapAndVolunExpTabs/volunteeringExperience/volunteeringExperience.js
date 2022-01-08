import React, { useState} from 'react';
import { StyleSheet, TouchableOpacity, View} from 'react-native';
import {useFormik} from 'formik';
import {useMutation} from '@apollo/client';
import {useToast} from 'native-base';
import {
  CustomButton,
  ModalWrapper,
  InputField,
  DateAndTimePicker,
  CustomCheckBox,
  EmptyDataComponent,
  CustomSpinner,
  DeleteConfirmationModal,
  CustomToast,
  ResponsiveText,
} from '../../../../../../components/common/common';
import {volunteerAddExperienceValidation} from '../../../../../../shared/validation/profileValidation';
import {
  deleteProExperience,
  saveProExperience,
  updateProExperience,
} from '../../../../../../../graphql/mutations';
import ProExperinceCard from './proExperinceCard/proExperinceCard';

export default function VolunteeringExperience(props) {
  const {volunteer, authorized, volunteerExpeience, setVolunteerExpeience} =
    props;
  let [isModalOpen, setIsModalOpen] = useState(false);
  let [confirmationModal, setConfirmationModal] = useState(false);
  let [loading, setLoading] = useState(true);
  let [isLoading, setIsLoading] = useState(false);
  let [proExperienceId, setProExperienceId] = useState();
  let [showInvalidInput, setShowInvalidInput] = useState(false);
  let [saveVolunteerExp] = useMutation(saveProExperience);
  let [updateVolunteerExp] = useMutation(updateProExperience);
  let [deleteExp] = useMutation(deleteProExperience);
  let toast = useToast();

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
      let updateExpDet = {
        ...expDet,
        updatedBy: volunteer.volunteerId,
        proExpid: proExperienceId,
      };

      proExperienceId
        ? updateVolunteerExp({
            variables: {input: updateExpDet},
          })
            .then(async exp => {
              renderToast(
                'success',
                'Experience has been successfully updated.',
              );
              let update = await volunteerExpeience.map(item =>
                exp?.data?.updateProExperience.proExpid === item.proExpid
                  ? exp?.data?.updateProExperience
                  : item,
              );
              setVolunteerExpeience(update);
            })
            .catch(err => {
              renderToast('error', err.message);
            })
        : saveVolunteerExp({
            variables: {input: experienceData},
          })
            .then(exp => {
              renderToast('success', 'Experience has been successfully added.');
              setVolunteerExpeience([
                ...volunteerExpeience,
                exp?.data?.saveProExperience,
              ]);
            })
            .catch(err => {
              renderToast('error', err.message);
            });
    },
  });

  function onPressIsCurrent() {
    if (formik.values.isCurrent) {
      formik.setFieldValue('isCurrent', false),
        formik.setFieldValue('endDate', '');
    } else {
      formik.setFieldValue('isCurrent', true),
        formik.setFieldValue('endDate', '');
    }
  }

  function deleteVolunteerExp() {
    setIsLoading(true);
    deleteExp({
      variables: {
        input: {
          proExpid: proExperienceId,
          volunteerId: volunteer.volunteerId,
        },
      },
    })
      .then(() => {
        setVolunteerExpeience(
          volunteerExpeience.filter(item => item.proExpid !== proExperienceId),
        );
        renderToast('success', 'Experience has been successfully deleted.');
      })
      .catch(err => {
        renderToast('error', err.message);
      });
  }

  function renderToast(type, description) {
    toast.show({
      placement: 'top',
      duration: 3000,
      render: () => <CustomToast type={type} description={description} />,
    });
    formik.handleReset();
    setConfirmationModal(false);
    setIsLoading(false);
    setIsModalOpen(false);
    setProExperienceId('');
    setShowInvalidInput(false);
  }

  function closeModal() {
    setIsModalOpen(false);
    setProExperienceId('');
    formik.handleReset();
  }
  return (
    <View style={style.mainViewVolunteeringExp}>
      {!volunteerExpeience ? (
        <CustomSpinner size="lg" color="#f06d06" />
      ) : (
        <>
          {volunteerExpeience.length > 0 ? (
            volunteerExpeience?.map((item, i) => (
              <ProExperinceCard
                key={i}
                data={item}
                setConfirmationModal={setConfirmationModal}
                setProExperienceId={setProExperienceId}
                setIsModalOpen={setIsModalOpen}
                formik={formik}
                setShowInvalidInput={setShowInvalidInput}
                authorized={authorized}
              />
            ))
          ) : (
            <EmptyDataComponent title="No Experience" />
          )}
          {authorized && (
            <View style={style.buttonView}>
              <CustomButton
                buttonText="Add Experience"
                onClick={() => setIsModalOpen(true)}
              />
            </View>
          )}
        </>
      )}
      {isModalOpen && (
        <ModalWrapper
          onBackButtonPress={closeModal}
          onBackdropPress={closeModal}
          closeModalIcon={closeModal}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          title="Professional Experience"
          buttonText={proExperienceId ? 'Update Experience' : 'Add Experience'}
          isLoading={isLoading}
          onClickFun={() => {
            setShowInvalidInput(true);
            formik.handleSubmit();
          }}
          isLoading={isLoading}>
          <View style={style.modalMainView}>
            <View>
              <ResponsiveText style={style.titleStyle} size={12}>
                Job Title
              </ResponsiveText>
              <InputField
                type="text"
                value={formik.values.jobTitle}
                setValue={formik.handleChange('jobTitle')}
                invalidInput={showInvalidInput && formik.errors.jobTitle}
              />
            </View>
            <View>
              <ResponsiveText style={style.titleStyle} size={12}>
                Organisation Name
              </ResponsiveText>
              <InputField
                type="text"
                value={formik.values.orgName}
                setValue={formik.handleChange('orgName')}
                invalidInput={showInvalidInput && formik.errors.orgName}
              />
            </View>
            <View>
              <ResponsiveText style={style.titleStyle} size={12}>
                From
              </ResponsiveText>
              <DateAndTimePicker
                value={formik.values.fromDate}
                setValue={formik.handleChange('fromDate')}
                invalidInput={showInvalidInput && formik.errors.fromDate}
                disabled={false}
                maximumDate={new Date()}
              />
            </View>
            <View>
              <ResponsiveText style={style.titleStyle} size={12}>
                To
              </ResponsiveText>
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
              <ResponsiveText style={style.checkBoxText} size={12}>
                {' '}
                I currently work here
              </ResponsiveText>
            </TouchableOpacity>
            <View>
              <ResponsiveText style={style.titleStyle} size={12}>
                Description
              </ResponsiveText>
              <InputField
                type="text"
                value={formik.values.description}
                setValue={formik.handleChange('description')}
                invalidInput={showInvalidInput && formik.errors.description}
                multiline={true}
                maxLength={300}
              />
              <ResponsiveText
                size={11}
                style={
                  style.descriptionLengthStyle
                }>{`${formik.values.description.length}/300`}</ResponsiveText>
            </View>
          </View>
        </ModalWrapper>
      )}
      {confirmationModal && (
        <DeleteConfirmationModal
          isModalOpen={confirmationModal}
          setIsModalOpen={setConfirmationModal}
          confrimDelete={deleteVolunteerExp}
          isLoading={isLoading}
          subTitle="Are you sure you want to delete this experience?"
          title="Delete"
        />
      )}
    </View>
  );
}

let style = StyleSheet.create({
  mainViewVolunteeringExp: {
    minHeight: 100,
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    padding: 15,
  },
  modalMainView: {margin: 15},
  titleStyle: {
    fontFamily: 'Montserrat-Regular',
    color: '#212529',
  },
  checkBoxAndTextView: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 15,
    alignItems: 'center',
  },
  checkBoxText: {
    fontFamily: 'Montserrat-Regular',
    color: '#212529',
  },
  descriptionLengthStyle: {
    fontFamily: 'Montserrat-Regular',
    color: '#212529',
    textAlign: 'right',
    margin: 1,
  },
  buttonView: {
    alignSelf: 'center',
    marginTop: 20,
  },
});
