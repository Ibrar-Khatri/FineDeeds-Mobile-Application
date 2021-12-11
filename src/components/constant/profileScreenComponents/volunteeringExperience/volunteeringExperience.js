import React, {useEffect, useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {useFormik} from 'formik';
import CustomButton from '../../../common/button/button';
import ModalWrapper from '../../../common/modalWrapper/modalWrapper';
import style from './volunteeringExperienceStyle';
import InputField from '../../../common/inputField/inputField';
import DateAndTimePicker from '../../../common/datePicker/datePicker';
import CustomCheckBox from '../../../common/customCheckBox/customCheckBox';
import {volunteerAddExperienceValidation} from '../../../../shared/validation/profileValidation';
import {useLazyQuery, useMutation, useQuery} from '@apollo/client';
import {
  deleteProExperience,
  saveProExperience,
  updateProExperience,
} from '../../../../../graphql/mutations';
import {getVolunteerProExperience} from '../../../../../graphql/queries';
import EmptyDataComponent from '../../../common/emptyDataComponent/emptyDataComponent';
import CustomSpinner from '../../../common/spinner/spinner';
import DeleteConfirmationModal from '../../../common/deleteConfirmationModal/deleteConfirmationModal';
import {useToast} from 'native-base';
import CustomToast from '../../../common/customToast/customToast';
import ProExperinceCard from './proExperinceCard/proExperinceCard';

export default function VolunteeringExperience(props) {
  let {volunteer} = props;
  let [isModalOpen, setIsModalOpen] = useState(false);
  let [confirmationModal, setConfirmationModal] = useState(false);
  let [loading, setLoading] = useState(true);
  let [isLoading, setIsLoading] = useState(false);
  let [proExperienceId, setProExperienceId] = useState();
  let [volunteerExpeience, setVolunteerExpeience] = useState([]);
  let [showInvalidInput, setShowInvalidInput] = useState(false);
  let [saveVolunteerExp] = useMutation(saveProExperience);
  let [updateVolunteerExp] = useMutation(updateProExperience);
  let [deleteExp] = useMutation(deleteProExperience);
  let [getVolunteerProExperienceById, getVolunteerProExperienceData] =
    useLazyQuery(getVolunteerProExperience, {fetchPolicy: 'network-only'});
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
  useEffect(() => {
    if (volunteer.volunteerId) {
      getVolunteerProExperienceById({
        variables: {volunteerId: volunteer.volunteerId},
      });
    }
  }, [volunteer]);
  useEffect(() => {
    if (getVolunteerProExperienceData?.data?.getVolunteerProExperience) {
      setLoading(false);
      setVolunteerExpeience(
        getVolunteerProExperienceData?.data?.getVolunteerProExperience,
      );
    }
  }, [getVolunteerProExperienceData]);

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
  }
  return (
    <View style={style.mainViewVolunteeringExp}>
      {loading ? (
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
              />
            ))
          ) : (
            <EmptyDataComponent title="Experience" />
          )}
          <View style={style.buttonView}>
            <CustomButton
              buttonText="Add Experience"
              onClick={() => setIsModalOpen(true)}
            />
          </View>
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
      {confirmationModal && (
        <DeleteConfirmationModal
          isModalOpen={confirmationModal}
          setIsModalOpen={setConfirmationModal}
          confrimDelete={deleteVolunteerExp}
          isLoading={isLoading}
        />
      )}
    </View>
  );
}
