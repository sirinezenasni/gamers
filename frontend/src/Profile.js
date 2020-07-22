import React, {useContext, useState} from 'react';
import AppContext from './AppContext';
import NavBar from './NavBar';
import SideBar from './SideBar';

const Profile = () => {
    const [state, setState] = useState(
        {
            profile: [],
        }
    )

    const GetProfile = () => {
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
                setState({...state, profile: json});
            }
        );
    }

    GetProfile();

    return (
        <div>
            <NavBar />
            <div className="row">
                <SideBar />
                <div className="col-9">
                    <h1>Profile</h1>

                    <div className="text-center">
                        {
                                <div className="card card-post">
                                    <div className="card-header">
                                        {state.profile._id}
                                    </div>
                                    <div className="card-body">
                                        <p className="card-text">{state.profile.firstName}</p>
                                        <p className="card-text">{state.profile.lastName}</p>
                                        <p className="card-text">{state.profile.userName}</p>
                                    </div>
                                </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;