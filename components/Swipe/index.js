import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import './app.css';

export default class Swipe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentIndex: 0,
      width: null,
      scrollLeft: 0,
      drag: 0
    };

    this.getImages = this.getImages.bind(this);

    this.setWidth = this.setWidth.bind(this);
    this.handleTouchStart = this.handleTouchStart.bind(this);
    this.handleTouchEnd = this.handleTouchEnd.bind(this);
    this.handleTouchMove = this.handleTouchMove.bind(this)
  }

  componentDidMount() {
    this.setWidth();

    document.addEventListener('resize', this.setWidth);
  }

  setWidth() {
    if (this.refs.swipe) {
      this.setState({
        width: this.refs.swipe.clientWidth
      })
    }
  }

  getStyle(img) {
    return {
      backgroundImage: `url(${img})`,
      width: `${this.state.width}px`
    }
  }

  getImages() {
    return this.props.images.map((img, i) => {
      return (
        <div
          key={i}
          data-index={i}
          data-src={img}
          ref={`rs-${i}`}
          style={this.getStyle(img)}
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
            currentIndex: currentIndex - 1
          }
        } else if (drag > 0 && ((currentIndex + 1) < this.props.images.length)) {
          return {
            currentIndex: currentIndex + 1
          }
        }
      }, () => {
        this.props.onSwipe({
          currentIndex: this.state.currentIndex,
          initialIndex
        })
      })
    }

    this.setState({
      drag: 0
    });

    document.removeEventListener('touchmove', this.handleTouchMove);
  }

  handleTouchMove(e) {
    console.log(e);
    const dx = this.clientX - e.touches[0].clientX;

    this.setState({
      drag: dx
    })
  }

  render() {
    const {className, images} = this.props;

    const {width, drag, currentIndex} = this.state;

    const mainClass = classNames('react-swipe', className);

    const style = {
      width: `${images.length * width}px`,
      transform: `translateX(${-(currentIndex * width) - drag}px)`
    };
    return (
      <div className={mainClass} ref="swipe">
        <div
          className="rs-imgs-wrapper"
          style={style}
          onTouchStart={this.handleTouchStart}
          onTouchEnd={this.handleTouchEnd}
        >
          {this.getImages()}
        </div>
      </div>
    )
  }
}

Swipe.propTypes = {
  // custom class name for the component
  className: PropTypes.string,

  // array of image URLs
  images: PropTypes.array.isRequired,

  // function called on slide change
  onSwipe: PropTypes.func,

  // Number of images to lazy-load in advance +- currentIndex
  overScan: PropTypes.number
};

Swipe.defaultProps = {
  overScan: 0,
  onSwipe(){}
};