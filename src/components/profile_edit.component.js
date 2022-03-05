import React, { Component } from "react";
import AuthService from "../services/auth.service";
import "../css/profile_edit.css"
import { Link } from "react-router-dom";

export default class Profile_Edit extends Component {
    constructor(props) {
        super(props);

        this.state = {
          currentUser: AuthService.getCurrentUser()
        };
      }

    render() {
        const { currentUser } = this.state;
      return (
        <div className="edit-block">
            <div className="edit">
                <div id="circle">
                  <svg xmlns="http://www.w3.org/2000/svg" width="130" height="130" fill="currentColor" class="bi bi-person" viewBox="0 0 16 16">
                    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/>
                  </svg>
                </div>
                <p id="green-way">Green Way</p>
                <div className="input-field">
                  <input type="text" foo="input" placeholder="Nickname" id="" />
                  <input type="text" foo="input" placeholder="Email Address" id="" />
                  <input type="text" foo="input" placeholder="Zipcode" id="" />
                </div>
                <div className="public-info">
                  <div class="form-check form-switch">
                    <input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault"/>
                    <label class="form-check-label" for="flexSwitchCheckDefault">Public Info?</label>
                  </div>
                </div>
                <div className="save-cancel">
                  <button className="edit-btn">Save</button>
                  <button className="edit-btn">
                    <Link to={"/profile"}>
                      Cancel
                    </Link>
                </button>
                </div>
            </div>
        </div>
      );
    }
  }
