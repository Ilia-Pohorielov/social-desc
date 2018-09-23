//Core
import React, { Component } from 'react';

//Components
import { Consumer } from 'components/HOC/withProfile';

//Instruments
import Stles from './styles.m.css';


export default class StatusBar extends Component {
    render(){
        return(
            <Consumer>
                {(context) => (
                    <section className={ Stles.statusBar }>
                        <button>
                            <img src = { context.avatar } alt = { context.currentUserFirstName }/>
                            <span>{ context.currentUserFirstName }</span>
                            &nbsp;
                            <span>{ context.currentUserLastName }</span>
                        </button>
                    </section>
                )}
            </Consumer>
        );
    }
}