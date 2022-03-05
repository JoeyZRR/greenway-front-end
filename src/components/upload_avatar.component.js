import React, { useState, useCallback, useRef, useEffect } from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import uploadFileService from '../services/upload-file.service';
import { Modal } from "react-bootstrap";
import { Button } from "react-bootstrap";
import authService from '../services/auth.service';

function uploadImage(canvas, crop, userId) {
    if (!crop || !canvas) {
      return;
    }
    canvas.toBlob(
        (blob) => {
          const newImage = new File([blob], "test", { type: blob.type});
          
          let formData = new FormData();
          formData.append("file", newImage);
          uploadFileService.upload(formData,userId)
              .then(res => {
                  console.log(res.data);
                  if (res.data) {
                   const user = JSON.parse(localStorage.getItem('user'));
                   user.imageUrl=res.data;
                   localStorage.setItem("user", JSON.stringify(user));
                   window.location.reload();
                 }
              },
              error => {
                  console.log(error);
              }

              )
              },
              'image/jpeg',
              1
        );
    
  }

export default function UploadAvatar({show, hideModal}){

    const [upImg, setUpImg] = useState();
    const imgRef = useRef(null);
    const previewCanvasRef = useRef(null);
    const [crop, setCrop] = useState({ unit: '%', width: 90, height:90});
    const [completedCrop, setCompletedCrop] = useState(null);
    const currentUser = authService.getCurrentUser();

    const onSelectFile = (e) => {
        if (e.target.files && e.target.files.length > 0) {
          const reader = new FileReader();
          reader.addEventListener('load', () => setUpImg(reader.result));
          reader.readAsDataURL(e.target.files[0]);
        }
    };

    const onLoad = useCallback((img) => {
        imgRef.current = img;
      }, []);

    useEffect(() => {
    if (!completedCrop || !previewCanvasRef.current || !imgRef.current) {
        return;
    }

    const image = imgRef.current;
    const canvas = previewCanvasRef.current;
    const crop = completedCrop;

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    const ctx = canvas.getContext('2d');
    const pixelRatio = window.devicePixelRatio;

    canvas.width = crop.width * pixelRatio;
    canvas.height = crop.height * pixelRatio;

    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingQuality = 'high';

    ctx.drawImage(
        image,
        crop.x * scaleX,
        crop.y * scaleY,
        crop.width * scaleX,
        crop.height * scaleY,
        0,
        0,
        crop.width,
        crop.height
    );
    }, [completedCrop]);

      return (
          <>
          <Modal size="lg" aria-labelledby="contained-modal-title-vcenter" centered show={show} onHide={hideModal}
                  backdrop="static"
                  keyboard={false}>
            <Modal.Header>
            <Modal.Title>Upload Profile Image</Modal.Title>
            <Button variant="secondary btn-close" onClick={hideModal}>
            </Button>
            </Modal.Header>
            <Modal.Body>
              <div class="container">
                  <div className="row" style={{marginBottom : "30px"}}>
                    <input type="file" accept="image/*" onChange={onSelectFile} />
                  </div>
                  <div className="row">
                    <div className="col-sm-6">
                      <ReactCrop
                        src={upImg}
                        onImageLoaded={onLoad}
                        crop={crop}
                        onChange={(c) => setCrop(c)}
                        onComplete={(c) => setCompletedCrop(c)}
                      />
                    </div>
                    <div className="col-sm-6">
                      <div>
                        <canvas
                          ref={previewCanvasRef}
                          style={{
                            width: Math.round(completedCrop?.width ?? 0),
                            height: Math.round(completedCrop?.height ?? 0)
                          }}
                        />
                      </div>
                    </div>
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="primary" onClick={hideModal} style={{backgroundColor: 'white', color: 'black'}}>
                Cancel
              </Button>
              <Button variant="primary"
                      disabled={!completedCrop?.width || !completedCrop?.height}
                      onClick={() =>
                          [uploadImage(previewCanvasRef.current, completedCrop, currentUser.id),
                          hideModal()]
                      }
              >
                Upload
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      );
}
