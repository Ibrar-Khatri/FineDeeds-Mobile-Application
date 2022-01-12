import React from 'react';
import {View} from 'react-native';
import {ModalWrapper, ResponsiveText} from '../..';
import RequestCard from './requestCard/requestCard';

export default function Requestmodal(props) {
  let {isModalOpen, setIsModalOpen, title, participants} = props;
  function closeModal() {
    setIsModalOpen(false);
  }
  return (
    <ModalWrapper
      onBackButtonPress={closeModal}
      onBackdropPress={closeModal}
      closeModalIcon={closeModal}
      isModalOpen={isModalOpen}
      setIsModalOpen={setIsModalOpen}
      title={title}
      //   buttonText={proExperienceId ? 'Update Experience' : 'Add Experience'}
      //   isLoading={isLoading}
      //   onClickFun={() => {
      //     setShowInvalidInput(true);
      //     formik.handleSubmit();
      //   }}
    >
      <View style={{alignItems: 'center'}}>
        {participants?.map((item, i) => (
          <RequestCard key={i} data={item} />
        ))}
      </View>
    </ModalWrapper>
  );
}
