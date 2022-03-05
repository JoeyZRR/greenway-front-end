import http from "../http-common";
import authHeader from "./auth-header";

class UserCollectionService {
  
    updatePlantProfile(data, userId, collectionId){
        return http.put("/api/v1/profiles/" + userId + "/collection/" +  collectionId, data, { headers: authHeader() });
    }

}

export default new UserCollectionService();