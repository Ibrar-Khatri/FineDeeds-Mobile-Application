import React from 'react';
import {StyleSheet} from 'react-native';
import {Button} from 'native-base';
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

let style = StyleSheet.create({
  buttonStyle: {
    backgroundColor: '#f06d06',
    borderRadius: 7,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
});
