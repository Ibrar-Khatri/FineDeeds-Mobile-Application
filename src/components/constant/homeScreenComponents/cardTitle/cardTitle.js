import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Foundation';
import {widthPercentageToDP as vw} from '../../../../responsive/responsive';
import ResponsiveText from '../../../common/responsiveText/responsiveText';
import style from './cardTitleStyle';
export default function CardTitle(props) {
  let {title, showLink} = props;
  return (
    <View style={style.mainView}>
      <ResponsiveText style={style.titleStyle} size={16}>
        {title}
      </ResponsiveText>
      {showLink && (
        <TouchableOpacity style={style.linkAndTextView}>
          <Icon name="refresh" color="#f06d06" size={vw(3.5)} />
          <ResponsiveText style={style.textStyle} size={10}>
            SEE ALL
          </ResponsiveText>
        </TouchableOpacity>
      )}
    </View>
  );
}
