import {Image} from 'native-base';
import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import RenderS3Image from '../../renderS3Image/renderS3Image';
import ResponsiveText from '../../responsiveText/responsiveText';
import style from './productCardStyle';

export default function ProductCard(props) {
  let {productDetail} = props;
  return (
    <TouchableOpacity style={style.productCardMainView} activeOpacity={0.5}>
      <RenderS3Image
        resizeMode="contain"
        style={style.productImage}
        s3Key={productDetail.images}
      />
      <ResponsiveText style={style.productTitle} size={13}>
        {productDetail.title}
      </ResponsiveText>
      <ResponsiveText style={style.productPickupText1} size={12}>
        Pick up :
      </ResponsiveText>
      <ResponsiveText style={style.productPickupText2} size={12}>
        {productDetail.city + ', ' + productDetail.country}
      </ResponsiveText>
      <ResponsiveText
        style={style.productPrice}
        size={13}>{`\u20AC ${productDetail.amount}`}</ResponsiveText>
    </TouchableOpacity>
  );
}
