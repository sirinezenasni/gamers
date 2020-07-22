import React from 'react';
import NavBar from './NavBar';
import SideBar from './SideBar';
import Post from './Post';
import PostListing from './PostListing';

function LandingPage() {
  return (
    <div>
      <NavBar />
      <div className="row">
        <SideBar />
        <div className="col-9">
          <h1>Dashboard</h1>
          <Post />
          <PostListing />
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
