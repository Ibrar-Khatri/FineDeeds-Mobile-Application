import React from 'react';
import {View} from 'native-base';
import {StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {RenderS3Image, RenderHtmlTags, ResponsiveText} from '../../common';
import {useNavigation} from '@react-navigation/native';
import {
  heightPercentageToDP as vh,
  normalize,
} from '../../../../responsive/responsive';

export default function StoriesCard(props) {
  let navigation = useNavigation();
  const {data} = props;

  function navigateTo() {
    navigation.navigate('detail-screen', {
      initialRouteName: 'story_detail',
      data: data,
      title: data?.title,
    });
  }

  return (
    <TouchableOpacity style={style.mainView} onPress={navigateTo}>
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
    </TouchableOpacity>
  );
}

let style = StyleSheet.create({
  mainView: {
    borderColor: '#e8e8e8',
    borderWidth: 1,
    borderRadius: 15,
    padding: 10,
    margin: 10,
    alignItems: 'center',
    width: vh(45),
  },
  imageStyle: {
    height: vh(27),
    width: vh(42),
    alignSelf: 'center',
    borderRadius: 15,
  },
  cardBodyView: {
    width: '93%',
    marginTop: 18,
  },
  nameAndOrgName: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textStyle: {
    fontFamily: 'Montserrat-Regular',
    color: '#212529',
  },
  descriptionView: {
    marginTop: 30,
    marginBottom: 20,
  },
  storyTitle: {
    fontFamily: 'Montserrat-Bold',
    color: '#212529',
  },
  tagsStyles: {
    br: {display: 'none'},
    h1: {fontSize: normalize(10), margin: 0, padding: 0},
    h2: {fontSize: normalize(10), margin: 0, padding: 0},
    h3: {fontSize: normalize(10), margin: 0, padding: 0},
    body: {
      color: '#212529',
      height: 56,
      overflow: 'hidden',
      fontSize: normalize(10),
    },
  },
});
