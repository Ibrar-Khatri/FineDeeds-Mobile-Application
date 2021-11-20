import React from 'react';
import {View, Text, ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import termsAndCondition from '../../../shared/helperData/termsAndCondition.json';
import style from './termsAndConditionStyle';

export default function TermsAndCondition() {
  return (
    <ScrollView>
      <View style={style.mainView}>
        {termsAndCondition.map((item, index) => {
          return (
            <View key={index} style={item.card && style.contentInCard}>
              <Text style={style.title}>{item.title}</Text>
              {item.content.map(content => {
                return !content.card ? (
                  content.icon ? (
                    <View style={style.textWithIcon} key={Math.random()}>
                      <Icon name="checkcircle" size={20} color="#f06d06" />
                      <Text style={style.text}>{content.text}</Text>
                    </View>
                  ) : (
                    <Text style={style.textWithoutIcon} key={Math.random()}>
                      {content.text}
                    </Text>
                  )
                ) : (
                  <View style={style.contentInCard} key={Math.random()}>
                    <Text style={style.textWithoutIcon}>{content.text}</Text>
                  </View>
                );
              })}
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
}
