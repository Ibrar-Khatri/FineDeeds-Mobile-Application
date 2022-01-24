import React, {useContext, useEffect, useState} from 'react';
import {useMutation} from '@apollo/client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useToast} from 'native-base';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {updateVolunteerCauses} from '../../../../../../graphql/mutations';
import {
  CustomButton,
  CustomCheckBox,
  CustomToast,
  ResponsiveText,
} from '../../../../../components';
import {widthPercentageToDP as vw} from '../../../../../responsive/responsive';
import {VolunteerContext} from '../../../../../shared/services/helper';

export default function Causes() {
  let {volunteer, setVolunteer} = useContext(VolunteerContext);
  let [selected, setSelected] = useState(volunteer?.causes);
  const [updateCauses, {loading}] = useMutation(updateVolunteerCauses);
  let toast = useToast();

  const causes = [
    'Animals',
    'Arts & Culture',
    'Civil Rights',
    'Community & Economic Development',
    'Disaster Relief',
    'Disease & Medical Research',
    'Diversity & Inclusion',
    'Education',
    'Employment Services',
    'Environment',
    'Health & Nutrition',
    'Housing & Homelessness',
    'Human Services',
    'International Affairs',
    'Justice & Legal Services',
    'LGBTQ+',
    'Maternal Health',
    'Military & Veterans Affairs',
    'Philanthropy & Capacity Building',
    'Religion & Spirituality',
    'Science & Technology',
    'Violence Prevention',
    'Women’s Issues',
    'Youth Development',
  ];

  const handleSaveChanges = () => {
    if (selected.length > 0) {
      updateCauses({
        variables: {
          input: {volunteerId: volunteer?.volunteerId, causes: selected},
        },
      })
        .then(_ => {
          let update = {
            ...volunteer,
            causes: selected,
          };
          setVolunteer(update);
          AsyncStorage.setItem('volunteer', JSON.stringify(update)).then(() => {
            renderToast('success', 'Causes successfully updated!');
          });
        })
        .catch(error => {
          renderToast('error', error.message);
        });
    } else {
      renderToast('warning', 'Please select a skill');
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
    <View style={style.causesMainView}>
      {causes?.map((item, i) => (
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
        onClick={handleSaveChanges}
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
  causesMainView: {
    margin: vw(3),
  },
});
