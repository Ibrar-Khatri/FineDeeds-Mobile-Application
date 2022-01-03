import React, {useEffect, useState} from 'react';
import {useLazyQuery} from '@apollo/client';
import {useNavigation} from '@react-navigation/native';
import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import {getVolunteerById} from '../../../../graphql/queries';
import {
  InfoCard,
  RenderS3Image,
  ResponsiveText,
  CustomButton,
  CommentSection,
  CustomSpinner,
} from '../../../components/common/common';
import {
  heightPercentageToDP as vh,
  widthPercentageToDP as vw,
} from '../../../responsive/responsive';

export default function OrganizationDetailScreen(props) {
  const {data} = props;

  return (
    <ScrollView style={style.activityDetailScreenView}>
      <View style={style.headerMainView}>
        <RenderS3Image
          resizeMode="cover"
          s3Key={data && `ORGANIZATION/IMAGE/${data?.orgId}.webp`}
          style={style.orgImage}
        />
      </View>
    </ScrollView>
  );
}

let style = StyleSheet.create({
  activityDetailScreenView: {
    backgroundColor: '#fff',
  },
  orgImage: {
    height: vw(50),
    width: '100%',
  },
  headerMainView: {
    margin: vw(3),
    backgroundColor: '#fff',
    padding: vw(3),
    borderRadius: 10,
  },
});
