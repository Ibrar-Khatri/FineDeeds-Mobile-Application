import React, {useState} from 'react';
import {ScrollView, Text, TouchableOpacity} from 'react-native';
import HowItWorksCard from '../../../../components/constant/howItWorkScreenComponents/howItWorkCard/howItWorkCard';
import style from './howItWorksStyle';

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
        <Text style={[style.textStyle, isVolunteer && style.focusTextStyle]}>
          Volunteer
        </Text>
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
        <Text style={[style.textStyle, isOganization && style.focusTextStyle]}>
          Organization
        </Text>
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
