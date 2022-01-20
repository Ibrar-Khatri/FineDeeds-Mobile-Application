import React, { useEffect } from 'react';
import {ResponsiveText} from '../../../../../components';

export default function Skills() {
  useEffect(() => {
    console.log('Skills');
  }, []);
  return <ResponsiveText size={20}>Skills</ResponsiveText>;
}
