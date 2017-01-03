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
      panImageUrl: null
    }

    this.data = {}

    autoBind(this)
  }

  handleClick ({index, length, title, subTitle, image, data}) {
    const {isOpen} = this.state
    if (!isOpen) {
      this.data = data
      this.setState({isOpen: true, length, currentIndex: index, title, subTitle}, () => {
        document.body.style.overflow = this.state.isOpen ? 'hidden' : null
      })

      this.props.onOpen({index, title, subTitle, data})
    } else {
      this.setState({
        panImageUrl: image
      })
    }
  }

  handleSwipe ({currentIndex, title, subTitle, data}) {
    this.data = data
    this.setState({currentIndex, title, subTitle})
  }

  disablePan () {
    this.setState({panImageUrl: false})
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
    const {isOpen, currentIndex, length, title, subTitle, panImageUrl} = this.state
    const mainClass = classNames('react-story', {
      open: isOpen,
      panImageUrl: !!panImageUrl
    })

    const style = isOpen ? {
      marginTop: -(panImageUrl ? panHeight : height) / 2
    } : {}

    const panStyle = {
      marginTop: -panHeight / 2,
      height: panHeight,
      display: 'none'
    }

    if (panImageUrl) {
      style.height = panHeight
      style.overflowX = 'scroll'
      panStyle.display = 'block'
    }

    const args = {currentIndex, title, subTitle, length, image: panImageUrl, data: this.data}

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
            height: isOpen ? height : undefined,
            index: currentIndex
          })}
          {panImageUrl && <img className='rs-pan-image' src={panImageUrl} onClick={this.disablePan} style={panStyle} />}
        </div>

        {isOpen && footerElem(args)}
      </div>
    )
  }

  componentWillUnmount () {
    document.body.style.overflow = null
  }
}

Story.propTypes = {
  height: PropTypes.number,
  closeBtn: PropTypes.element,
  panHeight: PropTypes.number,
  children: PropTypes.func,
  headerElem: PropTypes.func,
  footerElem: PropTypes.func,
  onOpen: PropTypes.func,
  onClose: PropTypes.func
}

Story.defaultProps = {
  height: 300,
  panHeight: 500,
  closeBtn: <span> &#x2715; </span>,
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
