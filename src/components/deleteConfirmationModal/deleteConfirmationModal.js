import {Button} from 'native-base';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import Modal from 'react-native-modal';
import {ResponsiveText} from '../index';
import {
  heightPercentageToDP as vh,
  widthPercentageToDP as vw,
} from '../../responsive/responsive';

export default function DeleteConfirmationModal(props) {
  const {
    title,
    isModalOpen,
    setIsModalOpen,
    confrimDelete,
    isLoading,
    subTitle,
    buttonText,
  } = props;
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
        <View style={style.modalFooter}>
          <Button
            background="#fff"
            style={style.buttonView}
            onPress={() => setIsModalOpen(false)}>
            <ResponsiveText
              size={12}
              style={{...style.buttonText, color: '#212529'}}>
              Cancel
            </ResponsiveText>
          </Button>
          <Button
            background="#e82727"
            style={style.buttonView}
            onPress={confrimDelete}
            isLoading={isLoading}>
            <ResponsiveText
              size={12}
              style={{...style.buttonText, color: '#fff'}}>
              {buttonText ? buttonText : 'Delete'}
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
  },
  modalHeaderView: {
    backgroundColor: '#fff',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 12,
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
  bodyText: {
    color: '#212529',
    fontSize: vw(3.3),
    paddingLeft: 12,
    paddingRight: 12,
  },
  modalFooter: {
    paddingTop: 15,
    paddingBottom: 8,
    paddingRight: 20,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});
