import React, {useEffect, useState} from 'react';
import {TouchableOpacity, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/Octicons';
import CustomCheckBox from '../../../common/customCheckBox/customCheckBox';
import ModalWrapper from '../../../common/modalWrapper/modalWrapper';
import ProfileScreenCardWrapper from '../profileScreenCardWrapper/profileScreenCardWrapper';
import style from './itemsSelectorCardStyle';

export default function ItemsSelectorCard(props) {
  let {title, selectedItems} = props;
  let [isModalOpen, setIsModalOpen] = useState(false);
  let [modalTitle, setModalTitle] = useState();
  let [allItems, setAllItems] = useState();
  let [selected, setSelected] = useState();
  let [update, setUpdate] = useState();

  useEffect(() => {
    setSelected(selectedItems);
  }, [selectedItems]);

  let skills = [
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
  let causes = [
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

  function openModal() {
    setUpdate(selected);
    if (title === 'Skills') {
      setModalTitle('Add skills');
      setAllItems(skills);
    } else if (title === 'Causes') {
      setModalTitle('Add causes');
      setAllItems(causes);
    }
    setIsModalOpen(true);
  }
  function handleOnSaveChanges() {
    setIsModalOpen(false);
    setSelected(update);
  }
  function handleOnChange(item) {
    if (update?.includes(item)) {
      let filtered = update.filter(ite => ite !== item);
      setUpdate(filtered);
    } else {
      setUpdate([...update, item]);
    }
  }

  return (
    <ProfileScreenCardWrapper>
      <View style={style.titleAndIconView}>
        <Text style={style.titleStyle}>{title}</Text>
        <TouchableOpacity>
          <Icon name="pencil" size={18} color="#f06d06" onPress={openModal} />
        </TouchableOpacity>
      </View>
      <View style={style.itemMainView}>
        {selected?.map((item, i) => (
          <View key={i} style={style.itemView}>
            <Text style={style.itemText}>{item}</Text>
          </View>
        ))}
      </View>

      {isModalOpen && (
        <ModalWrapper
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          title={modalTitle}
          onClick={handleOnSaveChanges}>
          {allItems?.map((item, i) => (
            <TouchableOpacity
              key={i}
              activeOpacity={0.5}
              onPress={() => handleOnChange(item)}
              style={style.checkBoxAndTextView}>
              <CustomCheckBox isChecked={update?.includes(item)} />
              <Text style={style.checkBoxText}>{item}</Text>
            </TouchableOpacity>
          ))}
        </ModalWrapper>
      )}
    </ProfileScreenCardWrapper>
  );
}
