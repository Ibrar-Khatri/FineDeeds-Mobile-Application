import React from 'react';
import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/AntDesign';
import {
  normalize,
  heightPercentageToDP as vh,
  widthPercentageToDP as vw,
} from '../../../responsive/responsive';
import CustomButton from '../button/button';
import ResponsiveText from '../responsiveText/responsiveText';

export default function ModalWrapper(props) {
  const {
    isModalOpen,
    title,
    onClickFun,
    isLoading,
    children,
    buttonText,
    onBackButtonPress,
    onBackdropPress,
    closeModalIcon,
  } = props;

  return (
    <Modal
      isVisible={isModalOpen}
      hasBackdrop={true}
      backdropOpacity={0.5}
      onBackButtonPress={onBackButtonPress}
      onBackdropPress={onBackdropPress}>
      <View style={style.modalMainView}>
        <View style={style.modalHeaderView}>
          <ResponsiveText style={style.titleStyle} size={15}>
            {title}
          </ResponsiveText>
          <TouchableOpacity onPress={closeModalIcon}>
            <Icon name="close" color="#000" size={normalize(12)} />
          </TouchableOpacity>
        </View>
        <ScrollView>{children}</ScrollView>
        <View style={style.modalFooter}>
          <CustomButton
            buttonText={buttonText}
            onClick={onClickFun}
            isLoading={isLoading}
          />
        </View>
      </View>
    </Modal>
  );
}

let style = StyleSheet.create({
  modalMainView: {
    height: vh(50),
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
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomColor: '#212529',
    borderBottomWidth: 1,
  },
  titleStyle: {
    color: '#212529',
    fontFamily: 'Montserrat-SemiBold',
    fontWeight: '700',
    fontSize: vw(5),
  },
  modalFooter: {
    borderTopColor: '#212529',
    borderTopWidth: 1,
    backgroundColor: '#fff',
    paddingTop: 8,
    paddingBottom: 8,
    paddingRight: 20,
    paddingLeft: 20,
  },
});
