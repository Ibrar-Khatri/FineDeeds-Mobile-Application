import React, {useState} from 'react';
import {FlatList, StyleSheet, TouchableOpacity, View} from 'react-native';
import {ResponsiveText, Tabs} from '../../../components';
import {widthPercentageToDP as vw} from '../../../responsive/responsive';

export default function Settings() {
  let [index, setIndex] = useState(0);
  let tabs = [
    {
      title: 'Basic Information',
      isFocused: false,
      //   component: <Description org={org} />,
    },
    {
      title: 'Skills',
      isFocused: false,
      //   component: <OurTeam orgVolunteers={orgVolunteers} orgStaff={orgStaff} />,
    },
    {
      title: 'Causes',
      isFocused: false,
      //   component: (
      //     <Events pastEvents={pastEvents} upcomingEvents={upcomingEvents} />
      //   ),
    },
    {
      title: 'Change Password',
      isFocused: false,
      //   component: <Projects data={projects} />,
    },
    {
      title: 'Deactivate Account',
      isFocused: false,
      //   component: <Projects data={projects} />,
    },
  ];
  tabs[index].isFocused = tabs[index].isFocused ? false : true;

  return (
    <>
      <View style={style.flatListMainView}>
        <FlatList
          data={tabs}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={style.contentContainerStyle}
          renderItem={({item, i}) => (
            <TouchableOpacity onPress={() => setIndex(i)} activeOpacity={0.5}>
              <ResponsiveText
                size={13}
                style={[style.tabText, item.isFocused && style.focusedTab]}>
                {item.title}
              </ResponsiveText>
            </TouchableOpacity>
          )}
        />
      </View>
    </>
  );
}

let style = StyleSheet.create({
  flatListMainView: {backgroundColor: '#fff', height: vw(10)},
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
