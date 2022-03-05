import { useState } from "react";
import { Modal } from "react-bootstrap"
import { Button } from "react-bootstrap"
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import { isEmail, isMobilePhone} from "validator";
import authService from "../services/auth.service";
import profileService from "../services/profile.service";

const EditProfileDialog = ({show, hideModal,handleShowUploadModal, hideUploadModal}) => {

  const currentUser = authService.getCurrentUser();
  const [email, setEmail] = useState(currentUser.email);
  const [nickName, setNickName] = useState(currentUser.nickName);
  const [phoneNumber, setPhoneNumber] = useState(currentUser.phoneNumber);

  const validateEmail = value => {
    if (!isEmail(value)) {
      return (
        <div className="alert alert-danger" role="alert">
          This is not a valid email.
        </div>
      );
    }
  };

  const validatePhoneNumber = value => {
    if (value != null && !isMobilePhone(value)) {
      return (
        <div className="alert alert-danger" role="alert">
          This is not a valid phone number.
        </div>
      );
    }
  };

  const onSubmit = (e) => {
    e.preventDefault()
    var data = {
      email : email,
      nickName : nickName,
      phoneNum : phoneNumber
    }
    profileService.updateProfile(data,currentUser.id)
                  .then(
                    () => hideModal()
                  )
  }

    return (
        <>
        <Modal size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered show={show} onHide={hideModal}
      backdrop="static"
        keyboard={false}>
        <Modal.Header>
          <Modal.Title className="edit-profile-title">Edit Profile</Modal.Title>
          <Button variant="secondary btn-close" onClick={hideModal}>
        </Button>
        </Modal.Header>
        <Modal.Body>

          <div className="container">
           <div className="row">
               <div className="edit-user-info col-sm-6">
                   <Form onSubmit="">
                       <div className="form-group">
                         <label htmlFor="email">&nbsp;&nbsp;Email</label>
                         <Input
                             type="text"
                             className="form-control"
                             value={email}
                             name="email"
                             onChange={e => setEmail(e.target.value)}
                             validations={[validateEmail]}
                             maxLength="50"
                         />
                       </div>
                       <div className="form-group">
                         <label htmlFor="nickName">&nbsp;&nbsp;Display Name</label>
                         <Input
                             type="text"
                             className="form-control"
                             value={nickName}
                             name="nickName"
                             onChange={e => setNickName(e.target.value)}
                             maxLength="50"
                         />
                       </div>
                       <div className="form-group">
                         <label htmlFor="phoneNumber">&nbsp;&nbsp;Phone number</label>
                         <Input
                             type="tel"
                             className="form-control"
                             value={phoneNumber}
                             name="phoneNumber"
                             onChange={e => setPhoneNumber(e.target.value)}
                             validations={[validatePhoneNumber]}
                             placeholder="(123) 55-5555"
                             maxLength="10"
                         />
                       </div>
                   </Form>
               </div>

               <div className="user-photo-edit col-sm-6">
                   <p className="profile-photo" style={{textAlign : 'left'}}>Profile Photo</p>
                   <div id="avatarCircle" style={{ backgroundImage:`url(${(currentUser.imageUrl) || "https://greenway-avatars.s3.amazonaws.com/1627589051383-defaultAvatar.jpeg"})` }}></div>
                   <button className="upload-btn btn btn-primary btn-block uploadBtn" onClick={handleShowUploadModal}>Upload Image</button>
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

export default EditProfileDialog
