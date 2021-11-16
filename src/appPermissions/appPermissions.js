import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import {Platform} from 'react-native';

const PLATFORM_CAMERA_PERMISSION = {
  ios: PERMISSIONS.IOS.CAMERA,
  android: PERMISSIONS.ANDROID.CAMERA,
};
const PLATFORM_PHOTO_PERMISSION = {
  ios: PERMISSIONS.IOS.PHOTO_LIBRARY,
  android: PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
};

const REQUEST_PERMISSIONS_TYPE = {
  camera: PLATFORM_CAMERA_PERMISSION,
  photo: PLATFORM_PHOTO_PERMISSION,
};

const PERMISSION_TYPE = {
  camera: 'camera',
  photo: 'photo',
};

class AppPermission {
  checkPermission = async (type): Promise<boolean> => {
    const permissions = REQUEST_PERMISSIONS_TYPE[type][Platform.OS];
    if (!permissions) {
      return true;
    }
    try {
      const result = await check(permissions);
      if (result === RESULTS.GRANTED) return true;
      return this.requestPermission(permissions);
    } catch (error) {
      return false;
    }
  };
  requestPermission = async (permissions): Promise<boolean> => {
    try {
      const result = await request(permissions);
      return result === RESULTS.GRANTED;
    } catch (error) {
      return false;
    }
  };
  requestMultiple = async (types): Promise<boolean> => {
    const results = [];
    for (const type of types) {
      const permission = REQUEST_PERMISSIONS_TYPE[type][Platform.OS];
      if (Permission) {
        const result = await this.requestPermission(permission);
        results.push(result);
      }
    }
    for (const result of results) {
      if (!result) {
        return false;
      }
    }
    return true;
  };
}

const Permission = new AppPermission();

export {Permission, PERMISSION_TYPE};
