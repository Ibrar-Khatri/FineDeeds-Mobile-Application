import React, {useEffect, useState} from 'react';
import {TouchableOpacity, View, FlatList} from 'react-native';
import {useToast} from 'native-base';
import {useMutation} from '@apollo/client';
import Icon from 'react-native-vector-icons/Octicons';
import CustomCheckBox from '../../../common/customCheckBox/customCheckBox';
import CustomToast from '../../../common/customToast/customToast';
import ModalWrapper from '../../../common/modalWrapper/modalWrapper';
import ProfileScreenCardWrapper from '../profileScreenCardWrapper/profileScreenCardWrapper';
import style from './itemsSelectorCardStyle';
import {
  updateVolunteerCauses,
  updateVolunteerSkills,
} from '../../../../../graphql/mutations';
import AsyncStorage from '@react-native-async-storage/async-storage';
import EmptyDataComponent from '../../../common/emptyDataComponent/emptyDataComponent';
import {
  heightPercentageToDP as vh,
  normalize,
} from '../../../../responsive/responsive';
import ResponsiveText from '../../../common/responsiveText/responsiveText';
import Tag from '../../../common/tag/tag';

export default function ItemsSelectorCard(props) {
  let {title, selectedItems, volunteer, setVolunteer, authorized} = props;
  let [isModalOpen, setIsModalOpen] = useState(false);
  let [modalTitle, setModalTitle] = useState();
  let [allItems, setAllItems] = useState();
  let [update, setUpdate] = useState();
  let [isLoading, setIsLoading] = useState(false);
  let [updateSkills, updatedSkills] = useMutation(updateVolunteerSkills);
  let [updateCauses, updatedCauses] = useMutation(updateVolunteerCauses);
  let toast = useToast();

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
    setUpdate(selectedItems);
    if (title === 'Skills') {
      setModalTitle('Add skills');
      setAllItems(skills);
    } else {
      setModalTitle('Add causes');
      setAllItems(causes);
    }
    setIsModalOpen(true);
  }

  if ((updatedSkills?.data || updatedCauses?.data) && isLoading) {
    setIsModalOpen(false);
    setIsLoading(false);
    let updated =
      title === 'Skills'
        ? {...volunteer, skills: update}
        : {...volunteer, causes: update};

    AsyncStorage.setItem('volunteer', JSON.stringify(updated)).then(() => {
      toast.show({
        placement: 'top',
        duration: 2000,
        render: () => (
          <CustomToast
            type="success"
            description={`${title} successfully updated`}
          />
        ),
      });
      setVolunteer(updated);
    });
  }
  let handleOnSaveChanges = () => {
    if (update?.length) {
      setIsLoading(true);
      setIsLoading(true);
      title === 'Skills'
        ? updateSkills({
            variables: {
              input: {volunteerId: volunteer.volunteerId, skills: update},
            },
          })
        : updateCauses({
            variables: {
              input: {volunteerId: volunteer.volunteerId, causes: update},
            },
          });
    } else {
      setIsModalOpen(false);
      toast.show({
        placement: 'top',
        duration: 2000,
        render: () => (
          <CustomToast
            type="error"
            description={`Please select any one of ${title}`}
          />
        ),
      });
    }
  };
  function handleOnChange(item) {
    if (update?.includes(item)) {
      let filtered = update?.filter(ite => ite !== item);
      setUpdate(filtered);
    } else {
      update ? setUpdate([...update, item]) : setUpdate([item]);
    }
  }

  function closeModal() {
    setIsModalOpen(false);
  }

  return (
    <ProfileScreenCardWrapper>
      <View style={style.titleAndIconView}>
        <ResponsiveText style={style.titleStyle} size={14}>
          {title}
        </ResponsiveText>
        {authorized && (
          <TouchableOpacity onPress={openModal}>
            <Icon name="pencil" size={normalize(15)} color="#f06d06" />
          </TouchableOpacity>
        )}
      </View>
      <View style={style.itemMainView}>
        {selectedItems ? (
          selectedItems?.map((item, i) => (
            <Tag key={i} text={item} borderColor="#f06f07" />
          ))
        ) : (
          <EmptyDataComponent title={title} />
        )}
      </View>

      {isModalOpen && (
        <ModalWrapper
          onBackButtonPress={closeModal}
          onBackdropPress={closeModal}
          closeModalIcon={closeModal}
          isModalOpen={isModalOpen}
          title={modalTitle}
          isLoading={isLoading}
          buttonText="Save Changes"
          onClickFun={handleOnSaveChanges}>
          {allItems?.map((item, i) => (
            <TouchableOpacity
              key={i}
              activeOpacity={1}
              onPress={() => handleOnChange(item)}
              style={style.checkBoxAndTextView}>
              <CustomCheckBox
                isChecked={update?.includes(item)}
                callOnPress={() => handleOnChange(item)}
              />
              <ResponsiveText style={style.checkBoxText} size={12}>
                {item}
              </ResponsiveText>
            </TouchableOpacity>
          ))}
        </ModalWrapper>
      )}
    </ProfileScreenCardWrapper>
  );
}
