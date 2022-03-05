import React, { Component } from "react";
import "../css/profile.css";
import "../css/user_plant.css"
import { Link} from "react-router-dom";
import EditPlantDialog from "./editPlantInfo.component";
import authService from "../services/auth.service";
import profileService from "../services/profile.service";
import UploadPlantImage from "./uploadPlantImage.component";


export default class UserPlant extends Component {
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
        growthStage : this.props.location.state.growthStage,
        description : this.props.location.state.description,
        collectionId : this.props.location.state.collectionId,
		showEditModal : false,
        showUploadModal : false,
        currentUser: undefined
    };

     this.hideEditModal = this.hideEditModal.bind(this);
     this.handleShowEditModal = this.handleShowEditModal.bind(this);
	 this.updatePlantInfo = this.updatePlantInfo.bind(this);
     this.handleShowUploadModal = this.handleShowUploadModal.bind(this);
	 this.hideUploadModal = this.hideUploadModal.bind(this);
  }

  componentDidMount() {
    const user = authService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user
      });
    }
  }

  handleShowEditModal = () => {
    this.setState({showEditModal:true});
  };

  hideEditModal = () => {
    this.setState({ showEditModal: false
    });
  };

  handleShowUploadModal = () => {
    this.setState({showUploadModal:true});
  };

  hideUploadModal = () => {
    this.setState({ showUploadModal: false
    });
  };

  updatePlantInfo = (newGrowthStage, newDescription) => {
      this.setState({growthStage : newGrowthStage, description : newDescription});
  }

  updateImageUrl = (newImageUrl) => {
    this.setState({imageUrl : newImageUrl});
}

  deletePlantCollection = () => {
    if(window.confirm("Are you sure you want to delete this plant from your collection?")){

        profileService.deletePlantFromCollection(this.state.currentUser.id, this.state.collectionId)
                        .then(res => {
                            this.props.history.push("/profile");
                        }
                        )
      }

  }

  render() {
    return (
      <div className="container">
        <h2 className="user-plant-title">{this.state.commonName}</h2>
        <button className="back-button">
                <Link to={"/profile"}>
                    Back
                </Link>
            </button>
        <div className="plant-info">
            <div className="photo col-sm-6">
            <img src={this.state.imageUrl} alt="plant img" className="plant-img" />
            <div className="user-plnt-edit-btn">
                <button className="upload-edit" onClick={this.handleShowEditModal}>
                    Edit Info
                </button>
                <br/>
                <button className="upload-edit" onClick={this.handleShowUploadModal}>Upload an Image</button>
                <br/>
                <button className="upload-edit" onClick={this.deletePlantCollection}>
                    Delete from Collection
                </button>
                <br/>
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
                <div className="row">
                    <div className="col-sm-4">Growth Stage: </div>
                    <div className="col-sm-8">{this.state.growthStage}</div>
                </div>
                <div className="row">
                    <div className="col-sm-4">Description:</div>
                    <div className="col-sm-8">{this.state.description}</div>
                </div>
            </div>
        </div>

        <EditPlantDialog show={this.state.showEditModal} hideModal={this.hideEditModal}
                         plantGrowthStage={this.state.growthStage} plantDescription={this.state.description}
                         collectionId={this.state.collectionId} updatePlantInfo={this.updatePlantInfo}/>

        <UploadPlantImage show={this.state.showUploadModal} hideModal={this.hideUploadModal}
                          collectionId={this.state.collectionId} updateImageUrl={this.updateImageUrl}/>


      </div>
    );
  }
}
