// Core
import React, { Component } from 'react';
import moment from 'moment';

// Components
import Composer from '../Composer';
import Post from '../Post';
import StatusBar from "../StatusBar";
import Spinner from 'components/Spinner';
import { withProfile } from 'components/HOC/withProfile';
import Catcher from 'components/Catcher';

// Instruments
import Styles from './styles.m.css';
import { getUniqueID, delay } from 'instruments';

@withProfile
export default class Feed extends Component {

    state = {
        posts: [
            {
                id: '1',
                comment: 'Hi there',
                created: 1526825076849,
                likes: [],
            },
            {
                id: '2',
                comment: 'Привет!',
                created: 1526825076855,
                likes: [],
            }
        ],
        isSpinning : false,
    };

    _setPostsFetchingState = (state) => {
        this.setState({
            isSpinning: state,
        });
    };

    _createPost = async (comment) => {
        this._setPostsFetchingState(true);

        const post = {
            id: getUniqueID(),
            created: moment.now(),
            comment,
            likes: [],
        };
        await delay(1200);

        this.setState( ({ posts }) => ({
            posts: [post, ...posts],
            isSpinning : false,
        }));
    };

    _likePost = async (id) => {
        const { currentUserFirstName, currentUserLastName } = this.props;

        this._setPostsFetchingState(true);

        await delay(1200);

        const newPosts = this.state.posts.map((post) => {
           if ( post.id === id ) {
               return {
                   ...post,
                   likes: [
                       {
                           id: getUniqueID(),
                           firstName: currentUserFirstName,
                           lastName: currentUserLastName
                       }
                   ]
               }
           }

           return post;
        });

        this.setState({
            posts: newPosts,
            isSpinning: false,
        });
    };

    _removePost = (id) => {

        const newPosts = this.state.posts.filter((post) => post.id !== id );

        this.setState({
            posts: newPosts,
        });

    };

    render(){
        const { posts, isSpinning } = this.state;

        const postsJSX = posts.map((post) => {
           return(
               <Catcher key = { post.id }>
                   <Post
                       { ...post }
                       _likePost = { this._likePost }
                       removePost = { this._removePost }
                   />;
               </Catcher>
               )
        });

        return (
            <section className ={ Styles.feed }>
                <Spinner isSpinning = { isSpinning } />
                <StatusBar />
                <Composer _createPost = { this._createPost } />
                { postsJSX }
            </section>
        );
    }
}