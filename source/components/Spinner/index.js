// Core
import React, { Component } from 'react';
import { createPortal } from 'react-dom';

// Instuments
import Styles from './styles.m.css';

const portal = document.getElementById('spinner');

export default class Spinner extends Component {
    render() {
        const { isSpinning } = this.props;

        return createPortal(
            isSpinning ? <div className={ Styles.spinner } /> : null,
            portal
        );
    }
}