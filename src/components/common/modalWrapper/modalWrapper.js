import React, {useState} from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import Modal from 'react-native-modal';
// import { Modal } from 'native-base';
import Icon from 'react-native-vector-icons/AntDesign';
import CustomButton from '../button/button';
import style from './modalStyleWrapper';

export default function ModalWrapper(props) {
  let {isModalOpen, setIsModalOpen, title, onClickFun, children} = props;

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  return (
    <Modal
      isVisible={isModalOpen}
      hasBackdrop={true}
      backdropOpacity={0.5}
      onBackButtonPress={() => setIsModalOpen(false)}
      onBackdropPress={() => setIsModalOpen(false)}>
      <View style={style.modalMainView}>
        <View style={style.modalHeaderView}>
          <Text style={style.titleStyle}>{title}</Text>
          <TouchableOpacity onPress={toggleModal}>
            <Icon name="close" color="#000" size={20} />
          </TouchableOpacity>
        </View>
        <ScrollView>{props.children}</ScrollView>
        <View style={style.modalFooter}>
          <CustomButton buttonText="Save Changes" onClick={onClickFun} />
        </View>
      </View>
    </Modal>
  );
}
