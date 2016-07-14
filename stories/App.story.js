import React from 'react';
import { storiesOf, action } from '@kadira/storybook';

import { App } from '../components';

storiesOf('App', module)
  .add('default', () => (
    <App onClick={action('clicked')}/>
  ));
