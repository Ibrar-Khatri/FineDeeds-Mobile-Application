import {View} from 'native-base';
import React, {useState} from 'react';
import {
  FlatList,
  ImageBackground,
  ScrollView,
  Text,
  TouchableOpacity,
  TouchableOpacityComponent,
} from 'react-native';
import {Image} from 'native-base';
import style from './profileScreenStyle';
import {isLoggedIn} from '../../../services/sharedFunctions/authentication';
import {useEffect} from 'react/cjs/react.development';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import CustomButton from '../../../components/commonComponents/button/button';
import ProfileScreenCardWrapper from '../../../components/commonComponents/profileScreenCardWrapper/profileScreenCardWrapper';
import ItemsSelectorCard from '../../../components/commonComponents/itemsSelectorCard/itemsSelectorCard';

export default function ProfileScreen() {
  let [user, setUser] = useState();
  useEffect(() => {
    isLoggedIn()
      .then(res => {
        setUser(res.attributes);
      })
      .catch(err => {});
  }, []);

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
          <Image
            alt="profile image"
            source={require('../../../assets/images/no-img-event-card.png')}
            resizeMode="cover"
            style={style.profileImageStyle}
          />
        </View>
        <Text style={style.userNameStyle}>{user?.name}</Text>
        <View>
          <Text style={style.userLocationStyle}>
            <EntypoIcon name="location-pin" color="#f06d06" size={20} /> Johr
            Mor up and b, Belgium
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
              icon={<AntDesign name="message1" color="#fff" size={20} />}
            />
            <CustomButton
              icon={<EntypoIcon name="thumbs-up" color="#fff" size={20} />}
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

      {/* <ProfileScreenCardWrapper>
        <View style={style.titleAndLinkView}>
          <Text style={style.titleStyle}>Products in charity store</Text>
          <TouchableOpacity>
            <Text style={style.linkStyle}>Sell all</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={activities}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          renderItem={({item, index}) => (
            <TouchableOpacity
              key={index}
              style={style.productCardMainView}>
                  <Image  />
              </TouchableOpacity>
          )}
        />
      </ProfileScreenCardWrapper> */}
    </ScrollView>
  );
}
