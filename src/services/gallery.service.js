import http from "../http-common";

class GalleryService {

  getAllPlants() {
    return http.get("/api/v1/plants/");
  }
}

export default new GalleryService();
