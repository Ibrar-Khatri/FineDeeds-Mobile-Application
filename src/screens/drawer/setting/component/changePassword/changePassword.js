import React, { useEffect } from 'react';
import {ResponsiveText} from '../../../../../components';

export default function ChangePassword() {
  useEffect(() => {
    console.log('Change password');
  }, []);
  return <ResponsiveText size={20}>ChangePassword</ResponsiveText>;
}
