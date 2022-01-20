import React, { useEffect } from 'react';
import {ResponsiveText} from '../../../../../components';

export default function Causes() {
  useEffect(() => {
    console.log('Causes');
  }, []);
  return <ResponsiveText size={20}>Causes</ResponsiveText>;
}
