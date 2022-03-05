import authHeader from './auth-header';
import http from "../http-common";

class UserService {

  // send the request like below once logged in
  getAllUsers() {
    return http.get("/api/v1/test/users", { headers: authHeader() });
  }
}

export default new UserService();