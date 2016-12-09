import React, { Component, PropTypes } from 'react'
import classNames from 'classnames'
import autoBind from 'react-auto-bind'

export default class Story extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isOpen: false,
      currentIndex: 0,
      length: 0,
      pan: null,
      data: {}
    }

    autoBind(this)
  }

  handleClick ({index, length, title, subTitle, image, data}) {
    const {isOpen} = this.state
    if (!isOpen) {
      this.setState({isOpen: true, length, currentIndex: index, title, subTitle, data}, () => {
        document.body.style.overflow = this.state.isOpen ? 'hidden' : null
      })

      this.props.onOpen({index, title, subTitle, data})
    } else {
      this.setState({
        pan: image
      })
    }
  }

  handleSwipe ({currentIndex, title, subTitle, data}) {
    this.setState({currentIndex, title, subTitle, data})
  }

  disablePan () {
    this.setState({pan: false})
  }

  closeModal () {
    this.setState({
      isOpen: false
    }, () => {
      this.props.onClose({index: this.state.currentIndex})
    })

    this.disablePan()
  }

  render () {
    const {children, height, panHeight, closeBtn, footerElem, headerElem} = this.props
    const {isOpen, currentIndex, length, title, subTitle, pan, data} = this.state
    const mainClass = classNames('react-story', {
      open: isOpen,
      pan: !!pan
    })

    const style = isOpen ? {
      marginTop: -(pan ? panHeight : height) / 2
    } : {}

    const panStyle = {
      marginTop: -panHeight / 2,
      height: panHeight,
      display: 'none'
    }

    if (pan) {
      style.height = panHeight
      style.overflowX = 'scroll'
      panStyle.display = 'block'
    }

    const args = {currentIndex, title, subTitle, length, image: pan, data}

    return (
      <div className={mainClass}>
        {isOpen && <div>
          <div className='rs-close' onClick={this.closeModal}>{closeBtn}</div>
          <div className='rs-header'>{headerElem(args)}</div>
        </div>}
        <div className='swipe-wrapper' style={style}>
          {children({
            handleClick: this.handleClick,
            handleSwipe: this.handleSwipe,
            height: isOpen ? height : undefined
          })}
          {pan && <img className='rs-pan-image' src={pan} onClick={this.disablePan} style={panStyle} />}
        </div>

        {isOpen && footerElem(args)}
      </div>
    )
  }
}

Story.propTypes = {
  height: PropTypes.number.isRequired,
  closeBtn: PropTypes.element,
  panHeight: PropTypes.number,
  children: PropTypes.func,
  headerElem: PropTypes.func,
  footerElem: PropTypes.func,
  onOpen: PropTypes.func,
  onClose: PropTypes.func
}

Story.defaultProps = {
  panHeight: 500,
  closeBtn: <span>&#x2715;</span>,
  headerElem (...args) {
    return <span>Photo {args[0].currentIndex + 1} of {args[0].length}</span>
  },
  footerElem (...args) {
    return (
      <div className='rs-footer'>
        <div className='rs-title'>{args[0].title}</div>
        <div className='rs-sub-title'>{args[0].subTitle}</div>
      </div>
    )
  },
  onClose () {
  },
  onOpen () {
  }
}
