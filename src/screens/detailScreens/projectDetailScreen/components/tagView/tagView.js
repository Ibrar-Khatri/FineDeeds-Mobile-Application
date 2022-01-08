import React from 'react';
import {StyleSheet, View} from 'react-native';
import {ResponsiveText, Tag} from '../../../../../components/common/common';
import {widthPercentageToDP as vw} from '../../../../../responsive/responsive';

export default function TagView(props) {
  const {title, tags} = props;

  return (
    <View>
      <ResponsiveText style={style.typeTitle} size={14}>
        {title}
      </ResponsiveText>
      <View style={style.skillsAndCausesView}>
        {tags.map((cause, i) => {
          return <Tag key={i} bgColor="#ffe8ca" text={cause} />;
        })}
      </View>
    </View>
  );
}

let style = StyleSheet.create({
  typeTitle: {
    fontFamily: 'Montserrat-Bold',
    color: '#212529',
    marginTop: vw(4),
  },
  skillsAndCausesView: {
    margin: vw(2),
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});
