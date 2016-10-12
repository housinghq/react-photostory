import React from 'react';
import { storiesOf } from '@kadira/storybook';
import { decorateAction } from '@kadira/storybook-addon-actions';
import { withKnobs, boolean, number } from '@kadira/storybook-addon-knobs';

import Swipe from '../components';
import LazyCard from 'react-lazy-card'

const firstArg = decorateAction([
  args => args.slice(0, 1)
]);

const stories = storiesOf('App', module)

const defaultImage = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAASABIAAD/4QCMRXhpZgAATU0AKgAAAAgABQESAAMAAAABAAEAAAEaAAUAAAABAAAASgEbAAUAAAABAAAAUgEoAAMAAAABAAIAAIdpAAQAAAABAAAAWgAAAAAAAABIAAAAAQAAAEgAAAABAAOgAQADAAAAAQABAACgAgAEAAAAAQAAAAKgAwAEAAAAAQAAAAIAAAAA/+0AOFBob3Rvc2hvcCAzLjAAOEJJTQQEAAAAAAAAOEJJTQQlAAAAAAAQ1B2M2Y8AsgTpgAmY7PhCfv/CABEIAAIAAgMBIgACEQEDEQH/xAAfAAABBQEBAQEBAQAAAAAAAAADAgQBBQAGBwgJCgv/xADDEAABAwMCBAMEBgQHBgQIBnMBAgADEQQSIQUxEyIQBkFRMhRhcSMHgSCRQhWhUjOxJGIwFsFy0UOSNIII4VNAJWMXNfCTc6JQRLKD8SZUNmSUdMJg0oSjGHDiJ0U3ZbNVdaSVw4Xy00Z2gONHVma0CQoZGigpKjg5OkhJSldYWVpnaGlqd3h5eoaHiImKkJaXmJmaoKWmp6ipqrC1tre4ubrAxMXGx8jJytDU1dbX2Nna4OTl5ufo6erz9PX29/j5+v/EAB8BAAMBAQEBAQEBAQEAAAAAAAECAAMEBQYHCAkKC//EAMMRAAICAQMDAwIDBQIFAgQEhwEAAhEDEBIhBCAxQRMFMCIyURRABjMjYUIVcVI0gVAkkaFDsRYHYjVT8NElYMFE4XLxF4JjNnAmRVSSJ6LSCAkKGBkaKCkqNzg5OkZHSElKVVZXWFlaZGVmZ2hpanN0dXZ3eHl6gIOEhYaHiImKkJOUlZaXmJmaoKOkpaanqKmqsLKztLW2t7i5usDCw8TFxsfIycrQ09TV1tfY2drg4uPk5ebn6Onq8vP09fb3+Pn6/9sAQwAFAwQEBAMFBAQEBQUFBgcMCAcHBwcPCwsJDBEPEhIRDxERExYcFxMUGhURERghGBodHR8fHxMXIiQiHiQcHh8e/9sAQwEFBQUHBgcOCAgOHhQRFB4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4e/9oADAMBAAIRAxEAAAHqpRKaf//aAAgBAQABBQIEv//aAAgBAxEBPwF//9oACAECEQE/AX//2gAIAQEABj8C4l//xAAzEAEAAwACAgICAgMBAQAAAgsBEQAhMUFRYXGBkaGxwfDREOHxIDBAUGBwgJCgsMDQ4P/aAAgBAQABPyGGfyX/2gAMAwEAAhEDEQAAELP/xAAzEQEBAQADAAECBQUBAQABAQkBABEhMRBBUWEgcfCRgaGx0cHh8TBAUGBwgJCgsMDQ4P/aAAgBAxEBPxC//9oACAECEQE/EL//2gAIAQEAAT8QQ3Udr//Z';

stories.addDecorator(withKnobs)

stories
  .add('default', () => (
    <Swipe
      overScan={number('overScan', 0)}
      autoPlay={boolean('autoPlay', false)}
      autoPlayInterval={number('Autoplay Interval', 4000)}
      onSwipe={firstArg('slideChanged')}
      responsive={true}
    >
      <LazyCard defaultImage={defaultImage} image='https://is1-2.housingcdn.com/afe3f526/1264f1fbf64cb1d23dfaa3beb33ff0ef/v2/medium.jpg'/>
      <LazyCard defaultImage={defaultImage} image='https://is1-3.housingcdn.com/afe3f526/13b186eece020d2d4ad85cea21cdb991/v4/medium.jpg'/>
      <LazyCard defaultImage={defaultImage} image='https://is1-3.housingcdn.com/afe3f526/7114b67ecce8e089fa750d76372d4636/v3/medium.jpg'/>
    </Swipe>
  ));
