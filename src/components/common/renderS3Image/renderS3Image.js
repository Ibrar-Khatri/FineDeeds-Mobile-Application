import React, {useEffect, useState} from 'react';
import {Image, TouchableOpacity} from 'react-native';
import {_getFileFromS3} from '../../../shared/services/s3Services';

export default function RenderS3Image(props) {
  let {style, resizeMode, s3Key, onClick, imageUrl, setImageUrl} = props;

  const [image, setImage] = useState('');

  useEffect(() => {
    let unmounted = false;

    if (s3Key) {
      _getFileFromS3(s3Key)
        .then(imgUrl => {
          setImage(imgUrl.config.url);
        })
        .catch(err => {
          console.log(err, 'e');
          setImage('');
        });
    }
    return () => {
      unmounted = true;
    };
  }, [s3Key, imageUrl]);

  return (
    <TouchableOpacity activeOpacity={onClick ? 0.5 : 1} onPress={onClick}>
      <Image
        style={style}
        source={
          imageUrl
            ? {uri: imageUrl}
            : image
            ? {uri: image}
            : require('../../../assets/images/no-img-event-card.png')
        }
        resizeMode={resizeMode}
      />
    </TouchableOpacity>
  );
}
