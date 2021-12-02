import {Storage} from 'aws-amplify';
import {NATIVE_PUBLIC_CLOUDFRONT} from '@env';
import axios from 'axios';

const defaultPrefix = {
  public: '',
  protected: '',
  private: '',
};

// function isServer() {
//   return !(typeof window !== "undefined" && window.document);
// }

const isImageExist = (url, callBack) => {
  const imageData = new Image();
  imageData.onload = () => callBack(true);
  imageData.onerror = () => callBack(false);
  imageData.src = url;
};

const _getFileFromS3 = (key, customPrefix) => {
  return axios.get(
    `${
      NATIVE_PUBLIC_CLOUDFRONT
        ? NATIVE_PUBLIC_CLOUDFRONT
        : 'https://d1dgq26wta4hyq.cloudfront.net'
    }/${key}`,
  );
  // new Promise((res, rej) => {

  //     .then(url => res(url.config.url))
  //     .catch(err => rej());
  // let url = `${
  //   NATIVE_PUBLIC_CLOUDFRONT
  //     ? NATIVE_PUBLIC_CLOUDFRONT
  //     : 'https://d1dgq26wta4hyq.cloudfront.net'
  // }/${key}`;
  // console.log(url, 'url');
  // res(
  //   `${
  //     NATIVE_PUBLIC_CLOUDFRONT
  //       ? NATIVE_PUBLIC_CLOUDFRONT
  //       : 'https://d1dgq26wta4hyq.cloudfront.net'
  //   }/${key}`,
  // );
};

// let prefix = customPrefix ? customPrefix : defaultPrefix;
// return new Promise((resolve, reject) => {
//   return Storage.get(key, {
//     customPrefix: prefix,
//   })
//     .then((url) => {
//       if (isServer()) {
//         if (url) {
//           resolve(url);
//         } else {
//           reject({ message: "Image not found!" });
//         }
//       } else {
//         isImageExist(url, (isExist) => {
//           if (isExist) {
//             resolve(url);
//           } else {
//             reject({ message: "Image not found!" });
//           }
//         });
//       }
//     })
//     .catch((error) => {
//       reject(error);
//     });
// });
// };

const _putFileToS3 = (
  key,
  file,
  customPrefix = defaultPrefix,
  contentType = 'image/webp',
) => {
  return Storage.put(key, file, {
    customPrefix,
    contentType,
  });
};

const _removeFileFromS3 = (
  key,
  customPrefix = defaultPrefix,
  contentType = 'image/webp',
) => {
  return Storage.remove(key, {
    customPrefix,
    contentType,
  });
  // return new Promise(async (resolve, reject) => {
  //   try {
  //     let imageRemove = await Storage.remove(key, {
  //       customPrefix,
  //       contentType,
  //     });
  //     console.log(imageRemove, 'imageRemove');
  //     resolve(imageRemove);
  //   } catch (e) {
  //     reject(e);
  //   }
  // });
};

export {_getFileFromS3, _putFileToS3, _removeFileFromS3};
