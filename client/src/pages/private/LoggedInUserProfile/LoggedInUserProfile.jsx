import React, { Component } from "react";
import { Link } from "react-router-dom";
import Moment from "react-moment";

export default class LoggedInUserProfile extends Component {
  render() {
    return (
      <section className="profile-section">
        {/* <h1 className="section-title">My profile</h1> */}

        <h1 className="section-title">Account information</h1>

        <section className="game-subsection">
          <h4 className="inner-title">Status account</h4>
          <ul>
            <li>{this.props.loggedInUser.status}</li>
          </ul>
        </section>

        <section className="game-subsection">
          <h4 className="inner-title">Member since</h4>
          <ul>
            <li>
              <Moment format="MMM Do YYYY">
                {new Date(this.props.loggedInUser.createdAt)}
              </Moment>
            </li>
          </ul>
        </section>

        <section className="game-subsection">
          <h4 className="inner-title">Username</h4>
          <ul>
            <li>{this.props.loggedInUser.username}</li>
          </ul>
        </section>

        <section className="game-subsection">
          <h4 className="inner-title">Email</h4>
          <ul>
            <li>{this.props.loggedInUser.email}</li>
          </ul>
        </section>

        <div className="form-actions">
          <Link to={"/logout"} className="button full">
            Logout
          </Link>
        </div>


        <section className="followers">
          <h2 className="section-title">
            Followers ({this.props.loggedInUser.followers.length})
          </h2>
          {this.renderFollowers()}
        </section>
        <section className="following">
          <h2 className="section-title">
            Following ({this.props.loggedInUser.following.length})
          </h2>
          {this.renderFollowing()}
        </section>

        {/* <div className="form-actions">
          <Link to={"/logout"} className="button full">
            Logout
          </Link>
        </div> */}
      </section>
    );
  }

  renderFollowers() {
    return this.props.loggedInUser.followers.length > 0 ? (
      <ul className="users-list">
        {this.props.loggedInUser.followers.map(follower => {
          return (
            <li key={follower._id}>
              <Link to={`/profile/${follower.username}`}>
                {follower.username}
              </Link>
            </li>
          );
        })}
      </ul>
    ) : (
      <p>You have no followers yet</p>
    );
  }

  renderFollowing() {
    return this.props.loggedInUser.following.length > 0 ? (
      <ul className="users-list">
        {this.props.loggedInUser.following.map(userFollowed => {
          return (
            <li key={userFollowed._id}>
              <Link to={`/profile/${userFollowed.username}`}>
                {userFollowed.username}
              </Link>
            </li>
          );
        })}
      </ul>
    ) : (
      <p>You don't follow anybody yet.</p>
    );
  }
}
