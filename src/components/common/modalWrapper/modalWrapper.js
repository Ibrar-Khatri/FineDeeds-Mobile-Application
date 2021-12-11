import React, {useState} from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/AntDesign';
import {heightPercentageToDP as vh} from '../../../responsive/responsive';
import CustomButton from '../button/button';
import style from './modalStyleWrapper';

export default function ModalWrapper(props) {
  let {
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
          <Text style={style.titleStyle}>{title}</Text>
          <TouchableOpacity onPress={closeModalIcon}>
            <Icon name="close" color="#000" size={vh(3)} />
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
