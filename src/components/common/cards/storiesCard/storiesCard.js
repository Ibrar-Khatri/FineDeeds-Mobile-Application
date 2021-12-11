import React from 'react';
import {View} from 'native-base';
import style from './storiesCardStyle';
import {Text} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import RenderS3Image from '../../renderS3Image/renderS3Image';
import RenderHtmlTags from '../../renderHtmlTags/renderHtmlTags';
import { heightPercentageToDP as vh } from '../../../../responsive/responsive';

export default function StoriesCard({data}) {
  return (
    <View style={style.mainView}>
      <RenderS3Image
        resizeMode="cover"
        style={style.imageStyle}
        s3Key={data?.storyId && `STORY/${data?.storyId}.webp`}
      />
      <View style={style.cardBodyView}>
        <View style={style.nameAndOrgName}>
          <Text style={style.textStyle}>
            <Icon name="user" color="#fd7e14" size={vh(2)} />
            {`  ${data['createdBy']?.volunteerName}`}
          </Text>
          {data?.orgName && (
            <>
              <Text style={style.textStyle}>--</Text>
              <Text style={style.textStyle}>{data?.orgName}</Text>
            </>
          )}
        </View>
        <View style={style.descriptionView}>
          <Text style={style.storyTitle}>{data?.title}</Text>
          <RenderHtmlTags
            source={{
              html: data?.story,
            }}
            tagsStyles={style.tagsStyles}
          />
        </View>
      </View>
    </View>
  );
}
