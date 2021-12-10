import {Image} from 'native-base';
import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import RenderS3Image from '../../renderS3Image/renderS3Image';
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
      <Text style={style.productTitle}>{productDetail.title}</Text>
      <Text style={style.productPickupText1}>Pick up :</Text>
      <Text style={style.productPickupText2}>
        {productDetail.city + ', ' + productDetail.country}
      </Text>
      <Text style={style.productPrice}>{`\u20AC ${productDetail.amount}`}</Text>
    </TouchableOpacity>
  );
}
