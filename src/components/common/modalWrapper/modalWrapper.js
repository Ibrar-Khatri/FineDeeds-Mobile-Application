import React, {useState} from 'react';
import {Text} from 'react-native';
import {Modal} from 'native-base';
import CustomButton from '../button/button';
import style from './modalStyleWrapper';

export default function ModalWrapper(props) {
  let {isModalOpen, setIsModalOpen, title, onClick} = props;

  return (
    <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} size="lg">
      <Modal.Content style={style.contentView}>
        <Modal.CloseButton />
        <Modal.Header>
          <Text style={style.modalHeaderStyle}>{title}</Text>
        </Modal.Header>
        <Modal.Body>{props.children}</Modal.Body>
        <Modal.Footer>
          <CustomButton buttonText="Save Changes" onClick={onClick} />
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
}
