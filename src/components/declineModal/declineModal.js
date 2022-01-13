import {Button} from 'native-base';
import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import Modal from 'react-native-modal';
import {InputField, ResponsiveText} from '../index';
import {
  heightPercentageToDP as vh,
  widthPercentageToDP as vw,
} from '../../responsive/responsive';
import {requestDeclineFormValidation} from '../../shared/validation/declineValidation';
import {useFormik} from 'formik';

export default function DeclineModal(props) {
  const {
    title,
    isModalOpen,
    setIsModalOpen,
    confrimDelete,
    isLoading,
    subTitle,
  } = props;

  let [showInvalidInput, setShowInvalidInput] = useState(false);

  const formik = useFormik({
    initialValues: {
      note: '',
    },
    validationSchema: requestDeclineFormValidation,

    onSubmit: value => {
      confrimDelete(value);
      setShowInvalidInput(false);
    },
  });

  return (
    <Modal
      isVisible={isModalOpen}
      hasBackdrop={true}
      backdropOpacity={0.5}
      onBackButtonPress={() => setIsModalOpen(false)}
      onBackdropPress={() => setIsModalOpen(false)}>
      <View style={style.modalMainView}>
        <View style={style.modalHeaderView}>
          <ResponsiveText size={16} style={style.titleStyle}>
            {title}
          </ResponsiveText>
        </View>
        <ResponsiveText size={12} style={style.bodyText}>
          {subTitle}
        </ResponsiveText>

        <View>
          <ResponsiveText style={style.descriptiontitleStyle} size={12}>
            Description
          </ResponsiveText>
          <InputField
            type="text"
            value={formik.values.note}
            setValue={formik.handleChange('note')}
            invalidInput={showInvalidInput && formik.errors.note}
            multiline={true}
            maxLength={500}
          />
          <ResponsiveText
            size={11}
            style={
              style.descriptionLengthStyle
            }>{`${formik.values.note.length}/500`}</ResponsiveText>
        </View>
        <View style={style.modalFooter}>
          <Button
            background="#fff"
            style={style.buttonView}
            onPress={() => setIsModalOpen(false)}>
            <ResponsiveText
              size={12}
              style={{...style.buttonText, color: '#212529'}}>
              CANCEL
            </ResponsiveText>
          </Button>
          <Button
            background="#e82727"
            style={style.buttonView}
            onPress={() => {
              formik.handleSubmit();
              setShowInvalidInput(true);
            }}
            isLoading={isLoading}>
            <ResponsiveText
              size={12}
              style={{...style.buttonText, color: '#fff'}}>
              {isLoading ? 'LOADING...' : 'DECLINE'}
            </ResponsiveText>
          </Button>
        </View>
      </View>
    </Modal>
  );
}

let style = StyleSheet.create({
  modalMainView: {
    backgroundColor: '#fff',
    width: vw(80),
    alignSelf: 'center',
    borderRadius: 10,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.39,
    shadowRadius: 8.3,
    elevation: 13,
    padding: vw(3),
    // backgroundColor: 'red',
  },
  modalHeaderView: {
    backgroundColor: '#fff',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    // padding: 12,
  },
  titleStyle: {
    color: '#212529',
    fontFamily: 'Montserrat-SemiBold',
    fontSize: vw(5),
  },
  buttonView: {
    borderColor: '#ccc',
    borderWidth: 1,
    marginLeft: 10,
  },
  buttonText: {
    fontFamily: 'Montserrat-Regular',
    fontWeight: '700',
    fontSize: vw(3.5),
  },
  descriptiontitleStyle: {
    fontFamily: 'Montserrat-Regular',
    color: '#212529',
  },
  descriptionLengthStyle: {
    fontFamily: 'Montserrat-Regular',
    color: '#212529',
    textAlign: 'right',
    margin: 1,
  },
  bodyText: {
    color: '#212529',
    fontSize: vw(3.3),
    padding: vw(2),
  },
  modalFooter: {
    paddingTop: 15,
    paddingBottom: 8,
    // paddingRight: 20,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});
