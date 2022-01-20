import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, TouchableOpacity, View} from 'react-native';
import {
  BasicInformation,
  Skills,
  Causes,
  ChangePassword,
} from './component/index';
import {ResponsiveText} from '../../../components';
import {widthPercentageToDP as vw} from '../../../responsive/responsive';
import {VolunteerContext} from '../../../shared/services/helper';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Settings() {
  let [index, setIndex] = useState(0);
  let [volunteer, setVolunteer] = useState();

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
    AsyncStorage.getItem('volunteer').then(res => {
      setVolunteer(JSON.parse(res));
    });
  }, []);

  let value = {volunteer, setVolunteer};

  return (
    <>
      <VolunteerContext.Provider value={value}>
        <View style={style.flatListMainView}>
          <FlatList
            data={tabs}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={style.contentContainerStyle}
            renderItem={({item, index: i}) => (
              <TouchableOpacity onPress={() => setIndex(i)} activeOpacity={0.5}>
                <ResponsiveText
                  size={13}
                  style={[style.tabText, item?.isFocused && style.focusedTab]}>
                  {item.title}
                </ResponsiveText>
              </TouchableOpacity>
            )}
          />
        </View>
        <View style={style.tabComponentsView}>{tabs[index].component}</View>
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
  },
});
