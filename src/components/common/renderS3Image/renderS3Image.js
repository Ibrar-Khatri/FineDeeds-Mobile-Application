import React, {useEffect, useState} from 'react';
import {Image, TouchableOpacity} from 'react-native';
import {_getFileFromS3} from '../../../shared/services/s3Services';

export default function RenderS3Image(props) {
  let {style, resizeMode, s3Key, onClick, imageUrl} = props;

  const [image, setImage] = useState('');

  useEffect(() => {
    let unmounted = false;

    if (s3Key) {
      _getFileFromS3(s3Key)
        .then(imageUrl => {
          setImage(imageUrl);
          console.log(imageUrl, 'imageUrl');
        })
        .catch(err => {
          console.log(err, ' Error');
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
