import React, { useState, useRef } from 'react';
import uploadFileService from '../services/upload-file.service';
import { Modal } from "react-bootstrap";
import { Button } from "react-bootstrap";
import authService from '../services/auth.service';

export default function UploadPlantImage({show, hideModal, collectionId,updateImageUrl}){

    const [upImg, setUpImg] = useState();
    const imgRef = useRef(null);
    const currentUser = authService.getCurrentUser();

    const onSelectFile = (e) => {
        if (e.target.files && e.target.files.length > 0) {
          setUpImg(e.target.files[0])
        }
    };

    const onFileUpload = () =>{
      
      let formData = new FormData();
      formData.append("file", upImg);

      uploadFileService.uploadPlantImage(formData,currentUser.id,collectionId)
              .then(res => {
                  console.log(res.data);
                  if (res.data) {
                    hideModal();
                    updateImageUrl(res.data);
                 }
              },
              error => {
                  console.log(error);
              }

              );
    };

    return (
        <>
        <Modal size="lg" aria-labelledby="contained-modal-title-vcenter" centered show={show} onHide={hideModal}
                backdrop="static"
                keyboard={false}>
          <Modal.Header>
            <Modal.Title>Upload Plant Image</Modal.Title>
            <Button variant="secondary btn-close" onClick={hideModal}>
            </Button>
          </Modal.Header>
          <Modal.Body>
            <div class="container">
                <div className="row" style={{marginBottom : "30px"}}>
                  <input type="file" accept="image/*" onChange={onSelectFile} />
                </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={hideModal} style={{backgroundColor: 'white', color: 'black'}}>
              Cancel
            </Button>
            <Button variant="primary"
                    onClick={onFileUpload}
            >
              Upload
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
}