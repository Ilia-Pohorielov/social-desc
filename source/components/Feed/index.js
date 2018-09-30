// Core
import React, { Component } from 'react';

// Components
import Composer from '../Composer';
import Post from '../Post';
import StatusBar from "../StatusBar";
import Spinner from 'components/Spinner';

// Instruments
import Styles from './styles.m.css';


export default class Feed extends Component {
    state = {
        posts: [
            {
                id: '1',
                comment: 'Hi there',
                created: 1526825076849,
            },
            {
                id: '2',
                comment: 'Привет!',
                created: 1526825076855,
            }
        ],
        isSpinning : true,
    };
    render(){
        const { posts, isSpinning } = this.state;

        const postsJSX = posts.map((post) => {
           return <Post key = { post.id } { ...post } />;
        });

        return (
            <section className ={ Styles.feed }>
                <Spinner isSpinning = { isSpinning } />
                <StatusBar />
                <Composer />
                { postsJSX }
            </section>
        );
    }
}