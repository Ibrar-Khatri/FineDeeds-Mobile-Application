import React from 'react';
import {View} from 'native-base';
import style from './storiesCardStyle';
import {Image, Text, useWindowDimensions} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import RenderHtml from 'react-native-render-html';
import RenderS3Image from '../renderS3Image/renderS3Image';

export default function StoriesCard({data}) {
  const {width} = useWindowDimensions();

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
            <Icon name="user" color="#fd7e14" size={15} />{' '}
            {`${data['createdBy']?.volunteerName}`}
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
          <View style={style.renderHtmlView}>
            <RenderHtml
              source={{
                html: data?.story,
              }}
              tagsStyles={style.tagsStyles}
              contentWidth={width}
            />
          </View>
        </View>
      </View>
    </View>
  );
}
