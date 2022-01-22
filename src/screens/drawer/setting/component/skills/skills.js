import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {
  CustomButton,
  CustomCheckBox,
  ResponsiveText,
} from '../../../../../components';
import {widthPercentageToDP as vw} from '../../../../../responsive/responsive';
import {VolunteerContext} from '../../../../../shared/services/helper';

export default function Skills() {
  let {volunteer, setVolunteer} = useContext(VolunteerContext);
  let [selected, setSelected] = useState(volunteer?.skills);

  const skills = [
    'Accounting',
    'Branding',
    'Business',
    'Development',
    'Coaching',
    'Communications',
    'Data Analysis',
    'Database Administration',
    'Digital Advertising',
    'Digital Marketing',
    'Engineering',
    'Entrepreneurship',
    'Event',
    'Planning',
    'Executive',
    'Leadership',
    'Finance',
    'Fundraising',
    'Graphic Design',
    'Human Resources',
    'Information Technology',
    'Management',
    'Marketing',
    'Organisational',
    'Design',
    'Photography and Video',
    'Project Management',
    'Public Relations',
    'Research',
    'Sales',
    'Search Engine Marketing',
    'Social Media',
    'Sound Editing',
    'Strategy Consulting',
    'Talent Recruitment',
    'Training',
    'Web Design',
    'Web Development',
    'Writing',
  ];

  function handleOnChange(item) {
    if (selected?.includes(item)) {
      let filtered = selected?.filter(ite => ite !== item);
      setSelected(filtered);
    } else {
      selected ? setSelected([...selected, item]) : setSelected([item]);
    }
  }

  return (
    <View style={style.skillsMainView}>
      {skills?.map((item, i) => (
        <TouchableOpacity
          key={i}
          activeOpacity={1}
          onPress={() => handleOnChange(item)}
          style={style.checkBoxAndTextView}>
          <CustomCheckBox
            isChecked={selected?.includes(item)}
            callOnPress={() => handleOnChange(item)}
          />
          <ResponsiveText style={style.checkBoxText} size={12}>
            {item}
          </ResponsiveText>
        </TouchableOpacity>
      ))}
      <CustomButton buttonText="SAVE CHANGES" />
    </View>
  );
}

const style = StyleSheet.create({
  checkBoxAndTextView: {
    display: 'flex',
    flexDirection: 'row',
    margin: 10,
    alignItems: 'center',
  },
  checkBoxText: {
    color: '#212529',
  },
  skillsMainView: {
    margin: vw(3),
  },
});
