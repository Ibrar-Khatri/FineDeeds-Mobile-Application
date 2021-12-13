import React from 'react';
import {View, ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import ResponsiveText from '../../../components/common/responsiveText/responsiveText';
import {normalize} from '../../../responsive/responsive';
import termsAndCondition from '../../../shared/helperData/termsAndCondition.json';
import style from './termsAndConditionStyle';

export default function TermsAndCondition() {
  return (
    <ScrollView>
      <View style={style.mainView}>
        {termsAndCondition.map((item, index) => {
          return (
            <View key={index} style={item.card && style.contentInCard}>
              <ResponsiveText style={style.title} size={16}>
                {item.title}
              </ResponsiveText>
              {item.content.map(content => {
                return !content.card ? (
                  content.icon ? (
                    <View style={style.textWithIcon} key={Math.random()}>
                      <Icon
                        name="checkcircle"
                        size={normalize(15)}
                        color="#f06d06"
                      />
                      <ResponsiveText style={style.text} size={12}>
                        {content.text}
                      </ResponsiveText>
                    </View>
                  ) : (
                    <ResponsiveText
                      style={style.textWithoutIcon}
                      key={Math.random()}
                      size={12}>
                      {content.text}
                    </ResponsiveText>
                  )
                ) : (
                  <View style={style.contentInCard} key={Math.random()}>
                    <ResponsiveText style={style.textWithoutIcon} size={12}>
                      {content.text}
                    </ResponsiveText>
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
