import React from 'react';
import {useWindowDimensions} from 'react-native';
import RenderHTML from 'react-native-render-html';

export default function RenderHtmlTags(props) {
  const {source, tagsStyles} = props;
  const {width} = useWindowDimensions();
  return (
    <RenderHTML source={source} tagsStyles={tagsStyles} contentWidth={width} />
  );
}
