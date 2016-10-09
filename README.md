#react-photostory

> A lightweight carousel made in React and optimized for mobile

##Features

1. lazy-loading by default
1. AutoPlay
1. Drag and swipe

## Installation
```
npm install --save react-photostory
```

## Basic Usage
```js
import { Slide, Swipe } from 'react-photostory';

<Swipe
  className="photostory"
>
    <Slide image="a.jpg" defaultImage="default1.jpg">Text 1</Slide>
    <Slide image="b.jpg" defaultimage="default2.jpg">Text 2</Slide>
</Swipe>
```

## Options

### <Swipe/> Component

prop|default|description
----|-------|-----------
className|''|Custom classname
initialIndex|0|initially visible slide index
autoPlay|false|whether to display slide show or not
overScan|0|Number of Slide offsets to load excluding the current slide.If its 1 it will load current, current+-1
onSwipe|({initialIndex, currentIndex})| function executed whenever the current slide changes
prev||React element to replace the PREV button
next||React element to replace the NEXT button
threshold|0.5|Ratio of carousel width one should drag to make successful swipe
responsive|false|Should the gallery be responsive

### <Slide/> Component

prop|description
----|------------
image|final image to be loaded
defaultImage|pre-loader image to be shown.

### Contribution
Take a pull, create a branch and get started.

### License
MIT
