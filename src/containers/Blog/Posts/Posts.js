import React, { Component } from "react";
import axios from '../../../axios';
import { Route } from 'react-router-dom';

import Post from '../../../components/Post/Post';
import FullPost from '../FullPost/FullPost'
import './Posts.css'


class Posts extends Component {
    state = {
        posts: [],
    }

    componentDidMount () {
        axios.get('/posts')
            .then(response => {
                const posts = response.data.splice(0, 4);
                const updatedPosts = posts.map(post => {
                    return {
                        ...post,
                        author: 'Max'
                    }
                })
                this.setState({posts: updatedPosts})
                // console.log(this.state.posts);
            })
            .catch(error => {
                console.log(error);
                // this.setState({ error: true })
            })
    }

    postSelectedHandler = ( id ) => {
        // this.props.history.push({pathname: '/posts/' + id});
        this.props.history.push('/posts/' + id);
    }

    render() {
        let posts = <p style={{textAlign: 'center', color: 'red'}}>Something went wrong</p>
        if (!this.state.error) {
            posts = this.state.posts.map(post => {
                return ( 
                    <Post
                        key={post.id}
                        title={post.title}
                        author={post.author}
                        clicked={() => this.postSelectedHandler(post.id)}/>
                );
            })
        }
        return (
            <div>
                <section className="Posts">
                    {posts}
                </section>
                {/* <Route path="/posts/:id" exact component={FullPost}/> */}
                <Route path={this.props.match.url+ '/:id'} exact component={FullPost}/>
            </div>
        )
    }
}

export default Posts;