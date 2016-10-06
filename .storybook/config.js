import { configure } from '@kadira/storybook';

function loadStories () {
  require('../stories/Swipe.story.js');
}

configure(loadStories, module);
