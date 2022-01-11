import React from 'react';
import {StyleSheet} from 'react-native';
import {Button} from 'native-base';
import {ResponsiveText} from '../index';

export default function CustomButton(props) {
  const {buttonText, onClick, setShowInvalidInput, isLoading, icon, style} =
    props;

  function butttonPressed() {
    setShowInvalidInput && setShowInvalidInput(true);
    onClick && onClick();
  }

  return (
    <Button
      style={[styles.buttonStyle, style]}
      onPress={butttonPressed}
      isLoading={isLoading}>
      {buttonText ? (
        <ResponsiveText style={styles.buttonText} size={13}>
          {buttonText}
        </ResponsiveText>
      ) : (
        icon
      )}
    </Button>
  );
}

let styles = StyleSheet.create({
  buttonStyle: {
    backgroundColor: '#f06d06',
    borderRadius: 7,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
});
