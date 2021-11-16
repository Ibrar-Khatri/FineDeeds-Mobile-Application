import React from 'react';
import {TouchableOpacity, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/Octicons';
import {styles} from 'styled-system';
import ProfileScreenCardWrapper from '../profileScreenCardWrapper/profileScreenCardWrapper';
import style from './itemsSelectorCardStyle';
export default function ItemsSelectorCard(props) {
  let {title, items} = props;
  return (
    <ProfileScreenCardWrapper>
      <View style={style.titleAndIconView}>
        <Text style={style.titleStyle}>{title}</Text>
        <TouchableOpacity>
          <Icon name="pencil" size={18} color="#f06d06" />
        </TouchableOpacity>
      </View>
      <View style={style.itemMainView}>
        {items?.map((item, i) => (
          <View key={i} style={style.itemView}>
            <Text style={style.itemText}>{item}</Text>
          </View>
        ))}
      </View>
    </ProfileScreenCardWrapper>
  );
}
