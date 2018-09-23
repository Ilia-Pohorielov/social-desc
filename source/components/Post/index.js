// Core
import React, { Component } from 'react';
import moment from 'moment';

// Components
import { Consumer } from 'components/HOC/withProfile';


// Instruments
import avatar from '../../theme/assets/lisa';
import Styles from './styles.m.css';

export default class Feed extends Component {
    render(){
        return (
            <Consumer>
                {
                    (context) => (
                        <section className={ Styles.post }>
                            <img src={ context.avatar } alt = { context.currentUserFirstName } />
                            <a href="#">{`
                    ${ context.currentUserFirstName } ${ context.currentUserLastName }
                    `}
                            </a>
                            <time>{moment().format('MMMM D h:mm:ss a')}</time>
                            <p>Howdy!</p>
                        </section>
                    )
                }
            </Consumer>
        );
    }
}