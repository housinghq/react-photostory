import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

export default class Slide extends Component{
  constructor(props) {
    super(props)
    this.state = {
      image: props.defaultImage || props.image,
      width: 0
    }

    this.load = this.load.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      width: nextProps.width
    })
  }

  load() {
    const {image} = this.props;
    if (this.state.image !== image) {
      const img = new Image();
      img.src = image;
      img.onload = () => {
        this.setState({
          image
        })
      }
    }
  }

  render() {
    const {width, image, index, children} = this.props;

    const style = {
      width,
      backgroundImage: `url(${this.state.image})`
    }

    const mainClass = classNames('rs-img', {
      'rs-loaded': this.state.image === image
    })

    return (
      <div
        className={mainClass}
        data-index={index}
        style={style}
      >{children}</div>
    )
  }
}

Slide.propTypes = {
  // index of slide
  index: PropTypes.number,

  // width of slide
  width: PropTypes.number,

  // url of the main image
  image: PropTypes.string.isRequired,

  // url of pre loaded image
  defaultImage: PropTypes.string
}