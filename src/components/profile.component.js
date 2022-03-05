import React, { Component } from "react";
import AuthService from "../services/auth.service";
import "../css/profile.css";
import EditProfileDialog from "./editProfileModal.component";
import { Button } from "react-bootstrap";
import UploadAvatar from "./upload_avatar.component";
import avatarImage from "./avatarImageTag.component";
import AvatarImage from "./avatarImageTag.component";
import UserCollection from "./userCollection.component";
import AddPlant from "./addplant_modal.component";


export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: AuthService.getCurrentUser(),
      show : false,
      showUploadModal : false
    };

    this.handleShow = this.handleShow.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.hideUploadModal = this.hideUploadModal.bind(this);
    this.handleShowUploadModal = this.handleShowUploadModal.bind(this);
  }

  handleShow = () => {
    this.setState({show:true, showUploadModal:false});
  };

  hideModal = () => {
    this.setState({ show: false,
                  currentUser : AuthService.getCurrentUser()
    });
  };

  handleShowUploadModal = () => {
    this.setState({showUploadModal:true, show:false});
  };

  hideUploadModal = () => {
    this.setState({ showUploadModal : false
    })
  }

  render() {
    const { currentUser } = this.state

    return (
      <div className="container">

        <div className="user-profile">

          <AvatarImage imageUrl={currentUser.imageUrl}/>
          <div className="user-info">
            <div className="my-profile">
              <p className="titles">MY PROFILE</p>
              <hr/>
              <p className="content"><strong>Email: </strong>
              {currentUser.email}</p>

                <p className="content"><strong>Display Name: </strong>
                {currentUser.nickName}</p>
                <Button className="edit-profile-btn" variant="primary" onClick={this.handleShow}>
                Edit Profile
                </Button>
                <EditProfileDialog show={this.state.show} hideModal={this.hideModal}
                handleShowUploadModal={this.handleShowUploadModal} hideUploadModal={this.hideUploadModal}
                />
                <UploadAvatar show={this.state.showUploadModal} hideModal={this.hideUploadModal} />
            </div>
          </div>
          <div className="wishlist">
            <p className="titles">WISH LIST</p>
            <hr/>
            <ul className="wishlist_items">
              <p className="content">Cactus</p>
              <p className="content">Aloe Vera</p>
              <p className="content">Succulents</p>
            </ul>
            <button className="profile-edit">Edit</button>
          </div>
          <div className="exchange">
            <p className="titles">EXCHANGE LIST</p>
            <hr/>
            <ul>
              <p className="content">Rose</p>
              <p className="content">Lily</p>
              <p className="content">Poppy</p>
            </ul>
            <button className="profile-edit">Edit</button>
          </div>

        </div>

        <div className="plant-collection">
          <h3 className="plant-collection-title">MY COLLECTION</h3>
        <hr/>
          <AddPlant/>
          <UserCollection/>
        </div>

      </div>
    );
  }
}