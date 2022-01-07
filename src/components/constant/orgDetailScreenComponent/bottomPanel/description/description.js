import React from 'react';
import {StyleSheet, View} from 'react-native';
import {EmptyDataComponent, ResponsiveText} from '../../../../common/common';

export default function Description(props) {
  const {org} = props;
  return (
    <View>
      {org?.description ? (
        <ResponsiveText size={13} style={style.description}>
          {org?.description}
        </ResponsiveText>
      ) : (
        <EmptyDataComponent title="No Description" />
      )}
    </View>
  );
}

let style = StyleSheet.create({
  description: {
    color: '#818181',
    fontFamily: 'Poppins-Regular',
  },
});
