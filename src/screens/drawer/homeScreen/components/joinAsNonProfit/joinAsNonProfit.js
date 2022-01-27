import React from 'react';
import {ImageBackground, StyleSheet, View} from 'react-native';
import {widthPercentageToDP as vw} from '../../../../../responsive/responsive';
import {CustomButton, ResponsiveText} from '../../../../../components/index';
import PushNotification from 'react-native-push-notification';

export default function JoinAsNonProfit() {
  // function hello() {
  //   PushNotification.localNotificationSchedule({
  //     //... You can use all the options from localNotifications
  //     title: 'Event 001 ',
  //     message: 'Only three days left', // (required)
  //     date: new Date(), // in 60 secs
  //     allowWhileIdle: false, // (optional) set notification to work while on doze, default: false
  //     channelId: '001',
  //     /* Android Only Properties */
  //     repeatTime: 1, // (optional) Increment of configured repeatType. Check 'Repeating Notifications' section for more info.
  //   });
  //   console.log('Notification');
  // }

  return (
    <View style={style.joinAsNonProfitView}>
      <ImageBackground
        source={require('../../../../../assets/images/become-nonprofit.png')}>
        <View style={style.joinAsNonProfittextView}>
          <ResponsiveText style={style.joinAsNonProfitTitle} size={20}>
            Join as a non-profit
          </ResponsiveText>
          <ResponsiveText style={style.joinAsNonProfitText} size={12}>
            Finedeeds allows non-profits to improve almost every aspect of their
            operations – from internal efficiency to contributor interactions,
            and fundraising – with a greater focus on digital strategy. Through
            Finedeeds non-profits could not only manage their members and staff
            but also create events, fundraise and launch projects, and engage
            share the same with their members bringing real-time communication
            and high-level of transparency of operations.
          </ResponsiveText>
          <View style={style.registerNowButtonView}>
            <CustomButton buttonText="Register Now" onClick={hello} />
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

let style = StyleSheet.create({
  joinAsNonProfitView: {
    borderRadius: 10,
    overflow: 'hidden',
  },
  joinAsNonProfittextView: {
    backgroundColor: '#212529c4',
    padding: 20,
  },
  joinAsNonProfitTitle: {
    color: '#fff',
    fontFamily: 'Montserrat-Bold',
    marginBottom: 15,
  },
  joinAsNonProfitText: {
    color: '#fff',
    fontFamily: 'Montserrat-Regular',
    marginBottom: 20,
  },
  registerNowButtonView: {
    width: vw(40),
  },
});
