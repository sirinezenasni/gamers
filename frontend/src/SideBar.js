import React from 'react';
import PostListing from './PostListing';
import Post from './Post';
import Profile from './Profile';
import Settings from './Settings';

const SideBar = () => {
    return (
        <div className="col-3">
            <div className="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                <a className="nav-link" id="v-pills-home-tab" data-toggle="tab" href="/dashboard" role="tab" aria-controls="v-pills-home" aria-selected="true">Home</a>
                <a className="nav-link" id="v-pills-profile-tab" data-toggle="tab" href="/profile" role="tab" aria-controls="v-pills-profile" aria-selected="false">Profile</a>
                <a className="nav-link" id="v-pills-settings-tab" data-toggle="tab" href="/settings" role="tab" aria-controls="v-pills-settings" aria-selected="false">Settings</a>
            </div>
        </div>
    );
}

export default SideBar;