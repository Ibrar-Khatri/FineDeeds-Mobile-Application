import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {ResponsiveText} from '../index';

export default function Tabs(props) {
  let {tabs, setIndex} = props;
  return (
    <View style={style.tabView}>
      {tabs.map((tab, i) => (
        <TouchableOpacity
          key={i}
          onPress={() => setIndex(i)}
          activeOpacity={0.5}>
          <ResponsiveText
            size={13}
            style={[style.tabText, tab.isFocused && style.focusedTab]}>
            {tab.title}
          </ResponsiveText>
        </TouchableOpacity>
      ))}
    </View>
  );
}

let style = StyleSheet.create({
  tabView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  tabText: {
    fontFamily: 'Poppins-SemiBold',
    color: '#212529',
    padding: 10,
  },
  focusedTab: {
    color: '#f06d06',
    borderBottomColor: '#f06d06',
    borderBottomWidth: 1,
  },
});
