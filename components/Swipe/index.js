import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import './app.css';

function autoBind(methods, context) {
  methods.forEach(method => {
    // eslint-disable-next-line no-param-reassign
    context[method] = context[method].bind(context);
  });
}

export default class Swipe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentIndex: props.initialIndex,
      width: null,
      scrollLeft: 0,
      drag: 0
    };

    autoBind([
      'getImages',
      'setWidth',
      'handleTouchStart',
      'handleTouchEnd',
      'handleTouchMove',
      'gotoNext',
      'gotoPrev',
      'onChange',
      'lazyLoadImage',
      'initLazyLoad'
    ], this);
  }

  componentDidMount() {
    this.setWidth();
    this.initLazyLoad();

    window.addEventListener('resize', this.setWidth);
  }

  setWidth() {
    if (this.swipeRef) {
      this.setState({
        width: this.swipeRef.clientWidth
      })
    }
  }

  getStyle(img, asObject = false) {
    if (asObject) {
      return {
        width: `${this.state.width}px`,
        backgroundImage: `url(${img})`
      }
    }
    return `background-image: url(${img});width: ${this.state.width}px;`
  }

  getImages() {
    const {images, defaultImages, initialIndex} = this.props;
    return images.map((img, i) => {
      let imgSrc = typeof defaultImages === 'string' ? defaultImages : defaultImages[i];
      if (i === initialIndex) imgSrc = img;
      return (
        <div
          key={i}
          data-index={i}
          data-src={img}
          ref={(img) => (this[`imageRef${i}`] = img)}
          style={this.getStyle(imgSrc, true)}
          className="rs-img"
        ></div>
      )
    })
  }

  handleTouchStart(e) {
    this.clientX = e.touches[0].clientX;
    document.addEventListener('touchmove', this.handleTouchMove);
  }

  handleTouchEnd() {
    const {drag, currentIndex, width} = this.state;

    const initialIndex = currentIndex;

    if (Math.abs(drag) > 0.5 * width) {
      this.setState(() => {
        if (drag < 0 && currentIndex > 0) {
          return {
            // goto previous slide
            currentIndex: currentIndex - 1
          }
        } else if (drag > 0 && ((currentIndex + 1) < this.props.images.length)) {
          return {
            // goto next slide
            currentIndex: currentIndex + 1
          }
        }
      }, () => {
        this.onChange(initialIndex)
      })
    }

    this.setState({
      drag: 0
    });

    document.removeEventListener('touchmove', this.handleTouchMove);
  }

  lazyLoadImage(elementRef) {
    if (!elementRef) return;
    const imgSrc = elementRef.getAttribute('data-src');
    const img = new Image();
    img.src = imgSrc;
    img.onload = () => {
      elementRef.setAttribute('style', this.getStyle(imgSrc));
    }
  }

  initLazyLoad() {
    const {currentIndex} = this.state;
    const {overScan, images} = this.props;
    this.lazyLoadImage(this[`imageRef${currentIndex}`]);
    if (overScan === 1) {
      if (currentIndex > 0) this.lazyLoadImage(this[`imageRef${currentIndex - 1}`]);
      if (currentIndex + 1 < images.length) this.lazyLoadImage(this[`imageRef${currentIndex + 1}`]);
    }
  }

  handleTouchMove(e) {
    console.log(e);
    const dx = this.clientX - e.touches[0].clientX;

    this.setState({
      drag: dx
    })
  }

  gotoPrev() {
    if (this.state.currentIndex > 0) {
      this.setState({
        currentIndex: this.state.currentIndex - 1
      })
    }
  }

  gotoNext() {
    if (this.state.currentIndex + 1 < this.props.images.length) {
      this.setState({
        currentIndex: this.state.currentIndex + 1
      })
    }
  }

  onChange(initialIndex) {
    this.props.onSwipe({
      currentIndex: this.state.currentIndex,
      initialIndex
    });
    this.initLazyLoad();
  }

  render() {
    const {className, images, prev, next} = this.props;

    const {width, drag, currentIndex} = this.state;

    const mainClass = classNames('react-swipe', className);

    const nextClass = classNames('rs-next', {
      disabled: currentIndex + 1 >= images.length
    });

    const prevClass = classNames('rs-prev', {
      disabled: currentIndex === 0
    });

    const style = {
      width: `${images.length * width}px`,
      transform: `translateX(${-(currentIndex * width) - drag}px)`
    };
    return (
      <div className={mainClass}>
        <div className='rs-swipe-gallery' ref={(swipe) => (this.swipeRef = swipe)}>
          <div
            className="rs-imgs-wrapper"
            style={style}
            onTouchStart={this.handleTouchStart}
            onTouchEnd={this.handleTouchEnd}
          >
            {this.getImages()}
          </div>
        </div>
        <div className={prevClass} onClick={this.gotoPrev}>{prev}</div>
        <div className={nextClass} onClick={this.gotoNext}>{next}</div>
      </div>
    )
  }
}

Swipe.propTypes = {
  // custom class name for the component
  className: PropTypes.string,

  // array of image URLs
  images: PropTypes.array.isRequired,

  // array or a single image to be used as default
  // until the main image has been loaded.
  defaultImages: PropTypes.oneOfType([
    PropTypes.string, PropTypes.array
  ]),

  // number of images to be loaded in advance
  overScan: PropTypes.oneOf([0, 1]),

  // function called on slide change
  // argument { initialIndex, currentIndex }
  onSwipe: PropTypes.func,

  // index of initially visible image
  initialIndex: PropTypes.number
};

Swipe.defaultProps = {
  overScan: 1,
  initialIndex: 0,
  onSwipe(){
  },
  defaultImages: '',
  prev: <button>PREV</button>,
  next: <button>NEXT</button>
};