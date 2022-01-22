import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {InvalidInput, ResponsiveText} from '..';
import {widthPercentageToDP as vw} from '../../responsive/responsive';

export default function RadioButton(props) {
  const {data, selected, setSelected, style, invalidInput} = props;

  return (
    <>
      <View style={style}>
        <View style={[styles.radioButtonView]}>
          {data.map((item, i) => (
            <TouchableOpacity
              key={i}
              style={styles.textAndRadioView}
              activeOpacity={1}
              onPress={() => setSelected(item)}>
              <View
                style={[
                  styles.radioCircle,
                  selected === item && styles.checkedCircle,
                ]}>
                <View style={styles.insideCircle}></View>
              </View>
              <ResponsiveText size={14} style={styles.radioLabel}>
                {item}
              </ResponsiveText>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.invalidInputView}>
          {invalidInput && <InvalidInput error={invalidInput} />}
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  radioCircle: {
    backgroundColor: '#eee',
    width: vw(4),
    height: vw(4),
    borderRadius: 100,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 8,
  },
  checkedCircle: {
    backgroundColor: '#fd7e14',
  },
  insideCircle: {
    backgroundColor: '#eee',
    width: vw(2),
    height: vw(2),
    borderRadius: 100,
  },
  textAndRadioView: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioButtonView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  radioLabel: {
    color: '#212529',
    fontFamily: 'Montserrat-Regular',
  },
  invalidInputView: {alignSelf: 'center'},
});
