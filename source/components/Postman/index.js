// Core
import React from 'react';
import { Transition } from 'react-transition-group';
import { fromTo } from 'gsap';

// Instruments
import Styles from './styles.m.css';
import { withProfile } from "../HOC/withProfile";

const _animationPostman = (postman) => {
    fromTo(postman, 1, { opacity: 0, x: 200 }, { opacity: 1, x: 0 });
};

const _hidePostman = (hide) => {
    fromTo(hide, 1, { opacity: 1, x: 0 }, { opacity: 0, x: 200 });
};

const Postman = (props) => {
    return (
        <Transition
            in
            appear
            onEnter = { _animationPostman }
            timeout = { 4000 }
            onEntered = { _hidePostman }
        >
            <section className = { Styles.postman } >
                <img src = { props.avatar } alt = { props.currentUserFirstName } />
                <span>Welcome online, { props.currentUserFirstName }</span>
            </section>
        </Transition>
    );
};

export default withProfile(Postman);