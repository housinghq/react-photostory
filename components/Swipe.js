import React, { Component, PropTypes } from 'react'
import classNames from 'classnames'

function autoBind (methods, context) {
  methods.forEach(method => {
    // eslint-disable-next-line no-param-reassign
    context[method] = context[method].bind(context)
  })
}

export default class Swipe extends Component {
  constructor (props) {
    super(props)
    this.state = {
      currentIndex: props.initialIndex,
      width: 0,
      scrollLeft: 0,
      drag: 0
    }

    autoBind([
      'setWidth',
      'handleTouchStart',
      'handleTouchEnd',
      'handleTouchMove',
      'gotoNext',
      'gotoPrev',
      'gotoSlide',
      'onChange',
      'initLazyLoad',
      'hasSingleImage',
      'autoPlay',
      'pause',
      'handleClick'
    ], this)
  }

  componentDidMount () {
    this.setWidth()
    this.initLazyLoad()

    if (this.props.autoPlay) this.autoPlay(this.props)

    if (this.props.responsive) {
      window.addEventListener('resize', this.setWidth, false)
    }
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.autoPlay !== nextProps.autoPlay) {
      nextProps.autoPlay ? this.autoPlay(nextProps) : this.pause()
    }
  }

  setWidth () {
    if (this.swipeRef) {
      this.setState({
        width: this.swipeRef.clientWidth
      })
    }
  }

  handleTouchStart (e) {
    if (this.hasSingleImage()) return
    this.clientX = e.touches[0].clientX
    document.addEventListener('touchmove', this.handleTouchMove, false)
  }

  handleTouchEnd () {
    if (this.hasSingleImage()) return
    const {drag, currentIndex, width} = this.state
    const {threshold} = this.props

    const initialIndex = currentIndex

    if (Math.abs(drag) > threshold * width) {
      this.setState(() => {
        if (drag < 0 && currentIndex > 0) {
          return {
            // goto previous slide
            currentIndex: currentIndex - 1
          }
        } else if (drag > 0 && ((currentIndex + 1) < this.props.children.length)) {
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
    })

    document.removeEventListener('touchmove', this.handleTouchMove, false)
  }

  initLazyLoad () {
    const {currentIndex} = this.state
    const {overScan, children} = this.props
    this[`imageRef${currentIndex}`].load()
    if (overScan === 1) {
      if (currentIndex > 0) this[`imageRef${currentIndex - 1}`].load()
      if (currentIndex + 1 < children.length) this[`imageRef${currentIndex + 1}`].load()
    }
  }

  handleTouchMove (e) {
    const dx = this.clientX - e.touches[0].clientX

    this.setState({
      drag: dx
    })
  }

  gotoPrev () {
    const {currentIndex} = this.state
    if (currentIndex > 0) {
      this.gotoSlide(currentIndex - 1)
    }
  }

  gotoNext () {
    const {currentIndex} = this.state
    if (currentIndex + 1 < this.props.children.length) {
      this.gotoSlide(currentIndex + 1)
    }
  }

  gotoSlide (i) {
    const initial = this.state.currentIndex
    this.setState({
      currentIndex: i
    }, () => (this.onChange(initial)))
  }

  autoPlay (props) {
    const {children, autoPlayInterval} = props
    this.pause()

    if (this.hasSingleImage()) return

    this.autoPlayId = setInterval(() => {
      const {currentIndex} = this.state
      if (currentIndex + 1 < children.length) {
        this.gotoNext()
      } else {
        this.gotoSlide(0, currentIndex)
      }
    }, autoPlayInterval)
  }

  pause () {
    clearInterval(this.autoPlayId)
  }

  onChange (initialIndex) {
    this.props.onSwipe({
      currentIndex: this.state.currentIndex,
      initialIndex
    })
    this.initLazyLoad()
  }

  hasSingleImage () {
    return !(this.props.children.length > 1)
  }

  handleClick () {
    this.props.onClick({
      index: this.state.currentIndex
    })
  }

  render () {
    const {className, children, prev, next} = this.props

    const {width, drag, currentIndex} = this.state

    const mainClass = classNames('react-swipe', className)

    const nextClass = classNames('rs-next', {
      disabled: currentIndex + 1 >= children.length
    })

    const prevClass = classNames('rs-prev', {
      disabled: currentIndex === 0
    })

    const style = {
      width: width ? `${children.length * width}px` : 'auto',
      transform: `translateX(${-(currentIndex * width) - drag}px)`
    }

    const self = this
    const children$ = React.Children.map(children, (child, index) => (
      React.cloneElement(child, {
        width,
        ref: (ref) => (self[`imageRef${index}`] = ref),
        attributes: {'data-index': index}
      }))
    )

    return (
      <div className={mainClass}>
        <div className='rs-swipe-gallery' ref={(swipe) => (this.swipeRef = swipe)}>
          <div
            className='rs-imgs-wrapper'
            style={style}
            onTouchStart={this.handleTouchStart}
            onTouchEnd={this.handleTouchEnd}
            onClick={this.handleClick}
          >
            {children$}
          </div>
        </div>
        {!this.hasSingleImage() && <div className={prevClass} onClick={this.gotoPrev}>{prev}</div>}
        {!this.hasSingleImage() && <div className={nextClass} onClick={this.gotoNext}>{next}</div>}
      </div>
    )
  }
}

Swipe.propTypes = {
  // autoplay true or false
  autoPlay: PropTypes.bool,

  // interval for autoplay
  autoPlayInterval: PropTypes.number,

  // custom class name for the component
  className: PropTypes.string,

  // number of images to be loaded in advance
  overScan: PropTypes.oneOf([0, 1]),

  // function called on slide change
  // argument { initialIndex, currentIndex }
  onSwipe: PropTypes.func,

  // function called on slide is clicked
  // argument { index }
  onClick: PropTypes.func,

  // index of initially visible image
  initialIndex: PropTypes.number,

  // drag ratio of full width for successful swipe
  threshold: PropTypes.number,

  // whether responsive to window resize
  responsive: PropTypes.bool,

  // prev React element
  prev: PropTypes.element,

  // next React element
  next: PropTypes.element,

  children: PropTypes.array
}

Swipe.defaultProps = {
  autoPlay: false,
  autoPlayInterval: 4000,
  overScan: 1,
  initialIndex: 0,
  onSwipe () {
  },
  onClick () {
  },
  prev: <button>PREV</button>,
  next: <button>NEXT</button>,
  threshold: 0.5,
  responsive: false
}
