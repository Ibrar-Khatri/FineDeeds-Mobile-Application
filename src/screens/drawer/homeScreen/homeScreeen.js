import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {
  isLoggedIn,
  logout,
} from '../../../services/sharedFunctions/authentication';

export default function LandingScreen({navigation}) {
  let [showInvalidInput, setShowInavlidInput] = useState(false);

  function logOut() {
    console.log('hello');
  }

  useEffect(() => {
    // isLoggedIn()
    //   .then(res => {
    //     console.log(res);
    //   })
    //   .catch(())
  });

  return (
    <View style={styles.mainView}>
      <Text>LandingScreen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  mainView: {
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
