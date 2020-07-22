import React, {useContext} from 'react';
import AppContext from './AppContext.js';

const Post = () => {
    let postField;

    const SavePost = () => {
        fetch("http://localhost:8080/post", 
            {
                method: 'POST',
                body: JSON.stringify({text: postField.value}),
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem('jwt')}`
                }
            }
        )
        .then(
            (result) => result.text()
        )
        .then (
            (json) => {
                console.log('response from backend', json);
            }
        )
    }
    console.log(postField);
    return (
        <div>
            Post
            <div className="input-group mb-3">
                <input 
                    ref={ (elem) => postField = elem }
                    type="text" 
                    className="form-control" 
                    placeholder="What's on your mind ?" 
                    aria-label="What's on your mind ?" 
                    aria-describedby="button-addon2"/>
                <div className="input-group-append">
                    <button 
                        onClick={SavePost}
                        className="btn btn-outline-secondary" 
                        type="button" 
                        id="button-addon2">
                        Post</button>
                </div>
            </div>
        </div>
    );
}

export default Post;