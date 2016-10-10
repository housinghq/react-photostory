import { configure } from '@kadira/storybook';
import { setOptions } from '@kadira/storybook-addon-options';

import '../components/swipe.css'
import './custom.css'

setOptions({
  name: 'REACT-PHOTOSTORY',
  url: 'https://github.com/housinghq/react-photostory',
  goFullScreen: false,
  showLeftPanel: false,
  showDownPanel: true,
  showSearchBox: false,
  downPanelInRight: false,
});

function loadStories () {
  require('../stories/Swipe.story.js');
}

configure(loadStories, module);
