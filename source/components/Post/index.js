// Core
import React, { Component } from 'react';
import moment from 'moment';
import { func, string, array, number } from 'prop-types';

// Components
import Like from 'components/Like';
import { withProfile } from 'components/HOC/withProfile';

// Instruments
import Styles from './styles.m.css';

@withProfile
export default class Feed extends Component {
    static propTypes = {
        _likePost: func.isRequired,
        comment: string.isRequired,
        created: number.isRequired,
        id: string.isRequired,
        likes: array.isRequired,
        removePost: func.isRequired,
    };

    _removePost = () => {
        const { removePost, id } = this.props;
        removePost(id);
    };

    _getCross = () => {
        const { firstName, lastName, currentUserFirstName, currentUserLastName } = this.props;
        return `${firstName} ${lastName}` === `${currentUserFirstName} ${currentUserLastName}`
            ? <span className = { Styles.cross } onClick = { this._removePost }/> : null
    }
    render(){
        const {
            comment,
            created,
            _likePost,
            id,
            likes,
            avatar,
            firstName,
            lastName,
        } = this.props;


        const cross = this._getCross();

        return (
            <section className = { Styles.post }>
                { cross }
                <img src ={ avatar } alt = { firstName } />
                <a href ="#">{`${ firstName } ${ lastName }`}</a>
                <time>{moment.unix(created).format('MMMM D h:mm:ss a')}</time>
                <p>{ comment }</p>
                <Like
                    _likePost = { _likePost }
                    id = { id }
                    likes = { likes }
                />
            </section>
        );
    }
}