import React, {useState} from 'react';
import {ScrollView, TouchableOpacity, View} from 'react-native';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/AntDesign';
import {normalize} from '../../../responsive/responsive';
import CustomButton from '../button/button';
import ResponsiveText from '../responsiveText/responsiveText';
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
