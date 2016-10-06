import React from 'react';
import { storiesOf, action } from '@kadira/storybook';

import { Swipe } from '../components';

storiesOf('App', module)
  .add('default', () => (
    <Swipe
        images={[
            'https://is1-2.housingcdn.com/afe3f526/1264f1fbf64cb1d23dfaa3beb33ff0ef/v2/medium.jpg',
            'https://is1-3.housingcdn.com/afe3f526/13b186eece020d2d4ad85cea21cdb991/v4/medium.jpg',
            'https://is1-3.housingcdn.com/afe3f526/7114b67ecce8e089fa750d76372d4636/v3/medium.jpg'
        ]}
    />
  ));
