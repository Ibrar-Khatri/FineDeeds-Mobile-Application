import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Dimensions, StyleSheet, TouchableOpacity, View} from 'react-native';
import {widthPercentageToDP as vw} from '../../../../responsive/responsive';
import {renderDate} from '../../../../shared/services/helper';
import {RenderS3Image, ResponsiveText, Tag} from '../../common';
import CardWrapper from '../cardWrapper/cardWrapper';

const screenWidth = Dimensions.get('window').width;

export default function ProjectCard(props) {
  const {data} = props;
  const navigation = useNavigation();
  const causes = data?.organization?.areaOfWorking.join(', ');

  function navigateTo() {
    navigation.push('detail-screen', {
      initialRouteName: 'project_detail',
      data: data,
      title: data?.projectName,
    });
  }
  return (
    <CardWrapper onPress={navigateTo}>
      <View style={style.mainView}>
        <ResponsiveText size={15} style={style.projectTitle}>
          {data?.projectName}
        </ResponsiveText>
        <ResponsiveText size={12} style={style.projectDes} numberOfLines={3}>
          {data?.projectShortDescription}
        </ResponsiveText>
        <View style={style.logoAndNameView}>
          <RenderS3Image
            s3Key={
              data && `ORGANIZATION/LOGO/${data?.organization?.orgId}.webp`
            }
            style={style.orgLogo}
          />
          <ResponsiveText size={14} style={style.orgName}>
            {data?.organization?.orgName}
          </ResponsiveText>
        </View>
        <ResponsiveText size={14} style={style.type} numberOfLines={1}>
          Causes :{' '}
          <ResponsiveText size={14} style={style.causes}>
            {causes}
          </ResponsiveText>
        </ResponsiveText>
        <View style={style.skillView}>
          <ResponsiveText size={14} style={style.type}>
            Skills :{' '}
          </ResponsiveText>
          <Tag text={data?.skills[0]} borderColor="#c4c4c4" />
          {data?.skills?.length - 1 > 0 && (
            <Tag
              text={`+${data?.skills?.length - 1} more`}
              borderColor="#f06f07"
              color="#f06f07"
            />
          )}
        </View>
        <ResponsiveText size={12} style={style.postedOn}>
          Posted on {renderDate(data?.createdAt)}
        </ResponsiveText>
      </View>
    </CardWrapper>
  );
}

const style = StyleSheet.create({
  mainView: {
    padding: 20,
  },
  projectTitle: {
    fontFamily: 'Montserrat-Bold',
    color: '#212529',
    marginBottom: vw(3.5),
  },
  projectDes: {
    color: '#212529',
    marginBottom: vw(3.5),
  },
  logoAndNameView: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: vw(3.5),
  },
  orgLogo: {
    height: vw(screenWidth < 480 ? 10 : 7),
    width: vw(screenWidth < 480 ? 10 : 7),
    borderRadius: 10,
  },
  orgName: {
    fontFamily: 'Montserrat-Bold',
    color: '#212529',
    marginLeft: 8,
  },
  type: {
    color: '#212529',
    fontFamily: 'Montserrat-Bold',
  },
  causes: {
    fontFamily: 'Montserrat-Regular',
  },
  skillView: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: vw(3.5),
    marginTop: vw(3.5),
  },
  postedOn: {
    color: '#f06f07',
    fontFamily: 'Montserrat-Regular',
  },
});
