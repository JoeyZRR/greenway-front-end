import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AuthService from "./services/auth.service";

import Login from "./components/login.component";
import Register from "./components/register.component";
import Profile from "./components/profile.component";
import Profile_Edit from "./components/profile_edit.component";
import Search from "./components/search.component";
import UserPlant from "./components/user_plant.component";
import PlantProfile from "./components/plantProfile.component";

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      currentUser: undefined,
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user
      });
    }
  }

  logOut() {
    AuthService.logout();
  }

  render() {
    const { currentUser} = this.state;

    return (
      <div>
        <nav className="navbar navbar-expand shadow-sm p-3 mb-5 bg-body rounded">
          <Link to={"/search"} className="navbar-brand">
            Green Way
          </Link>

          {currentUser ? (
            <>
             <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/profile"} className="nav-link">
                  Profile
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/search"} className="nav-link">
                  Search
                </Link>
              </li>
            </div>
            <div className="navbar-nav ms-auto">
              <li className="nav-item">
                <a href="/login" className="nav-link ms-auto" onClick={this.logOut}>
                  Logout
                </a>
              </li>
            </div>
            </>
          ) : (
            <div className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  Login
                </Link>
              </li>

              <li className="nav-item">
                <Link to={"/register"} className="nav-link">
                  Sign Up
                </Link>
              </li>
            </div>
          )}
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/profile_edit" component={Profile_Edit} />
            <Route exact path={["/search","/"]} component={Search} />
            <Route exact path="/user_plant" render={
              (props) => <UserPlant {...props}/>
            }></Route>
            <Route exact path="/plantProfile" render={
              (props) => <PlantProfile {...props}/>
            }></Route>
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;