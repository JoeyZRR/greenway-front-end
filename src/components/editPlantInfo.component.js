import { useState } from "react";
import { Modal } from "react-bootstrap"
import { Button } from "react-bootstrap"
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import authService from "../services/auth.service";
import UploadAvatar from "./upload_avatar.component";
import userCollectionService from "../services/user-collection.service";

const EditPlantDialog = ({show, hideModal, plantGrowthStage, plantDescription, collectionId, updatePlantInfo}) => {

  const currentUser = authService.getCurrentUser();
  const [growthStage, setGrowthStage] = useState(plantGrowthStage);
  const [description, setDescription] = useState(plantDescription);
  const userCollectionId = collectionId;

  const onSubmit = (e) => {
    e.preventDefault()
    var data = {
      growthStage : growthStage,
      description : description,
      collectionId : userCollectionId
    }
    
    userCollectionService.updatePlantProfile(data, currentUser.id, userCollectionId)
                          .then(res => {
                            hideModal();
                            updatePlantInfo(growthStage, description);
                          })

  }

    return (
        <>
        <Modal size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered show={show} onHide={hideModal}
      backdrop="static"
        keyboard={false}>
        <Modal.Header>
          <Modal.Title>Edit Info</Modal.Title>
          <Button variant="secondary btn-close" onClick={hideModal}>
        </Button>
        </Modal.Header>
        <Modal.Body>
            
        <div className="container">
            <div className="row">
                <div className="col-sm-12">
                    <Form onSubmit="">
                        <div className="form-group">
                          <label htmlFor="growthStage">Growth Stage</label>
                          <Input
                              type="text"
                              className="form-control"
                              value={growthStage}
                              name="growthStage"
                              onChange={e => setGrowthStage(e.target.value)}
                              maxLength="50"
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="description">Description</label>
                          <textarea
                              className="form-control"
                              value={description}
                              name="description"
                              onChange={e => setDescription(e.target.value)}
                              maxLength="250"
                          />
                        </div>
                    </Form>
                </div>
            </div> 
        </div>
        
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={hideModal} style={{backgroundColor: 'white', color: 'black'}}>
            Close
          </Button>
          <Button variant="primary" onClick={onSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
        </>

    )
}

export default EditPlantDialog