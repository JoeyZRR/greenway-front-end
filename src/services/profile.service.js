
import http from "../http-common";
import authHeader from './auth-header';

class ProfileService {

  updateProfile(data, id){
      return http.put("/api/v1/profiles/" + id, data, { headers: authHeader() })
                .then(response => {
                    if (response.data.email) {
                         const user = JSON.parse(localStorage.getItem('user'));
                        Object.keys(response.data).forEach((key) => {
                            user[key] = response.data[key];
                        });
                        user.nickName = response.data.nickName;
                        user.email = response.data.email;
                        user.phoneNumber = response.data.phoneNumber;
                        localStorage.setItem("user", JSON.stringify(user));
                      }
                });
  }

  loadUserCollection(id){
    return http.get("/api/v1/profiles/" + id + "/collection", { headers: authHeader() })       
  }

  addPlant(selectedList, id){
    return http.post("/api/v1/profiles/" + id + "/collection", selectedList, { headers: authHeader() })
  }

  deletePlantFromCollection(userId, collectionId){
    return http.delete("/api/v1/profiles/" + userId + "/collection/" + collectionId, { headers: authHeader() })
  }

}

export default new ProfileService();
