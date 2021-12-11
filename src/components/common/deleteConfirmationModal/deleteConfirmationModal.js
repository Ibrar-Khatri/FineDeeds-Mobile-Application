import {Button} from 'native-base';
import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/AntDesign';
import {heightPercentageToDP as vh} from '../../../responsive/responsive';
import style from './deleteConfirmationModalStyle';

export default function DeleteConfirmationModal(props) {
  let {title, isModalOpen, setIsModalOpen, confrimDelete, isLoading} = props;
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
          <Text style={style.titleStyle}>Delete</Text>
          <TouchableOpacity onPress={toggleModal}>
            <Icon name="close" color="#000" size={vh(3)} />
          </TouchableOpacity>
        </View>
        <Text style={style.bodyText}>
          Are you sure you want to delete this experience?
        </Text>
        <View style={style.modalFooter}>
          <Button
            background="#fff"
            style={style.buttonView}
            onPress={() => setIsModalOpen(false)}>
            <Text style={{...style.buttonText, color: '#212529'}}>Cancel</Text>
          </Button>
          <Button
            background="#e82727"
            style={style.buttonView}
            onPress={confrimDelete}
            isLoading={isLoading}>
            <Text style={{...style.buttonText, color: '#fff'}}>Delete</Text>
          </Button>
        </View>
      </View>
    </Modal>
  );
}
