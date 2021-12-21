import React from 'react';
import {TouchableOpacity} from 'react-native';
import RenderS3Image from '../../renderS3Image/renderS3Image';
import ResponsiveText from '../../responsiveText/responsiveText';
import {Dimensions, StyleSheet} from 'react-native';
import {widthPercentageToDP as vw} from '../../../../responsive/responsive';

const screenWidth = Dimensions.get('window').width;

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

let style = StyleSheet.create({
  productCardMainView: {
    width: vw(screenWidth < 480 ? 50 : 41),
    margin: 10,
  },
  productImage: {
    height: vw(screenWidth < 480 ? 50 : 40),
    borderRadius: 10,
    overflow: 'hidden',
  },
  productTitle: {
    fontFamily: 'Montserrat-SemiBold',
    color: '#212529',

    marginTop: 13,
    marginBottom: 10,
  },
  productPickupText1: {
    fontFamily: 'Montserrat-SemiBold',
    color: '#212529',
  },
  productPickupText2: {
    fontFamily: 'Montserrat-Regular',
    color: '#212529',
  },
  productPrice: {
    fontFamily: 'Montserrat-Bold',
    color: '#f06f07',
    marginTop: 13,
  },
});
