import React, {useEffect, useState} from 'react';
import {
  FlatList,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import {Actionsheet} from 'native-base';
import {isLoggedIn} from '../../../services/sharedFunctions/authentication';
import Iocn1 from 'react-native-vector-icons/Entypo';
import Icon2 from 'react-native-vector-icons/AntDesign';
import Icon3 from 'react-native-vector-icons/MaterialIcons';
import ImagePicker from 'react-native-image-crop-picker';
import {
  Permission,
  PERMISSION_TYPE,
} from '../../../appPermissions/appPermissions';
import CustomButton from '../../../components/commonComponents/button/button';
import ProfileScreenCardWrapper from '../../../components/commonComponents/profileScreenCardWrapper/profileScreenCardWrapper';
import ItemsSelectorCard from '../../../components/commonComponents/itemsSelectorCard/itemsSelectorCard';
import ProductCard from '../../../components/commonComponents/productCard/productCard';
import style from './profileScreenStyle';

export default function ProfileScreen() {
  let [user, setUser] = useState();
  let [isActionSheetOpen, setIsActionSheetOpen] = useState(false);
  let [image, setImage] = useState();
  useEffect(() => {
    isLoggedIn()
      .then(res => {
        setUser(res.attributes);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  let selectImage = async type => {
    setIsActionSheetOpen(false);
    await Permission.requestMultiple([
      PERMISSION_TYPE.photo,
      PERMISSION_TYPE.camera,
    ]);
    switch (type) {
      case 'camera': {
        ImagePicker.openCamera({
          width: 300,
          height: 400,
          cropping: true,
        })
          .then(img => {
            setImage(img.path);
            console.log(image);
          })
          .catch(err => {
            console.log(err);
          });
        break;
      }
      case 'library': {
        ImagePicker.openPicker({
          width: 300,
          height: 400,
          cropping: true,
        })
          .then(image => {
            setImage(image.path);
            console.log(image);
          })
          .catch(err => {
            console.log(err);
          });
        break;
      }
      case 'removeImage': {
        setImage();
        break;
      }
    }
  };

  let userFollowersDet = [
    {
      number: 14,
      type: 'Followers',
    },
    {
      number: 14,
      type: 'Following',
    },
    {
      number: 14,
      type: 'Participations',
    },
    {
      number: 14,
      type: 'Donations',
    },
  ];

  let skills = ['Accounting', 'Development', 'Data Analysis'];
  let causes = [
    'Accounting',
    'Human Resources',
    'Marketing',
    'Research',
    'Animals',
    'Arts And Culture',
  ];
  let activities = [
    {
      image: require('../../../assets/images/profile_activity_1.png'),
      title: 'test # 3',
      postedBy: 'Rameer and b posted',
    },
    {
      image: require('../../../assets/images/profile_activity_2.png'),
      title: 'test number 3',
      postedBy: 'Rameer and b posted',
    },
    {
      image: require('../../../assets/images/profile_activity_3.png'),
      title: 'test activity',
      postedBy: 'Rameer and b posted',
    },
  ];
  let charityProducts = [
    {
      image: require('../../../assets/images/dynamicImages/charity_product_image_1.png'),
      title: 'Playstation 5',
      pickUp: 'Karachi, Pakistan',
      price: 600,
    },
    {
      image: require('../../../assets/images/dynamicImages/charity_product_image_2.png'),
      title: 'Toy for kids',
      pickUp: 'Khokhar Maira, Pakistan',
      price: 15,
    },
    {
      image: require('../../../assets/images/dynamicImages/charity_product_image_3.png'),
      title: 'Jeans',
      pickUp: 'Islamabad, Pakistan',
      price: 33,
    },
    {
      image: require('../../../assets/images/dynamicImages/charity_product_image_4.png'),
      title: 'Rolex Watch',
      pickUp: 'Karachi, Pakistan',
      price: 5,
    },
  ];

  return (
    <ScrollView>
      <View style={style.profileView}>
        <Image
          alt="backgroung image"
          style={style.backgroungImage}
          source={require('../../../assets/images/jumbotrun.png')}
          resizeMode="cover"
        />
        <View style={style.profileImageView}>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => setIsActionSheetOpen(true)}>
            {image ? (
              <Image
                alt="profile image"
                source={{uri: image}}
                resizeMode="cover"
                style={style.profileImageStyle}
              />
            ) : (
              <Image
                alt="profile image"
                source={require('../../../assets/images/no-img-event-card.png')}
                resizeMode="cover"
                style={style.profileImageStyle}
              />
            )}
          </TouchableOpacity>
        </View>
        <Text style={style.userNameStyle}>{user?.name}</Text>
        <View>
          <Text style={style.userLocationStyle}>
            <Iocn1 name="location-pin" color="#f06d06" size={20} /> Johr Mor up
            and b, Belgium
          </Text>
        </View>
        <View style={style.userFollowersView}>
          {userFollowersDet.map((item, i) => (
            <View key={i} style={style.userFollower}>
              <Text style={style.userFollowerText}>{item.number}</Text>
              <Text style={style.userFollowerText}>{item.type}</Text>
            </View>
          ))}
        </View>
        <View>
          <View style={style.buttonView}>
            <CustomButton buttonText="Follow" />
            <CustomButton
              icon={<Icon2 name="message1" color="#fff" size={20} />}
            />
            <CustomButton
              icon={<Iocn1 name="thumbs-up" color="#fff" size={20} />}
            />
          </View>
        </View>
      </View>

      <ProfileScreenCardWrapper>
        <Text style={style.aboutTitle}>About</Text>
        <Text style={style.aboutText}>
          This is a about me 22222This is a about me 22222This is a about me
          22222This is a about me 22222This is a about me 22222This is a about
          me 22222This is a about me 22222 up upper b
        </Text>
      </ProfileScreenCardWrapper>
      <ItemsSelectorCard items={skills} title="Skills" />
      <ItemsSelectorCard items={causes} title="Causes" />

      <ProfileScreenCardWrapper>
        <View style={style.titleAndLinkView}>
          <Text style={style.titleStyle}>Activity</Text>
          <TouchableOpacity>
            <Text style={style.linkStyle}>Sell all</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={activities}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          renderItem={({item, index}) => (
            <TouchableOpacity key={index} style={style.activityView}>
              <Image
                source={item.image}
                alt="activity image"
                resizeMode="contain"
                style={style.activityImageStyle}
              />
              <View style={style.activityTitleAndPostedByView}>
                <Text style={style.activityTitle}>{item.title}</Text>
                <Text style={style.activityPostedByText}>{item.postedBy}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </ProfileScreenCardWrapper>

      <ProfileScreenCardWrapper>
        <View style={style.titleAndLinkView}>
          <Text style={style.titleStyle}>Products in charity store</Text>
          <TouchableOpacity>
            <Text style={style.linkStyle}>Sell all</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={charityProducts}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          renderItem={({item, index}) => (
            <ProductCard key={index} productDetail={item} />
          )}
        />
      </ProfileScreenCardWrapper>
      <Actionsheet isOpen={isActionSheetOpen} onClose={setIsActionSheetOpen}>
        <Actionsheet.Content>
          <Actionsheet.Item
            onPress={() => selectImage('camera')}
            startIcon={<Iocn1 name="camera" color="#f06d06" size={30} />}>
            Take a photo
          </Actionsheet.Item>
          <Actionsheet.Item
            onPress={() => selectImage('library')}
            startIcon={
              <Icon3 name="photo-library" color="#f06d06" size={30} />
            }>
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
    </ScrollView>
  );
}
