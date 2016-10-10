import React, { Component, PropTypes } from 'react'
import classNames from 'classnames'
import autoBind from 'react-auto-bind'

export default class Slide extends Component {
  constructor (props) {
    super(props)
    this.state = {
      image: props.lazyLoad ? props.defaultImage : (props.defaultImage || props.image),
      width: 0
    }

    autoBind(this)
  }

  componentDidMount () {
    if (this.props.autoLoad) this.load()
  }

  componentWillReceiveProps (nextProps) {
    this.setState({
      width: nextProps.width
    })
  }

  load () {
    const {image} = this.props
    if (image && this.state.image !== image) {
      const img = new Image()
      img.src = image
      img.onload = () => {
        this.setState({
          image
        })
      }
    }
  }

  render () {
    const {width, image, attributes, children, title} = this.props

    const style = {}

    if (width) style.width = width
    if (this.state.image) style.backgroundImage = `url(${this.state.image})`

    const mainClass = classNames('rs-img', {
      'rs-loaded': this.state.image === image
    })

    return (
      <div
        className={mainClass}
        style={style}
        title={title}
        {...attributes}
      >{children}</div>
    )
  }
}

Slide.propTypes = {
  // additional attributes for the root node
  attributes: PropTypes.object,

  // should the component automatically lazy Load
  autoLoad: PropTypes.bool,

  // width of slide
  width: PropTypes.number,

  // url of the main image
  image: PropTypes.string.isRequired,

  // url of pre loaded image
  defaultImage: PropTypes.string,

  // title for the image
  // serves similar to alt attribute for image
  title: PropTypes.string,

  lazyLoad: PropTypes.bool,

  children: PropTypes.oneOfType([
    PropTypes.array, PropTypes.object
  ])
}

Slide.defaultProps = {
  title: '',
  attributes: {},
  autoLoad: false,
  lazyLoad: true
}
