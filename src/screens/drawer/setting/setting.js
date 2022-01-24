import React, {useEffect, useState} from 'react';
import {
  FlatList,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  BasicInformation,
  Skills,
  Causes,
  ChangePassword,
} from './component/index';
import {DeleteConfirmationModal, ResponsiveText} from '../../../components';
import {widthPercentageToDP as vw} from '../../../responsive/responsive';
import {VolunteerContext} from '../../../shared/services/helper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useMutation} from '@apollo/client';
import {activateOrDeactivateVolunteer} from '../../../../graphql/mutations';

export default function Settings(props) {
  const {navigation} = props;
  let [index, setIndex] = useState(0);
  let [volunteer, setVolunteer] = useState();
  let [modal, setModal] = useState(false);
  const [deactivateMutationHandler, {loading}] = useMutation(
    activateOrDeactivateVolunteer,
  );

  let tabs = [
    {
      title: 'Basic Information',
      isFocused: false,
      component: <BasicInformation />,
    },
    {
      title: 'Skills',
      isFocused: false,
      component: <Skills />,
    },
    {
      title: 'Causes',
      isFocused: false,
      component: <Causes />,
    },
    {
      title: 'Change Password',
      isFocused: false,
      component: <ChangePassword />,
    },
    {
      title: 'Deactivate Account',
      isFocused: false,
      //   component: <Projects data={projects} />,
    },
  ];

  tabs[index].isFocused = tabs[index].isFocused ? false : true;

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      AsyncStorage.getItem('volunteer').then(res => {
        setVolunteer(JSON.parse(res));
      });
      setIndex(0);
    });

    return unsubscribe;
  }, []);

  let value = {volunteer, setVolunteer};

  function deactivateAccount() {
    setModal(!modal);
    // navigation.goBack();
    // deactivateMutationHandler({
    //   variables: {
    //     volunteerId: volunteer?.volunteerId,
    //     status: 'DEACTIVATE',
    //   },
    // })
    //   .then(({data}) => {
    //     toast.success('Account Deactivated!');
    //     if (data) {
    //       router.push('/');
    //     }
    //     console.log(data, 'dataaa');
    //     setModal(!modal);
    //   })
    //   .catch(err => {
    //     console.log('err.message', err.message);
    //     setModal(!modal);
    //   });
  }

  return (
    <>
      <VolunteerContext.Provider value={value}>
        <ScrollView style={style.flatListMainView}>
          <FlatList
            data={tabs}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={style.contentContainerStyle}
            renderItem={({item, index: i}) => (
              <TouchableOpacity
                onPress={() => (i === 4 ? setModal(!modal) : setIndex(i))}
                activeOpacity={0.5}>
                <ResponsiveText
                  size={13}
                  style={[style.tabText, item?.isFocused && style.focusedTab]}>
                  {item.title}
                </ResponsiveText>
              </TouchableOpacity>
            )}
          />
          {tabs[index].component}
        </ScrollView>
        <DeleteConfirmationModal
          isModalOpen={modal}
          setIsModalOpen={setModal}
          confrimDelete={deactivateAccount}
          // isLoading={isLoading}
          subTitle="Are you sure you want to deactivate your account?"
          title="Deactivate Account"
          buttonText="Deactivate"
        />
      </VolunteerContext.Provider>
    </>
  );
}

let style = StyleSheet.create({
  flatListMainView: {backgroundColor: '#fff'},
  tabText: {
    fontFamily: 'Poppins-SemiBold',
    color: '#212529',
    padding: 10,
  },
  focusedTab: {
    color: '#f06d06',
    borderBottomColor: '#f06d06',
    borderBottomWidth: 1,
  },
  contentContainerStyle: {
    justifyContent: 'space-around',
    flexGrow: 1,
    backgroundColor: '#fffaf4',
  },
});
