import {useEffect, useState} from 'react';
import moment from 'moment';
import {Image} from 'react-native-compressor';
import {_putFileToS3} from './s3Services';
// import reactNativeFetchBlob from 'react-native-fetch-blob';

const usePrevious = (useRef, useEffect, value) => {
  // return usePrevious = (value) => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
  // }˝
};

const sortByDate = arr =>
  arr.slice().sort((a, b) => b['createdAt'] - a['createdAt']);

const renderDate = data => moment(data).format('MM/DD/YYYY');

const newtodayDate = () => moment().format('YYYY-MM-DD');

const minDate = () => moment().add(1, 'days').format('YYYY-MM-DD');

const newRenderDate = data => moment(data).format('ll');

const renderTime = data => moment(data, 'hh:mm').format('LT');

const renderEndTime = (startTime, duration) =>
  `- ${moment(startTime, 'hh:mm').add(duration, 'minutes').format('LT')}`;

const renderDay = data => moment(data).format('DD');

const renderMonth = data => moment(data).format('MMMM').slice(0, 3);

const renderCurrencySign = currency => {
  switch (currency) {
    case 'eur':
      return '€';
    default:
      toast.warn('currency not matched');
  }
};

function useDebounce(value) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, 800);
    return () => {
      clearTimeout(handler);
    };
  }, [value]);
  return debouncedValue;
}

// ======== new version ======== //
const renderLocation = location => {
  if (Object.entries(location).length) {
    const {line1, line2, city, county, country, postalCode} = location;
    return `${line1}, ${line2 ? `${line2},` : ''}${city}, ${county}, ${
      postalCode ? `${postalCode},` : ''
    }${country}.`;
  } else {
    return 'Not Available';
  }
};

// ======== old version ======== //
// const renderLocation = (location) => {
//   return `${location?.line1}, ${location?.line2 ? `${location.line2}, ` : ""}${
//     location?.city
//   }, ${location?.county}, ${
//     location?.postalCode ? `${location.postalCode}, ` : ""
//   }${location?.country}.`;
// };

const getBase64 = file =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });

const base64ToFile = (dataurl, filename, type) => {
  // var arr = dataurl.split(','),
  //   mime = arr[0].match(/:(.*?);/)[1],
  //   bstr = atob(arr[1]),
  //   n = bstr.length,
  //   u8arr = new Uint8Array(n);
  // while (n--) {
  //   u8arr[n] = bstr.charCodeAt(n);
  // }
  // return new File([u8arr], filename, {
  //   type: mime,
  //   lastModified: Date.now(),
  //   lastModifiedDate: new Date(),
  // });
};

const parseGraphQLError = error => error.split('GraphQL error:')[1];

function getImageDimensions(file, imgPath) {
  return new Promise(function (resolved, rejected) {
    Image.getSize(
      imgPath,
      (width, height) => resolved({width, height}),
      rejected,
    );
  });
}

function uploadImageInS3Bucket(path, s3Key) {
  const options = {
    maxWidth: 1920,
    maxHeight: 1920,
    input: 'uri',
    returnableOutputType: 'base64',
  };
  return new Promise((resolve, reject) => {
    Image.compress(path, options)
      .then(async image => {
        let buffer = await Buffer.from(image, 'base64');
        _putFileToS3(s3Key, buffer)
          .then(res => {
            resolve(res);
          })
          .catch(err => {
            reject(err);
          });
      })
      .catch(err => {
        resolve(err);
      });
  });
}

function compressImage(path) {
  const options = {
    maxWidth: 1920,
    maxHeight: 1920,
    input: 'uri',
    returnableOutputType: 'base64',
  };
  return new Promise((resolve, reject) => {
    Image.compress(path, options)
      .then(async image => {
        let buffer = await Buffer.from(image, 'base64');
        resolve(buffer);
      })
      .catch(err => {
        console.log(err, 'Error in compressing');
        reject(err);
      });
  });
}

// function debounce(func, wait, immediate) {
//   let timeout;

//   return function executedFunction() {
//     let context = this;
//     let args = arguments;

//     let later = function () {
//       timeout = null;
//       if (!immediate) func.apply(context, args);
//     };

//     let callNow = immediate && !timeout;

//     clearTimeout(timeout);

//     timeout = setTimeout(later, wait);

//     if (callNow) func.apply(context, args);
//   };
// }

const languagesArray = [
  {id: 'US', value: 'ENG', image: '/assets/icons/eng.png'},
  // { id: "FR", value: "Francais" },
  // { id: "GR", value: "Deutsche" },
  // { id: "IT", value: "Italiano" },
  // { id: "NE", value: "Nederlands" },
  // { id: "PO", value: "Polski" },
  // { id: "POR", value: "Portugues" },
  // { id: "SP", value: "Español" },
];

export {
  minDate,
  languagesArray,
  usePrevious,
  renderLocation,
  renderCurrencySign,
  renderDate,
  renderDay,
  renderMonth,
  // ThemeContext,
  base64ToFile,
  getBase64,
  sortByDate,
  parseGraphQLError,
  newRenderDate,
  renderTime,
  renderEndTime,
  newtodayDate,
  compressImage,
  getImageDimensions,
  useDebounce,
  uploadImageInS3Bucket,
};
