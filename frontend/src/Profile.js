import React from 'react';
import NavBar from './NavBar';
import SideBar from './SideBar';

const Profile = () => {
    return (
        <div>
            <NavBar />
            <div className="row">
                <SideBar />
                <div className="col-9">
                    <h1>Profile</h1>
                </div>
            </div>
        </div>
    );
}

export default Profile;