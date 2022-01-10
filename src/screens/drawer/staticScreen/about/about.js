import {View} from 'native-base';
import React from 'react';
import {Image, ScrollView, StyleSheet} from 'react-native';
import {ResponsiveText} from '../../../../components/index';
import {
  heightPercentageToDP as vh,
  widthPercentageToDP as vw,
} from '../../../../responsive/responsive';

export default function About() {
  return (
    <ScrollView>
      <View style={style.aboutMainView}>
        <View style={style.titleView}>
          <ResponsiveText style={style.titleText} size={18}>
            About Finedeeds
          </ResponsiveText>
        </View>
        <Image
          source={require('../../../../assets/images/ripple_effect_of_goodness.png')}
          style={style.imageStyle}
          resizeMode="contain"
        />
        <View style={style.contentView}>
          <View style={style.contentParaView}>
            <ResponsiveText style={style.contentText} size={12}>
              Finedeeds has a simple mission,{' '}
              <ResponsiveText style={style.higlightedText} size={12}>
                to connect every person who needs help to every person who could
                help
              </ResponsiveText>{' '}
              . We strive to bring the world together, making it more
              inclusive,loving, and caring. We enable people to drive change
              through their time and talent.
            </ResponsiveText>
          </View>
          <View style={style.contentParaView}>
            <ResponsiveText style={style.contentText} size={12}>
              Finedeeds provides you a platform to engage with nonprofits in a
              meaningful way. While monetary or material donations are a way to
              help those in need, there is a gap in the humanitarian aid
              sector.The gaps are:
            </ResponsiveText>
            <ResponsiveText style={style.contentText} size={12}>
              - Non-profit organizations struggle to find volunteers to work
              when they need them.
            </ResponsiveText>
            <ResponsiveText style={style.contentText} size={12}>
              - They also lack resources who can handle their admin,
              marketing,promotional, or specific events related to ad-hoc work
              or have to spend a fortune on that. Money that could otherwise be
              used to achieve its goals.
            </ResponsiveText>
            <ResponsiveText style={style.contentText} size={12}>
              - There are people who want to help non-profits by means of their
              skills and in their own time but they do not find the right
              opportunities.
            </ResponsiveText>
            <ResponsiveText style={style.contentText} size={12}>
              - The stories of goodness are often lost, we need them to reach
              out to the world and inspire others so that we motivate people to
              come out and help others
            </ResponsiveText>
          </View>
          <View style={style.contentParaView}>
            <ResponsiveText style={style.contentText} size={12}>
              Finedeeds lets you connect with like-minded people, share your
              stories, inspire others. We are a goodness platform - where we
              provide a common interface for non-profits and volunteers to
              engage with each other and{' '}
              <ResponsiveText style={style.higlightedText} size={12}>
                create a ripple effect of goodness
              </ResponsiveText>{' '}
              around them.
            </ResponsiveText>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

let contentText = {
  color: '#848383',
};

let style = StyleSheet.create({
  aboutMainView: {
    backgroundColor: '#fff',
  },
  imageStyle: {
    height: vw(60),
    alignSelf: 'center',
    marginTop: 30,
  },
  titleView: {
    height: vh(15),
    backgroundColor: '#fffaf4',
    justifyContent: 'center',
  },
  titleText: {
    color: '#212529',
    textAlign: 'center',
    fontFamily: 'Merriweather-Black',
  },
  contentView: {
    margin: 30,
  },
  contentParaView: {
    marginTop: 25,
  },
  contentText: {
    ...contentText,
    fontFamily: 'Montserrat-Regular',
  },
  higlightedText: {
    ...contentText,
    fontFamily: 'Montserrat-Bold',
  },
});
