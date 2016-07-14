import React, { Component } from 'react';
import styles from './App.scss';

export default class App extends Component {
    render() {
        return <div className={styles.app} onClick={this.props.onClick}>Hello World</div>;
    }
}

