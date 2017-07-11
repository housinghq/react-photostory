import { configure } from '@storybook/react';
import { setOptions } from '@storybook/addon-options';

import '../components/swipe.scss'
import '../components/story.scss'
import './custom.scss'

setOptions({
  name: 'REACT-PHOTOSTORY',
  url: 'https://github.com/housinghq/react-photostory',
  goFullScreen: true,
  showLeftPanel: false,
  showDownPanel: true,
  showSearchBox: false,
  downPanelInRight: false,
});

function loadStories () {
  require('../stories/story.js');
}

configure(loadStories, module);
