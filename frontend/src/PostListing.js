import React, {useState} from 'react';

const PostListing = () => {
    const [state, setState] = useState(
        {
            posts: [],
            users: []
        }
    )
    
    const GetPost = () => {
        fetch("http://localhost:8080/postlisting", 
            {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem('jwt')}`
                }
            }
        )
        .then(
            (result) => result.json()
        )
        .then (
            (json) => {
                setState({...state, posts: json});
            }
        );
    }

    const GetUsers = () => {
        fetch("http://localhost:8080/users/profile", 
            {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem('jwt')}`
                }
            }
        )
        .then(
            (result) => result.json()
        )
        .then (
            (json) => {
                setState({...state, users: json});
            }
        );
    }

    if (state.posts.length <= 0) {
        GetPost();
    }

    return (
        <div>
            PostListing
            <div className="text-center">
                {
                    state.posts.map(
                    (post, i) =>
                        <div className="card card-post"key={i}>
                            <div className="card-header">
                                {post._id}
                            </div>
                            <div className="card-body">
                                <p className="card-text">{post.text}</p>
                                <a href="#" className="btn btn-primary">Likes</a>
                            </div>
                            <div className="card-footer text-muted">
                                <p> {post.likes.length}</p>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    );
}

export default PostListing;