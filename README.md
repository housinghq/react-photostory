#react-photostory

> A lightweight carousel made in React and optimized for mobile.

[![codecov](https://codecov.io/gh/housinghq/react-photostory/branch/master/graph/badge.svg)](https://codecov.io/gh/housinghq/react-photostory)
[![Build Status](https://travis-ci.org/housinghq/react-photostory.svg?branch=master)](https://travis-ci.org/housinghq/react-photostory)

<p align="center"><img src="demo.gif" width="400"/></p>



Demo is available [here](https://housinghq.github.io/react-photostory). Make sure devtools is
open and mobile emulation is selected as this library currently only supports touch events.

##Features

1. lazy-loading by default
1. AutoPlay
1. Drag and swipe

## Installation
This library works with [react-lazy-card](https://github.com/housinghq/react-lazy-card) (don't
worry. they are very light even when used together . react-lazy-card may serve other purposes in the app so we separated it).

```
npm install --save react-photostory react-lazy-card
```

## Basic Usage
**JSX**:
```js
import Swipe from 'react-photostory';
import LazyCard from 'react-lazy-card';

<Swipe className="photostory">
    <LazyCard image="a.jpg" defaultImage="default1.jpg">Text 1</LazyCard>
    <LazyCard image="b.jpg" defaultimage="default2.jpg">Text 2</LazyCard>
</Swipe>
```
**CSS**
```css
@import "react-photostory/dist/swipe" // contains CSS of Slide
```

## Options

### &lt;Swipe/&gt; Component

prop|default|description
----|-------|-----------
className|''|Custom classname
initialIndex|0|initially visible slide index
autoPlay|false|whether to display slide show or not
overScan|0|Number of Slide offsets to load excluding the current slide.If its 1 it will load current, current+-1
onSwipe|({initialIndex, currentIndex})| function executed whenever the current slide changes
onClick|{index}|function executed when a slide is clicked
prev|&lt;button&gt;PREV&lt;/button&gt;|React element to replace the PREV button
next|&lt;button&gt;NEXT&lt;/button&gt;|React element to replace the NEXT button
threshold|0.5|Ratio of carousel width one should drag to make successful swipe
responsive|false|whether or not to listen to window resize event

#### .gotoSlide(i)
To manually go to a particular slide you can use `gotoSlide(i)` method

```js
const x = (
<Swipe className="photostory">
    <Slide image="a.jpg" defaultImage="default1.jpg">Text 1</Slide>
    <Slide image="b.jpg" defaultimage="default2.jpg">Text 2</Slide>
    <Slide image="c.jpg" defaultimage="default3.jpg">Text 2</Slide>
</Swipe>
)

x.gotoSlide(2) // will go to the 3rd slide
```

### Development
```
git clone https://github.com/housinghq/react-photostory
cd react-photostory
npm install
npm run storybook
```
Make sure you develop in emulation mode (open devtools and select mobile emulation). Currently this only supports touch events.

Open an issue before opening a PR. This package is optimised for mobile so its hard to include all the features.

###License
MIT @ Loconsolutions
