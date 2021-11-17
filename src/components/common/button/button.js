import React from 'react';
import {Button} from 'native-base';
import style from './buttonStyle';
import {Text} from 'react-native';

export default function CustomButton(props) {
  const {buttonText, onClick, setShowInvalidInput, isLoading, icon} = props;

  function butttonPressed() {
    setShowInvalidInput && setShowInvalidInput(true);
    onClick && onClick();
  }

  return (
    <Button
      style={style.buttonStyle}
      onPress={butttonPressed}
      isLoading={isLoading}>
      {buttonText ? <Text style={style.buttonText}>{buttonText}</Text> : icon}
    </Button>
  );
}
