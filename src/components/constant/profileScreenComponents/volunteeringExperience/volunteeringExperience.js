import {View} from 'native-base';
import React from 'react';
import CustomButton from '../../../common/button/button';
import style from './volunteeringExperienceStyle';

export default function VolunteeringExperience() {
  return (
    <View style={style.mainViewVolunteeringExp}>
      <CustomButton buttonText="Add Experience" />
    </View>
  );
}
