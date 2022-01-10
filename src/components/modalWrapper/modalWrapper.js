import React from 'react';
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/AntDesign';
import {
  normalize,
  heightPercentageToDP as vh,
  widthPercentageToDP as vw,
} from '../../responsive/responsive';
import {CustomButton,ResponsiveText} from '../index';

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
      style={style.modalStyle}
      avoidKeyboard={true}
      coverScreen={true}
      isVisible={isModalOpen}
      hasBackdrop={true}
      backdropOpacity={0.1}
      onBackButtonPress={onBackButtonPress}
      onBackdropPress={onBackdropPress}>
      <View style={style.modalMainView}>
        <View style={style.modalHeaderView}>
          <ResponsiveText style={style.titleStyle} size={17}>
            {title}
          </ResponsiveText>
          <TouchableOpacity onPress={closeModalIcon} style={{padding: 5}}>
            <Icon name="close" color="#000" size={normalize(18)} />
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
  modalStyle: {
    margin: 0,
  },
  modalMainView: {
    height: '100%',
    width: vw(100),
    backgroundColor: '#fff',
  },
  modalHeaderView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 10,
    borderBottomColor: '#eaeaea',
    borderBottomWidth: 1,
  },
  titleStyle: {
    color: '#212529',
    fontFamily: 'Montserrat-SemiBold',
    marginLeft: 15,
  },
  modalFooter: {
    backgroundColor: '#fff',
    paddingTop: 8,
    paddingBottom: 8,
    paddingRight: 20,
    paddingLeft: 20,
  },
});
