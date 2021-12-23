import React, {useState} from 'react';
import {Dimensions, StyleSheet, TouchableOpacity, View} from 'react-native';
import {Menu} from 'native-base';
import Octicons from 'react-native-vector-icons/Octicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  normalize,
  widthPercentageToDP as vw,
} from '../../../../../responsive/responsive';
import ResponsiveText from '../../../../common/responsiveText/responsiveText';

const screenWidth = Dimensions.get('window').width;

export default function ProExperinceCard(props) {
  const {
    data,
    setConfirmationModal,
    setProExperienceId,
    setIsModalOpen,
    formik,
    setShowInvalidInput,
    authorized,
  } = props;

  function onMenuItemPress(type) {
    setIsOpen(false);
    setProExperienceId(data.proExpid);

    if (type === 'edit') {
      setIsModalOpen(true);
      setShowInvalidInput(false);
      formik.setFieldValue('jobTitle', data.jobTitle);
      formik.setFieldValue('orgName', data.orgName);
      formik.setFieldValue('fromDate', data.fromDate);
      formik.setFieldValue('endDate', data.endDate);
      formik.setFieldValue('isCurrent', data.isCurrent);
      formik.setFieldValue('description', data.description);
    } else {
      setConfirmationModal(true);
    }
  }
  const [isOpen, setIsOpen] = useState(false);

  return (
    <View style={style.volunteerExpView}>
      <View style={style.volunteerExpDetView}>
        <ResponsiveText style={style.jobTitle} size={13}>
          {data.jobTitle}
        </ResponsiveText>
        <ResponsiveText style={style.jobDes} size={11}>
          {data.orgName}
        </ResponsiveText>
        {data?.description ? (
          <ResponsiveText style={style.jobDes} size={11}>
            {data?.description}
          </ResponsiveText>
        ) : null}
      </View>
      {authorized && (
        <View style={style.iconView}>
          <Menu
            closeOnSelect={true}
            style={style.menuView}
            w={screenWidth > 480 ? '200' : '160'}
            isOpen={isOpen}
            placement="bottom right"
            onClose={() => setIsOpen(false)}
            trigger={triggerProps => {
              return (
                <TouchableOpacity
                  {...triggerProps}
                  onPress={() => setIsOpen(true)}>
                  <MaterialCommunityIcons
                    name="dots-vertical"
                    size={normalize(17)}
                  />
                </TouchableOpacity>
              );
            }}>
            <Menu.Item
              style={style.menuItemView}
              onPress={() => onMenuItemPress('edit')}>
              <Octicons name="pencil" size={normalize(15)} color="#f06d06" />
              <ResponsiveText size={14} style={style.menuItemText}>
                Edit
              </ResponsiveText>
            </Menu.Item>
            <Menu.Item style={style.menuItemView} onPress={onMenuItemPress}>
              <MaterialIcons
                name="delete"
                size={normalize(15)}
                color="#e82727"
              />
              <ResponsiveText size={14} style={style.menuItemText}>
                Delete
              </ResponsiveText>
            </Menu.Item>
          </Menu>
        </View>
      )}
    </View>
  );
}

let style = StyleSheet.create({
  volunteerExpDetView: {
    paddingLeft: 5,
    width: '85%',
  },
  volunteerExpView: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 15,
    paddingBottom: 7,
    borderBottomColor: ' rgba(0,0,0,.1)',
    borderBottomWidth: 1,
  },
  jobTitle: {
    color: '#212529',
    fontWeight: '500',
    marginBottom: 5,
  },
  jobDes: {
    color: 'rgba(0,0,0,.5)',
  },
  iconView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  menuView: {
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.41,
    shadowRadius: 9.11,

    elevation: 14,
  },
  menuItemView: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemText: {
    fontFamily: 'Montserrat-Regular',
    color: '#212529',
    marginLeft: 7,
  },
});
