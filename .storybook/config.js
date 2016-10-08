import { configure } from '@kadira/storybook';
import '../components/swipe.css'

function loadStories () {
  require('../stories/Swipe.story.js');
}

configure(loadStories, module);
