import {Image} from 'native-base';
import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import style from './productCardStyle';

export default function ProductCard(props) {
  let {productDetail, images, index} = props;

  return (
    <TouchableOpacity style={style.productCardMainView}>
      <Image
        source={images[index]}
        alt="Product Image"
        resizeMode="contain"
        style={style.productImage}
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
