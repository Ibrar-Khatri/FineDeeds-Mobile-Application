import {Button} from 'native-base';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/AntDesign';
import {
  heightPercentageToDP as vh,
  widthPercentageToDP as vw,
} from '../../../responsive/responsive';

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
  buttonView: {
    borderColor: '#ccc',
    borderWidth: 1,
  },
  buttonText: {
    fontFamily: 'Montserrat-Regular',
    fontWeight: '700',
    fontSize: vw(3.5),
  },
  bodyText: {
    color: '#212529',
    fontSize: vw(3.3),
    padding: 15,
  },
  modalFooter: {
    paddingTop: 8,
    paddingBottom: 8,
    paddingRight: 20,
    paddingLeft: 20,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
