import {useMutation} from '@apollo/client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useToast} from 'native-base';
import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {updateVolunteerSkills} from '../../../../../../graphql/mutations';
import {
  CustomButton,
  CustomCheckBox,
  CustomToast,
  ResponsiveText,
} from '../../../../../components';
import {widthPercentageToDP as vw} from '../../../../../responsive/responsive';
import {VolunteerContext} from '../../../../../shared/services/helper';

export default function Skills() {
  let {volunteer, setVolunteer} = useContext(VolunteerContext);
  let [selected, setSelected] = useState(volunteer?.skills);
  const [updateSkills, {loading}] = useMutation(updateVolunteerSkills);
  let toast = useToast();

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

  const handleSaveChanges = () => {
    console.log(selected,"selected?.length")
    if (selected?.length > 0) {
      updateSkills({
        variables: {
          input: {volunteerId: volunteer?.volunteerId, skills: selected},
        },
      })
        .then(_ => {
          let update = {
            ...volunteer,
            skills: selected,
          };
          setVolunteer(update);
          AsyncStorage.setItem('volunteer', JSON.stringify(update)).then(() => {
            renderToast('success', 'Skills successfully updated!');
          });
        })
        .catch(error => {
          renderToast('error', error.message);
        });
    } else {
      renderToast('warning', 'Please select a causes');
    }
  };

  function handleOnChange(item) {
    if (selected?.includes(item)) {
      let filtered = selected?.filter(ite => ite !== item);
      setSelected(filtered);
    } else {
      selected ? setSelected([...selected, item]) : setSelected([item]);
    }
  }

  function renderToast(type, description) {
    toast.show({
      placement: 'top',
      duration: 3000,
      render: () => <CustomToast type={type} description={description} />,
    });
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
      <CustomButton
        buttonText="SAVE CHANGES"
        onClick={() =>
          selected.length > 0
            ? handleSaveChanges()
            : renderToast('warning', 'Please select a skill')
        }
        isLoading={loading}
      />
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
