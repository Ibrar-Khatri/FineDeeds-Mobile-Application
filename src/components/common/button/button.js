import React from 'react';
import {Button} from 'native-base';
import style from './buttonStyle';
import {Text} from 'react-native';
import ResponsiveText from '../responsiveText/responsiveText';

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
      {buttonText ? (
        <ResponsiveText style={style.buttonText} size={13}>
          {buttonText}
        </ResponsiveText>
      ) : (
        icon
      )}
    </Button>
  );
}
