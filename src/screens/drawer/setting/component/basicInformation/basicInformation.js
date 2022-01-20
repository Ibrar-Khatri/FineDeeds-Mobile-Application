import {useLazyQuery} from '@apollo/client';
import {useFormik} from 'formik';
import React, {useContext, useEffect, useState} from 'react';
import {Dimensions, ScrollView, StyleSheet, View} from 'react-native';
import {getOrgCenter} from '../../../../../../graphql/queries';
import {
  Permission,
  PERMISSION_TYPE,
} from '../../../../../appPermissions/appPermissions';
import {
  DateAndTimePicker,
  ImagePickerActionSheet,
  InputField,
  RenderS3Image,
  ResponsiveText,
} from '../../../../../components';
import {
  widthPercentageToDP as vw,
  heightPercentageToDP as vh,
} from '../../../../../responsive/responsive';
import {VolunteerContext} from '../../../../../shared/services/helper';
import volunteerBasicInformationValidation from './validation';

let screenWidth = Dimensions.get('window').width;
export default BasicInformation = () => {
  let {volunteer, setVolunteer} = useContext(VolunteerContext);
  let [isActionSheetOpen, setIsActionSheetOpen] = useState(false);
  let [image, setImage] = useState(null);
  let [showInvalidInput, setShowInvalidInput] = useState(false);

  const [GetCenter, {data}] = useLazyQuery(getOrgCenter);
  useEffect(() => {
    if (volunteer) {
      GetCenter({
        variables: {
          orgCenterId: volunteer?.centerId,
        },
      });
    }
  }, [volunteer]);
  console.log(volunteer, 'volunteer');

  const formik = useFormik({
    initialValues: {
      volunteerName: volunteer?.volunteerName,
      email: volunteer?.email,
      dob: volunteer?.dob,
      gender: volunteer?.gender,
      city: volunteer?.city,
      country: volunteer?.country,
      aboutMe: volunteer?.aboutMe,
      center: data?.getOrgCenter?.title,
      designation: volunteer?.designation,
      activeContributor: volunteer?.activeContributor,
    },
    validationSchema: volunteerBasicInformationValidation,
    onSubmit: values => {
      const {
        volunteerName,
        gender,
        aboutMe,
        city,
        country,
        dob,
        activeContributor,
      } = values;
      const {volunteerId} = volunteer;
      console.log(values, ' Valuesss');
      // FinedeedsAppClient.mutate({
      //   mutation: updateVolunteerInfo,
      //   variables: {
      //     input: {
      //       volunteerId,
      //       volunteerName,
      //       dob,
      //       gender: gender && gender.toUpperCase(),
      //       city,
      //       country,
      //       aboutMe,
      //       activeContributor,
      //       designation: user?.designation,
      //       center: data?.getOrgCenter?.orgCenterId,
      //     },
      //   },
      // })
      //   .then(async ({data}) => {
      //     await updateName(volunteerName);
      //     getVolunteerByIdSuccessAction({
      //       ...data['updateVolunteerInfo'],
      //       role: user?.role === 'STAFF' && 'STAFF',
      //       activeContributor,
      //       center: {
      //         orgCenterId: data?.getOrgCenter?.orgCenterId,
      //         title: data?.getOrgCenter?.title,
      //       },
      //       designation: user?.designation,
      //       organization: {
      //         orgName: user?.organization?.orgName,
      //         orgId: user?.organization?.orgId,
      //       },
      //     });
      //     toast.success('Profile has been successfully updated.');
      //     setLoader(false);
      //   })
      //   .catch(error => {
      //     toast.error(error.message);
      //     setLoader(false);
      //   });
    },
  });

  async function invokeActionSheet() {
    await Permission.requestMultiple([
      PERMISSION_TYPE.photo,
      PERMISSION_TYPE.camera,
    ]);
    setIsActionSheetOpen(true);
  }

  return (
    <ScrollView style={style.scrollView}>
      <RenderS3Image
        resizeMode="cover"
        style={style.profileImageStyle}
        s3Key={
          volunteer?.volunteerId && `VOLUNTEER/${volunteer?.volunteerId}.webp`
        }
        onClick={invokeActionSheet}
        imageUrl={image}
      />

      <View style={style.fieldsView}>
        <View>
          <ResponsiveText size={13} style={style.fieldTitle}>
            Full Name
          </ResponsiveText>
          <InputField
            type="text"
            value={formik.values.volunteerName}
            setValue={formik.handleChange('volunteerName')}
            invalidInput={showInvalidInput && formik.errors.volunteerName}
          />
        </View>
        <View>
          <ResponsiveText size={13} style={style.fieldTitle}>
            Email
          </ResponsiveText>
          <InputField
            type="text"
            value={formik.values.email}
            setValue={formik.handleChange('email')}
            invalidInput={showInvalidInput && formik.errors.email}
            disabled={true}
          />
        </View>
        {/* <View>
          <ResponsiveText size={13} style={style.fieldTitle}>
            Date Of Birth
          </ResponsiveText>
          <DateAndTimePicker
            value={formik.values.dob}
            setValue={formik.handleChange('dob')}
            invalidInput={showInvalidInput && formik.errors.dob}
            disabled={false}
            maximumDate={new Date()}
          />
        </View> */}
      </View>

      <ImagePickerActionSheet
        isActionSheetOpen={isActionSheetOpen}
        setIsActionSheetOpen={setIsActionSheetOpen}
        option={{
          width: 400,
          height: 400,
          cropping: true,
          mediaType: 'photo',
        }}
        image={image}
        setImage={setImage}
        s3Key={`VOLUNTEER/${volunteer?.volunteerId}.webp`}
      />
    </ScrollView>
  );
};

const style = StyleSheet.create({
  scrollView: {
    backgroundColor: '#fff',
  },
  profileImageStyle: {
    height: vw(screenWidth < 480 ? 25 : 20),
    width: vw(screenWidth < 480 ? 25 : 20),
    borderRadius: 100,
    overflow: 'hidden',
    alignSelf: 'center',
    margin: vw(3),
    borderColor: '#fd7e14',
    borderWidth: 1,
  },
  fieldsView: {
    width: '100%',
    padding: vw(3),
  },
  fieldTitle: {
    color: '#212529',
    fontFamily: 'Montserrat-Regular',
    marginBottom: 5,
  },
});
