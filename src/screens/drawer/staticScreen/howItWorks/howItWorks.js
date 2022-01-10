import React, {useState} from 'react';
import {ScrollView, StyleSheet, TouchableOpacity} from 'react-native';
import {
  heightPercentageToDP as vh,
  widthPercentageToDP as vw,
} from '../../../../responsive/responsive';
import {ResponsiveText} from '../../../../components/index';
import {HowItWorksCard} from './components/index';

export default function HowItWorks() {
  let [isOganization, setIsOganization] = useState(true);
  let [isVolunteer, setIsVolunteer] = useState(true);

  let volunteer = [
    {
      title: 'Explore',
      about:
        'Start with exploring non-profits, projects, activities and events arounds you',
      image: require('../../../../assets/images/how-vol-1.png'),
    },
    {
      title: 'Initiate activities',
      about:
        'Fundraising, Events , Project and Contributor management, collaboration & communicaton all on a single platform',
      image: require('../../../../assets/images/how-vol-2.png'),
    },
    {
      title: 'Inspire',
      about:
        'A selfless act always sparks another” Read volunteer stories and spread positivity by sharing yours',
      image: require('../../../../assets/images/how-vol-3.png'),
    },
    {
      title: 'Be a part of projects',
      about:
        'Get to work with non-profit projects based on your previous experience and interest areas. Donate your time and skill for the betterment of the society',
      image: require('../../../../assets/images/how-vol-4.png'),
    },
  ];
  let organization = [
    {
      title: 'Explore',
      about:
        'Start with exploring non-profits, projects, activities and events arounds you',
      image: require('../../../../assets/images/how-vol-1.png'),
    },
    {
      title: 'Initiate activities',
      about:
        'Fundraising, Events , Project and Contributor management, collaboration & communicaton all on a single platform',
      image: require('../../../../assets/images/how-vol-2.png'),
    },
    {
      title: 'Inspire',
      about:
        'A selfless act always sparks another” Read volunteer stories and spread positivity by sharing yours',
      image: require('../../../../assets/images/how-vol-3.png'),
    },
    {
      title: '  Measure growth',
      about:
        'A special dashboard for non-profits helps measure growth, manage events and projects, through analytics',
      image: require('../../../../assets/images/how-org-4.png'),
    },
    {
      title: 'Add members',
      about:
        'Grow your team and inturn, the impact of your intended good deeds. Volunteers around the world can show interest in your non-profit and be a part of your team',
      image: require('../../../../assets/images/how-vol-5.png'),
    },
  ];

  return (
    <ScrollView style={style.howItWorksMainView}>
      <TouchableOpacity
        style={[style.textView, isVolunteer && style.focusTextView]}
        onPress={() =>
          isVolunteer ? setIsVolunteer(false) : setIsVolunteer(true)
        }>
        <ResponsiveText
          style={[style.textStyle, isVolunteer && style.focusTextStyle]}
          size={16}>
          Volunteer
        </ResponsiveText>
      </TouchableOpacity>
      {isVolunteer &&
        volunteer.map((item, i) => (
          <HowItWorksCard
            key={i}
            index={i}
            image={item.image}
            title={item.title}
            about={item.about}
          />
        ))}
      <TouchableOpacity
        style={[style.textView, isOganization && style.focusTextView]}
        onPress={() =>
          isOganization ? setIsOganization(false) : setIsOganization(true)
        }>
        <ResponsiveText
          size={15}
          style={[style.textStyle, isOganization && style.focusTextStyle]}>
          Organization
        </ResponsiveText>
      </TouchableOpacity>
      {isOganization &&
        organization.map((item, i) => (
          <HowItWorksCard
            key={i}
            index={i}
            image={item.image}
            title={item.title}
            about={item.about}
          />
        ))}
    </ScrollView>
  );
}

let style = StyleSheet.create({
  howItWorksMainView: {
    backgroundColor: '#fff',
  },
  textView: {
    height: vh(8),
    display: 'flex',
    justifyContent: 'center',
    width: vw(90),
    alignSelf: 'center',
  },
  textStyle: {
    fontFamily: 'Montserrat-Bold',
    color: '#2b2b2b',
  },
  focusTextView: {
    borderBottomColor: '#f06d06',
    borderBottomWidth: 1,
  },
  focusTextStyle: {color: '#f06d06'},
});
