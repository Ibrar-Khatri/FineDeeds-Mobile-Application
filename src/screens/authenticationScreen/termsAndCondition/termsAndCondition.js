import React from 'react';
import {View, ScrollView, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {ResponsiveText} from '../../../components/index';
import {normalize} from '../../../responsive/responsive';
import termsAndCondition from '../../../shared/helperData/termsAndCondition.json';
import {
  heightPercentageToDP as vh,
  widthPercentageToDP as vw,
} from '../../../responsive/responsive';

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

let style = StyleSheet.create({
  mainView: {
    marginLeft: vw(8),
    marginRight: vw(8),
    marginTop: vh(5),
    marginBottom: vh(7),
    display: 'flex',
    alignItems: 'center',
  },
  title: {
    color: '#212529',
    fontWeight: '700',
    marginTop: 10,
    marginBottom: 10,
    textAlign: 'center',
  },
  textWithoutIcon: {
    color: '#212529',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  textWithIcon: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: vw(80),
    marginTop: 10,
    marginBottom: 10,
  },
  text: {
    color: '#212529',
    marginLeft: vw(3),
    textAlign: 'center',
    width: vw(70),
  },
  contentInCard: {
    backgroundColor: '#fffaf3',
    borderRadius: 20,
    paddingLeft: vw(5),
    paddingRight: vw(5),
    marginTop: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
});
