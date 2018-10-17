// Core
import React, { Component } from 'react';
import { Transition } from 'react-transition-group';
import { fromTo } from 'gsap';

// Components
import { withProfile } from 'components/HOC/withProfile';
import Catcher from 'components/Catcher';
import StatusBar from "../StatusBar";
import Composer from '../Composer';
import Post from '../Post';
import Spinner from 'components/Spinner';
import Postman from 'components/Postman';

// Instruments
import Styles from './styles.m.css';
import { getUniqueID, delay } from 'instruments';
import { api, TOKEN, GROUP_ID } from "../../config/api";
import { socket } from "socket/init";

@withProfile
export default class Feed extends Component {

    state = {
        posts: [],
        isSpinning : false,
    };

    _setPostsFetchingState = (state) => {
        this.setState({
            isSpinning: state,
        });
    };

    _createPost = async (comment) => {
        this._setPostsFetchingState(true);

        const response = await fetch(api, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: TOKEN,
            },
            body: JSON.stringify({ comment }),
        });

        const { data: post } = await response.json();

        this.setState( ({ posts }) => ({
            posts: [post, ...posts],
            isSpinning : false,
        }));
    };

    _likePost = async (id) => {
        this._setPostsFetchingState(true);

        const response = await fetch(`${api}/${id}`, {
            method: 'PUT',
            headers: {
                Authorization: TOKEN,
            },
        });

        const { data: likedPost } = await response.json();
        this.setState(({ posts }) => ({
            posts: posts.map(
                (post) => post.id === likedPost.id ? likedPost : post,
            ),
            isSpinning: false,
        }));
    };

    componentDidMount() {
        const { currentUserFirstName, currentUserLastName } = this.props;
        this._fetchPosts();
        socket.emit('join', GROUP_ID);
        socket.on('like', (postJSON) => {
            const { data: likedPost, meta } = JSON.parse(postJSON);
            if(
                `${currentUserFirstName} ${currentUserLastName}` !==
                `${meta.authorFirstName} ${meta.authorLastName}`) {

                this._likePost(likedPost.id);
            }
        });
        socket.on('create', (postJSON) => {
            const { data: createdPost, meta } = JSON.parse(postJSON);

            if(
                `${currentUserFirstName} ${currentUserLastName}` !==
                `${meta.authorFirstName} ${meta.authorLastName}`) {
                this.setState(({ posts }) => ({
                    posts: [createdPost, ...posts],
                }));
            }
            this._likePost(createdPost.id);
        });

        socket.on('remove', (postJSON) => {
            const { data: removedPost, meta } = JSON.parse(postJSON);
            if(
                `${currentUserFirstName} ${currentUserLastName}` !==
                `${meta.authorFirstName} ${meta.authorLastName}`) {
                this.setState(({ posts }) => ({
                    posts: posts.filter( post => post.id !== removedPost.id ),
                }));
            }
        });
    }

    componentWillUnmount () {
        socket.removeListener('create');
        socket.removeListener('remove');
        socket.removeListener('like');
    }

    _fetchPosts = async () => {
        this._setPostsFetchingState(true);

        const response = await fetch(api, {
            method: 'GET',
        });

        const { data: posts } = await response.json();

        this.setState({
            posts,
            isSpinning: false,
        });

    };

    _removePost = async (id) => {
        this._setPostsFetchingState(true);

        await fetch(`${api}/${id}`, {
            method: 'DELETE',
            headers: {
                Authorization: TOKEN,
            },
        });

        this.setState(({ posts }) => ({
            posts: posts.filter((post) => post.id !== id ),
            isSpinning: false,
        }));

    };

    _animateComposerEnter = (composer) => {
        fromTo(composer, 1, { opacity: 0, rotationX: 50 }, { opacity: 1, rotationX: 0 });
    };

    _animationPostman = (postman) => {
        fromTo(postman, 1, { opacity: 0, x: 100 }, { opacity: 1, x: 0 });
    };

    _hidePostman = (hide) => {
      fromTo(hide, 1, { opacity: 1, visibility: 'visible' }, { opacity: 0 , visibility: 'visible'});
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
                   />
               </Catcher>
               )
        });

        return (
            <section className = { Styles.feed }>
                <Spinner isSpinning = { isSpinning } />
                <StatusBar />
                <Transition
                    appear
                    in
                    onEnter = { this._animateComposerEnter }
                    timeout = { 1000 }>
                    <Composer _createPost = { this._createPost } />
                </Transition>
                { postsJSX }
                <Transition
                    in
                    appear
                    onEnter = { this._animationPostman }
                    timeout = { 4000 }
                    onEntered = { this._hidePostman }
                >
                    <Postman />
                </Transition>
            </section>
        );
    }
}