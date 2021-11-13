import {View} from 'native-base';
import React from 'react';
import {Image, ScrollView, Text} from 'react-native';
import style from './aboutStyle';

export default function About() {
  return (
    <ScrollView>
      <View style={style.aboutMainView}>
        <Text style={style.titleText}>About FineDeeds</Text>
        <Image
          source={require('../../../assets/images/ripple_effect_of_goodness.png')}
          style={style.imageStyle}
          resizeMode='contain'
        />
        <View style={style.contentView}>
          <View style={style.contentParaView}>
            <Text style={style.contentText}>
              Finedeeds has a simple mission,{' '}
              <Text style={style.higlightedText}>
                to connect every person who needs help to every person who could
                help
              </Text>{' '}
              . We strive to bring the world together, making it more
              inclusive,loving, and caring. We enable people to drive change
              through their time and talent.
            </Text>
          </View>
          <View style={style.contentParaView}>
            <Text style={style.contentText}>
              Finedeeds provides you a platform to engage with nonprofits in a
              meaningful way. While monetary or material donations are a way to
              help those in need, there is a gap in the humanitarian aid
              sector.The gaps are:
            </Text>
            <Text style={style.contentText}>
              - Non-profit organizations struggle to find volunteers to work
              when they need them.
            </Text>
            <Text style={style.contentText}>
              - They also lack resources who can handle their admin,
              marketing,promotional, or specific events related to ad-hoc work
              or have to spend a fortune on that. Money that could otherwise be
              used to achieve its goals.
            </Text>
            <Text style={style.contentText}>
              - There are people who want to help non-profits by means of their
              skills and in their own time but they do not find the right
              opportunities.
            </Text>
            <Text style={style.contentText}>
              - The stories of goodness are often lost, we need them to reach
              out to the world and inspire others so that we motivate people to
              come out and help others
            </Text>
          </View>
          <View style={style.contentParaView}>
            <Text style={style.contentText}>
              Finedeeds lets you connect with like-minded people, share your
              stories, inspire others. We are a goodness platform - where we
              provide a common interface for non-profits and volunteers to
              engage with each other and{' '}
              <Text style={style.higlightedText}>
                create a ripple effect of goodness
              </Text>{' '}
              around them.
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
