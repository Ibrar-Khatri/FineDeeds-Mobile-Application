import {Image} from 'native-base';
import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import style from './productCardStyle';

export default function ProductCard(props) {
  let {productDetail} = props;
  return (
    <TouchableOpacity style={style.productCardMainView}>
      <Image
        source={productDetail.image}
        alt="Product Image"
        resizeMode="contain"
        style={style.productImage}
      />
      <Text style={style.productTitle}>{productDetail.title}</Text>
      <Text style={style.productPickupText1}>Pick up :</Text>
      <Text style={style.productPickupText2}>{productDetail.pickUp}</Text>
      <Text style={style.productPrice}>{`\u20AC ${productDetail.price}`}</Text>
    </TouchableOpacity>
  );
}
