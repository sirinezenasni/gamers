import React from 'react';
import NavBar from './NavBar';
import SideBar from './SideBar';

const Settings = () => {
    return (
        <div>
            <NavBar />
            <div className="row">
                <SideBar />
                <div className="col-9">
                    <h1>Settings</h1>
                </div>
            </div>
        </div>
    );
}

export default Settings;