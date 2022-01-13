import {Button} from 'native-base';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import Modal from 'react-native-modal';
import {ResponsiveText} from '../index';
import {
  heightPercentageToDP as vh,
  widthPercentageToDP as vw,
} from '../../responsive/responsive';

export default function AcceptModal(props) {
  const {title, isModalOpen, setIsModalOpen, confrimed, isLoading, subTitle} =
    props;
  return (
    <Modal
      isVisible={isModalOpen}
      hasBackdrop={true}
      backdropOpacity={0.5}
      onBackButtonPress={() => !isLoading && setIsModalOpen(false)}
      onBackdropPress={() => !isLoading && setIsModalOpen(false)}>
      <View style={style.modalMainView}>
        <View style={style.modalHeaderView}>
          <ResponsiveText size={15} style={style.titleStyle}>
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
            onPress={() => !isLoading && setIsModalOpen(false)}>
            <ResponsiveText
              size={12}
              style={{...style.buttonText, color: '#212529'}}>
              CANCEL
            </ResponsiveText>
          </Button>
          <Button
            background="#8abb2a"
            style={style.buttonView}
            onPress={confrimed}
            isLoading={isLoading}>
            <ResponsiveText
              size={12}
              style={{...style.buttonText, color: '#fff'}}>
              {isLoading ? 'LOADING...' : 'ACCEPT'}
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
    padding: vw(2),
  },
  modalHeaderView: {
    backgroundColor: '#fff',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  titleStyle: {
    color: '#212529',
    fontFamily: 'Montserrat-SemiBold',
  },
  buttonView: {
    borderColor: '#ccc',
    borderWidth: 1,
    marginLeft: 10,
  },
  buttonText: {
    fontFamily: 'Montserrat-Regular',
    fontWeight: '700',
  },
  bodyText: {
    color: '#212529',
    padding: vw(2),
  },
  modalFooter: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingTop: vw(3),
  },
});
