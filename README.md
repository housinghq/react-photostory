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
onClick|{index}|function executed when a slide is clicked
prev||React element to replace the PREV button
next||React element to replace the NEXT button
threshold|0.5|Ratio of carousel width one should drag to make successful swipe
responsive|false|Should the gallery be responsive

To manually go to a particular slide you can use `gotoSlide(i)` method

```js
const x = (
<Swipe
  className="photostory"
>
    <Slide image="a.jpg" defaultImage="default1.jpg">Text 1</Slide>
    <Slide image="b.jpg" defaultimage="default2.jpg">Text 2</Slide>
    <Slide image="c.jpg" defaultimage="default3.jpg">Text 2</Slide>
</Swipe>
)

x.gotoSlide(2) // will go to the 3rd slide
```

### <Slide/> Component

prop|default|description
----|-------|-----
image|string|final image to be loaded
defaultImage|string|pre-loader image to be shown
autoLoad|false|should the component automatically lazyLoad the image

If `autoload` is set to false the you have to manually call `.load()` to load the image

```js
// This will not load `image` automatically. Will load default1.jpg
const a = <Slide image="a.jpg" defaultImage="default1.jpg">Text 1</Slide>
a.load() // now image will be loaded

// Alternatively set `autoLoad` to true. So `a.jpg` will automatically replace
// default1.jpg when it is loaded.
<Slide image="a.jpg" defaultImage="default1.jpg" autoLoad={true}>Text 1</Slide>
```

### Contribution
Take a pull, create a branch and get started.

### License
MIT
