import React, {useState} from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
} from 'react-native';
import Modal from 'react-native-modal';
import DropShadow from 'react-native-drop-shadow';
import {InvalidInput, ResponsiveText} from '../index';
import {widthPercentageToDP as vw} from '../../responsive/responsive';

export default function SelectInputField(props) {
  let [showModal, setShowModal] = useState(false);
  const {value, setValue, invalidInput, title, data, type} = props;
  //   function setDate(date) {
  //     setShowModal(false);
  //     setValue(moment(date).format('YYYY-MM-DD'));
  //   }

  function closeModal() {
    setShowModal(!showModal);
  }
  function selectVelue(country) {
    setValue(country);
    setShowModal(!showModal);
  }

  return (
    <>
      <TouchableOpacity
        activeOpacity={1}
        style={style.inputView}
        onPress={() => setShowModal(true)}>
        <DropShadow style={showModal && style.focusInputStyle}>
          <View style={[style.inputStyle]}>
            <ResponsiveText size={14} style={style.selectedValue}>
              {value}
            </ResponsiveText>
            {type === 'countryList' && (
              <Image
                source={{
                  uri: `https://countryflagsapi.com/png/${
                    data.filter(item => item.value === value)[0]?.id
                  }`,
                }}
                style={style.flagStyle}
              />
            )}
          </View>
        </DropShadow>
        {invalidInput && !isCurrent && <InvalidInput error={invalidInput} />}
      </TouchableOpacity>
      <Modal
        isVisible={showModal}
        hasBackdrop={true}
        backdropOpacity={0.5}
        onBackButtonPress={closeModal}
        onBackdropPress={closeModal}>
        <View style={style.modaView}>
          <View style={style.modalHeaderView}>
            <ResponsiveText size={15} style={style.modalTitle}>
              {title}
            </ResponsiveText>
            
          </View>
          <ScrollView>
            {type === 'countryList'
              ? Array.isArray(data) &&
                data?.map((coun, i) => (
                  <TouchableOpacity
                    key={i}
                    style={style.flagAndTextView}
                    onPress={() => selectVelue(coun.value)}>
                    <Image
                      source={{
                        uri: `https://countryflagsapi.com/png/${coun.id}`,
                      }}
                      style={style.flagStyle}
                    />
                    <ResponsiveText size={13} style={style.countryName}>
                      {coun.value}
                    </ResponsiveText>
                  </TouchableOpacity>
                ))
              : ''}
          </ScrollView>
        </View>
      </Modal>
    </>
  );
}

let style = StyleSheet.create({
  inputView: {
    width: '100%',
    marginTop: 5,
    marginBottom: 5,
    alignSelf: 'center',
  },
  inputStyle: {
    padding: 12,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ced4da',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  disabledBGColor: {
    backgroundColor: '#e9ecef',
  },
  focusInputStyle: {
    shadowColor: '#fd7e14',
    shadowOpacity: 1,
    shadowRadius: 4,
    shadowOffset: {
      height: 0,
      width: 0,
    },
    elevation: 1,
  },
  textStyle: {
    color: '#212529',
    paddingTop: 7,
    paddingBottom: 7,
  },
  modaView: {backgroundColor: '#fff', height: '100%', width: '100%'},
  modalTitle: {
    color: '#212529',
    fontFamily: 'Montserrat-SemiBold',
  },
  modalHeaderView: {
    padding: vw(2),
    borderBottomColor: '#eaeaea',
    borderBottomWidth: 2,
    marginBottom: vw(2),
  },
  flagAndTextView: {
    display: 'flex',
    flexDirection: 'row',
    borderBottomColor: '#eaeaea',
    borderBottomWidth: 1,
    padding: vw(3),
  },
  flagStyle: {
    width: vw(8),
    height: vw(5),
    borderColor: '#eaeaea',
    borderWidth: 1,
  },
  countryName: {
    color: '#212529',
    marginLeft: vw(1),
  },
  selectedValue: {
    color: '#212529',
  },
});
