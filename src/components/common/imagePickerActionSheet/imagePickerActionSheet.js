import React from 'react';
import {Actionsheet, useToast} from 'native-base';
import ImagePicker from 'react-native-image-crop-picker';
import Iocn1 from 'react-native-vector-icons/Entypo';
import Icon3 from 'react-native-vector-icons/MaterialIcons';
import {
  Permission,
  PERMISSION_TYPE,
} from '../../../appPermissions/appPermissions';
import CustomToast from '../customToast/customToast';
import {
  _putFileToS3,
  _removeFileFromS3,
} from '../../../shared/services/s3Services';
import {uploadImageInS3Bucket} from '../../../shared/services/helper';
import style from './imagePickerActionSheetStyle';

export default function ImagePickerActionSheet(props) {
  let {
    isActionSheetOpen,
    setIsActionSheetOpen,
    option,
    image,
    setImage,
    s3Key,
  } = props;

  let toast = useToast();

  let selectImage = async type => {
    setIsActionSheetOpen(false);

    switch (type) {
      case 'camera': {
        ImagePicker.openCamera(option).then(async img => {
          setImage(img.path);
          uploadImageInS3Bucket(img.path, s3Key)
            .then(uploaded => {
              toast.show({
                placement: 'top',
                duration: 2000,
                render: () => (
                  <CustomToast
                    type="success"
                    description={`Image upload successfully`}
                  />
                ),
              });
            })
            .catch(err => {
              toast.show({
                placement: 'top',
                duration: 2000,
                render: () => (
                  <CustomToast
                    type="error"
                    description={`Something went wrong, Please try agin later `}
                  />
                ),
              });
            });
        });
        break;
      }
      case 'library': {
        ImagePicker.openPicker(option).then(async img => {
          setImage(img.path);
          uploadImageInS3Bucket(img.path, s3Key)
            .then(uploaded => {
              toast.show({
                placement: 'top',
                duration: 2000,
                render: () => (
                  <CustomToast
                    type="success"
                    description={`Image upload successfully`}
                  />
                ),
              });
            })
            .catch(err => {
              toast.show({
                placement: 'top',
                duration: 2000,
                render: () => (
                  <CustomToast
                    type="error"
                    description={`Something went wrong, Please try agin later `}
                  />
                ),
              });
            });
        });
        break;
      }
      case 'removeImage': {
        _removeFileFromS3(s3Key)
          .then(res => {
            setImage('deleted');
            toast.show({
              placement: 'top',
              duration: 2000,
              render: () => (
                <CustomToast type="success" description={`Image Deleted!`} />
              ),
            });
          })
          .catch(err => {
            setImage('');
            toast.show({
              placement: 'top',
              duration: 2000,
              render: () => (
                <CustomToast
                  type="error"
                  description="Something went wrong, Please try agin later"
                />
              ),
            });
          });
        break;
      }
    }
  };

  return (
    <Actionsheet isOpen={isActionSheetOpen} onClose={setIsActionSheetOpen}>
      <Actionsheet.Content>
        <Actionsheet.Item
          onPress={() => selectImage('camera')}
          startIcon={<Iocn1 name="camera" color="#f06d06" size={30} />}>
          Take a photo
        </Actionsheet.Item>
        <Actionsheet.Item
          onPress={() => selectImage('library')}
          startIcon={<Icon3 name="photo-library" color="#f06d06" size={30} />}>
          Choose from Library
        </Actionsheet.Item>
        <Actionsheet.Item
          onPress={() => selectImage('removeImage')}
          startIcon={<Icon3 name="delete" color="red" size={30} />}>
          Remove image
        </Actionsheet.Item>
        <Actionsheet.Item
          onPress={selectImage}
          style={style.actionsheetItemCancelText}>
          Cancel
        </Actionsheet.Item>
      </Actionsheet.Content>
    </Actionsheet>
  );
}
