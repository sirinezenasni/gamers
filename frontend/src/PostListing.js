import React, {useState} from 'react';

const PostListing = () => {
    const [state, setState] = useState(
        {
            posts: [],
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

    if (state.posts.length <= 0) {
        GetPost();
    }

    return (
        <div>
            PostListing
            <div className="container">
                {
                    state.posts.map(
                    (post, i) =>
                        <div key={i}>
                            <div className="card">
                                <h5 className="card-title">{post.text}</h5>
                            </div>
                            <button type="button" className="btn btn-primary">Like</button>
                            <p> {post.likes.length}</p>
                        </div>
                    )
                }
            </div>
        </div>
    );
}

export default PostListing;