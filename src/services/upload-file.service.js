import http from "../http-common";
import authHeader from "./auth-header";

class UploadFilesService {

  upload(formData, userId) {

    return http.put("/api/v1/images/profile/" + userId, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        "Authorization" : authHeader()
      }
    });
  }

  uploadPlantImage(formData, userId, collectionId){

    return http.put("/api/v1/images/profile/" + userId + "/collection/" + collectionId, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        "Authorization" : authHeader()
      }
    });

  }
}

export default new UploadFilesService();
