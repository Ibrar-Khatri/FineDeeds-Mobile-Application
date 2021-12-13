import React from 'react';
import {View} from 'native-base';
import style from './storiesCardStyle';
import {Text} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import RenderS3Image from '../../renderS3Image/renderS3Image';
import RenderHtmlTags from '../../renderHtmlTags/renderHtmlTags';
import {heightPercentageToDP as vh} from '../../../../responsive/responsive';
import ResponsiveText from '../../responsiveText/responsiveText';

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
          <ResponsiveText style={style.textStyle} size={10}>
            <Icon name="user" color="#fd7e14" size={vh(2)} />
            {`  ${data['createdBy']?.volunteerName}`}
          </ResponsiveText>
          {data?.orgName && (
            <>
              <ResponsiveText style={style.textStyle} size={10}>
                --
              </ResponsiveText>
              <ResponsiveText style={style.textStyle} size={10}>
                {data?.orgName}
              </ResponsiveText>
            </>
          )}
        </View>
        <View style={style.descriptionView}>
          <ResponsiveText style={style.storyTitle} size={13}>
            {data?.title}
          </ResponsiveText>
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
