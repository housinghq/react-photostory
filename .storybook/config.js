import { configure } from '@kadira/storybook';

function loadStories () {
  require('../stories/App.story');
}

configure(loadStories, module);
