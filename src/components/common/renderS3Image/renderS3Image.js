import React, {useEffect, useState} from 'react';
import {Image, ImageBackground, TouchableOpacity} from 'react-native';
import {_getFileFromS3} from '../../../shared/services/s3Services';

export default function RenderS3Image(props) {
  const {style, resizeMode, s3Key, onClick, imageUrl, update, children} = props;

  const [image, setImage] = useState('');

  useEffect(() => {
    let unmounted = false;
    if (s3Key) {
      _getFileFromS3(s3Key)
        .then(imgUrl => {
          setImage(imgUrl);
        })
        .catch(err => {
          console.log(err, 'e');
          setImage('');
        });
    }
    return () => {
      unmounted = true;
    };
  }, [s3Key, imageUrl, update]);

  return onClick ? (
    <TouchableOpacity activeOpacity={onClick ? 0.5 : 1} onPress={onClick}>
      <Image
        style={style}
        source={
          imageUrl
            ? imageUrl !== 'deleted'
              ? {uri: imageUrl}
              : require('../../../assets/images/no-img-event-card.png')
            : image
            ? {uri: image}
            : require('../../../assets/images/no-img-event-card.png')
        }
        resizeMode={resizeMode}
      />
    </TouchableOpacity>
  ) : children ? (
    <ImageBackground
      style={style}
      resizeMode={resizeMode}
      source={
        image
          ? {uri: image}
          : require('../../../assets/images/no-img-event-card.png')
      }>
      {children}
    </ImageBackground>
  ) : (
    <Image
      style={style}
      source={
        imageUrl
          ? imageUrl !== 'deleted'
            ? {uri: imageUrl}
            : require('../../../assets/images/no-img-event-card.png')
          : image
          ? {uri: image}
          : require('../../../assets/images/no-img-event-card.png')
      }
      resizeMode={resizeMode}
    />
  );
}
