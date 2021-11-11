import React from 'react';
import {Button} from 'native-base';
import style from './buttonStyle';
import {Text} from 'react-native';

export default function CustomButton(props) {
  const {buttonText, onClick, setShowInvalidInput, isLoading} = props;

  function butttonPressed() {
    onClick();
    setShowInvalidInput(true);
  }

  return (
    <Button
      style={style.buttonStyle}
      onPress={butttonPressed}
      isLoading={isLoading}>
      <Text style={style.buttonText}>{buttonText}</Text>
    </Button>
  );
}
