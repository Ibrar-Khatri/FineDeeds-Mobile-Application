import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {CardTitle} from '../../../constant/homeScreenComponents/index';
import {
  FlatListComponent,
  CustomSpinner,
  StoriesCard,
} from '../../../common/common';
import {useLazyQuery} from '@apollo/client';
import {getVolunteerPublishedStories} from '../../../../../graphql/queries';

export default function StoriesThatInspire() {
  let [getstories, storiesData] = useLazyQuery(getVolunteerPublishedStories);
  let [stories, setStories] = useState();

  useEffect(() => {
    getstories({
      variables: {limit: 3},
    });
  }, []);

  !stories &&
    storiesData?.data?.getStories?.items &&
    setStories(storiesData?.data?.getStories?.items.slice(0, 3));

  return (
    <View style={style.mainView}>
      <CardTitle
        subTitle="STORIES THAT INSPIRE"
        showLink={true}
        headerTitle="Stories"
        screenName="listAll-screen"
        initialRouteName="story_list"
      />
      <FlatListComponent
        data={stories}
        horizontal={true}
        showsHorizontalScrollIndicator={true}
        ListEmptyComponent={<CustomSpinner size="lg" color="#f06d06" />}
        renderItem={({item, i}) => <StoriesCard key={i} data={item} />}
      />
    </View>
  );
}
const style = StyleSheet.create({
  mainView: {
    marginBottom: 20,
  },
});
