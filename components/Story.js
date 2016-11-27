import React, { Component, PropTypes } from 'react';
import classNames from 'classnames'
import autoBind from 'react-auto-bind'

export default class Story extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      currentIndex: 0,
      length: 0,
      pan: null
    }

    autoBind(this)
  }

  handleClick({index, length, title, subTitle, image}) {
    const {isOpen} = this.state;
    if (!isOpen) {
      this.setState({
        isOpen: true,
        length,
        currentIndex: index,
        title,
        subTitle
      }, () => {
        document.body.style.overflow = this.state.isOpen ? 'hidden' : null;
      })
    } else {
      this.setState({
        pan: image
      })
    }
  }

  handleSwipe({currentIndex, title, subTitle}) {
    this.setState({
      currentIndex,
      title,
      subTitle
    })
  }

  disablePan() {
    this.setState({pan: false})
  }

  close() {
    this.setState({
      isOpen: false,
      pan: false
    })
  }

  render() {
    const {children, height, panHeight} = this.props;
    const {isOpen, currentIndex, length, title, subTitle, pan} = this.state;
    const mainClass = classNames('react-story', {
      open: isOpen,
      pan: !!pan
    })

    const style = isOpen ? {
      marginTop: -(pan ? panHeight : height) / 2
    } : {}

    const panStyle = {
      backgroundImage: `url(${pan})`,
      marginTop: -panHeight / 2,
      height: panHeight,
      display: 'none'
    }

    if (pan) {
      style.height = panHeight
      style.overflowX = 'scroll'
      panStyle.display = 'block'
    }

    return (
      <div className={mainClass}>
        {isOpen && <div>
          <div className="rs-close" onClick={this.close}>&#x2715;</div>
          <div className="rs-header">Photo {currentIndex + 1} of {length}</div>
        </div>}
        <div className='swipe-wrapper' style={style}>
          {children({
            handleClick: this.handleClick,
            handleSwipe: this.handleSwipe
          })}
          {pan &&
          <img className="rs-pan-image" src={pan} onClick={this.disablePan} style={panStyle}/>
          }
        </div>

        {isOpen && <div className="rs-footer">
          <div className="rs-title">{title}</div>
          <div className="rs-sub-title">{subTitle}</div>
        </div>}
      </div>
    )
  }
}

Story.propTypes = {
  height: PropTypes.number.isRequired,
  closeBtn: PropTypes.element,
  panHeight: PropTypes.number
}

Story.defaultProps = {
  panHeight: 500
}