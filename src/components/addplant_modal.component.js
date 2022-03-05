import React, {Component, useState } from "react";
import { Modal } from "react-bootstrap";
import ModalDialog from 'react-bootstrap/ModalDialog';
import { Button } from "react-bootstrap";
import AuthService from "../services/auth.service";
import profileService from "../services/profile.service";
import GalleryService from "../services/gallery.service";


class AddPlant extends React.Component {
    constructor(props) {
    super(props)
    this.state = {
      currentUser: AuthService.getCurrentUser(),
      lists: [],
      lgShow:false,
      selectedList:[]
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.submit = this.submit.bind(this);
  };

  setLgShow = () => {
    this.setState({lgShow:true});
  };

  hidelgshow = () =>{
      this.setState({lgShow:false})
  }

  componentDidMount() {
    GalleryService.getAllPlants()
    .then(response => {

      this.setState({lists: response.data})
    })
  }

  handleInputChange(event) {
    const target = event.target;
    if (target.checked){

    var plantId = target.id;
    var imageUrl = target.value;
    this.state.selectedList[0,this.state.selectedList.length]={plantId,imageUrl};

    }
	 else {
      let plantArray = this.state.selectedList;
      plantArray = plantArray.filter(id => id.plantId != target.id);
      this.setState({selectedList: plantArray})

    }
}

closeClear =() =>{
  this.setState({selectedList: []})
  this.hidelgshow()
}

submit = (e) =>{
  e.preventDefault()
    console.log(this.state.selectedList)
    var data = {"selectedList": this.state.selectedList}
    profileService.addPlant(data,this.state.currentUser.id)
                  .then(res => {
                      this.hidelgshow();
                      window.location.reload();
                  }
                  )


  }



  render(){
	console.log(this.state.selectedList);
    return (
      <>
        <button className="plant-btn" onClick={this.setLgShow}>Add Plant</button>
        <Modal
          size="xl"
          show={this.state.lgShow}
          onHide={this.hidelgshow}
          aria-labelledby="example-modal-sizes-title-lg"

          scrollable={true}
        >
          <Modal.Header>
            <Modal.Title className="add-plant-title" id="example-modal-sizes-title-lg">
              SELECT YOU PLANT
            </Modal.Title>
             <Button variant="secondary btn-close" onClick={this.closeClear}></Button>
          </Modal.Header>
          <Modal.Body>
          <div class="card-columns">
        <React.Fragment>
            {this.state.lists.map(({ commonName, botanicalName, imageUrl, plantId }, index) => (
              <div class="card-block" key={index}>
                            <img width="150px" height="150px "src={imageUrl} alt={commonName} />
                            <input type="checkbox" id={plantId} className="plant-select" value={imageUrl} onChange={this.handleInputChange}/>
                            <h5 class="card-title">{commonName}</h5>
                            <p class="card-text">{botanicalName}</p>

              </div>
            ))}
        </React.Fragment>
        <button type="submit" class="btn btn-primary" onClick={this.submit}>Submit</button>
        </div>
          </Modal.Body>

        </Modal>
      </>
    );
  }
}
  export default AddPlant
