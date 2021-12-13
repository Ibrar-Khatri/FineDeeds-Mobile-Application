import {Dimensions, PixelRatio} from 'react-native';
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const widthPercentageToDP = widthPercent => {
  // Convert string input to decimal number
  const elemWidth = parseFloat(widthPercent);
  return PixelRatio.roundToNearestPixel((screenWidth * elemWidth) / 100);
};
const heightPercentageToDP = heightPercent => {
  // Convert string input to decimal number
  const elemHeight = parseFloat(heightPercent);
  return PixelRatio.roundToNearestPixel((screenHeight * elemHeight) / 100);
};
const aggregate = (arr, key) => {
  const aggregation = [];

  arr.reduce((prev, current, index) => {
    if (index === 1) {
      aggregation.push(prev[key]);
    }
    if (aggregation.filter(value => value === current[key]).length === 0) {
      aggregation.push(current[key]);
    }
  });
  return aggregation;
};

const pixelRatio = PixelRatio.get();

const adjust = size => {
  if (pixelRatio >= 2 && pixelRatio < 3) {
    // iphone 5s and older Androids
    if (screenWidth < 360) {
      return size * 0.95;
    }
    // iphone 5
    if (screenHeight < 667) {
      return size;
      // iphone 6-6s
    }
    if (screenHeight >= 667 && screenHeight <= 735) {
      return size * 1.15;
    }
    // older phablets
    return size * 1.25;
  }
  if (pixelRatio >= 3 && pixelRatio < 3.5) {
    // catch Android font scaling on small machines
    // where pixel ratio / font scale ratio => 3:3
    if (screenWidth <= 360) {
      return size;
    }
    // Catch other weird android width sizings
    if (screenHeight < 667) {
      return size * 1.15;
      // catch in-between size Androids and scale font up
      // a tad but not too much
    }
    if (screenHeight >= 667 && screenHeight <= 735) {
      return size * 1.2;
    }
    // catch larger devices
    // ie iphone 6s plus / 7 plus / mi note 等等
    return size * 1.27;
  }
  if (pixelRatio >= 3.5) {
    // catch Android font scaling on small machines
    // where pixel ratio / font scale ratio => 3:3
    if (screenWidth <= 360) {
      return size;
      // Catch other smaller android height sizings
    }
    if (screenHeight < 667) {
      return size * 1.2;
      // catch in-between size Androids and scale font up
      // a tad but not too much
    }
    if (screenHeight >= 667 && screenHeight <= 735) {
      return size * 1.25;
    }
    // catch larger phablet devices
    return size * 1.4;
  }
  return size;
};

const scale = screenWidth / 320;

function normalize(size) {
  size = screenWidth < 480 ? size : size - 3;
  const newSize = size * scale;

  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
  }
}

export {
  widthPercentageToDP,
  heightPercentageToDP,
  aggregate,
  adjust,
  normalize,
};
