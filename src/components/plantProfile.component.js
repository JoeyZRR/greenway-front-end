import React, { Component } from "react";
import "../css/profile.css";
import "../css/user_plant.css"
import { Link } from "react-router-dom";
import authService from "../services/auth.service";
import profileService from "../services/profile.service";


export default class PlantProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
        commonName: this.props.location.state.commonName,
        botanicalName: this.props.location.state.botanicalName,
        imageUrl: this.props.location.state.imageUrl,
        plantType : this.props.location.state.plantType,
        soilType : this.props.location.state.soilType,
        lightLevel : this.props.location.state.lightLevel,
        waterNeeds : this.props.location.state.waterNeeds,
        maintenance : this.props.location.state.maintenance,
        plantId : this.props.location.state.plantId,
        currentUser: undefined
    };
  }

  componentDidMount() {
    const user = authService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user
      });
    }
  }

  addPlant = () => {
    if(window.confirm("Are you sure to add this plant to your collection?")){
      var selectedPlant = {plantId : this.state.plantId, imageUrl : this.state.imageUrl};
      var selectedList = [];
      selectedList.push(selectedPlant);
      var data = {"selectedList": selectedList};
      profileService.addPlant(data,this.state.currentUser.id)
                    .then(res =>{
                      alert("Plant has been added to your collection.")
                    }
                    )

      }

  }


  render() {
    return (
      <div className="container">
        <h2 className="user-plant-title">{this.state.commonName}</h2>
          <button className="back-button me-auto">
            <Link to={"/search"}>
              Back
            </Link>
          </button>
        <div className="plant-info">
            <div className="photo col-sm-6">
            <img src={this.state.imageUrl} alt="plant img" className="plant-img" />
            <div>
                {this.state.currentUser ? (
                    <button className="upload-edit" onClick={this.addPlant}>
                            Add to your Collection
                        </button>
                    ) : (<div></div>)}
            </div>

            </div>
            <div className="description col-sm-6">
                <div className="row">
                    <div className="col-sm-4">Botanical Name:</div>
                    <div className="col-sm-8">{this.state.botanicalName}</div>
                </div>
                <div className="row">
                    <div className="col-sm-4">Common Name:</div>
                    <div className="col-sm-8">{this.state.commonName}</div>
                </div>
                <div className="row">
                    <div className="col-sm-4">Plant type:</div>
                    <div className="col-sm-8">{this.state.plantType}</div>
                </div>
                <div className="row">
                    <div className="col-sm-4">Soil type: </div>
                    <div className="col-sm-8">{this.state.soilType}</div>
                </div>
                <div className="row">
                    <div className="col-sm-4">Light level:</div>
                    <div className="col-sm-8">{this.state.lightLevel}</div>
                </div>
                <div className="row">
                    <div className="col-sm-4">Water needs:</div>
                    <div className="col-sm-8">{this.state.waterNeeds}</div>
                </div>
                <div className="row">
                    <div className="col-sm-4">Maintenance:</div>
                    <div className="col-sm-8">{this.state.maintenance}</div>
                </div>
            </div>
        </div>

      </div>
    );
  }
}
