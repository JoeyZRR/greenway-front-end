import React, { Component } from "react";
import profileService from "../services/profile.service";
import authService from "../services/auth.service";
import { Link} from "react-router-dom";

export default class UserCollection extends Component {

  constructor(props) {
    super(props)
    this.state = {
      collectionList: [],
      currentUser : undefined
    }
  };

  componentDidMount() {

    const user = authService.getCurrentUser();
    if (user) {
      this.setState({
        currentUser: user
      });
    }

    profileService.loadUserCollection(user.id)
        .then(response => {
        console.log(response.data);
        this.setState({collectionList: response.data.usersCollection})
        })
  }

  render() {
    return (
      <>
      <div className="container">

        <div className="card-columns col-me-4">
        <React.Fragment>
            {this.state.collectionList.length > 0 && Object.keys(this.state.collectionList).map((key, index) => (

              <div className="card" key={key}>
                <Link to={{
                        pathname: "/user_plant",
                        state : {
                            commonName : this.state.collectionList[key].commonName,
                            botanicalName : this.state.collectionList[key].botanicalName,
                            imageUrl : this.state.collectionList[key].imageUrl,
                            plantType : this.state.collectionList[key].plantType,
                            soilType : this.state.collectionList[key].soilType,
                            lightLevel : this.state.collectionList[key].lightLevel,
                            waterNeeds : this.state.collectionList[key].waterNeeds,
                            maintenance : this.state.collectionList[key].maintenance,
                            growthStage : this.state.collectionList[key].growthStage,
                            description : this.state.collectionList[key].description,
                            collectionId : this.state.collectionList[key].collectionId

                        }
                    }}
                >
                    <img className="card-img-top" src={this.state.collectionList[key].imageUrl} alt={this.state.collectionList[key].commonName} />
                    <div className="card-body">
                        <h5 className="card-title">{this.state.collectionList[key].commonName}</h5>
                        <p className="card-text">{this.state.collectionList[key].botanicalName}</p>
                    </div>
                </Link>
              </div>
            ))}
        </React.Fragment>
        </div>

      </div>


    </>
    );
  }
};
