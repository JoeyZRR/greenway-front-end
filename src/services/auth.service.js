import http from "../http-common";

class AuthService {
  login(email, password) {
    return http
    .post("/api/v1/auth/signin", {
        email,
        password
      })
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(email, password) {
    return http.post("/api/v1/auth/signup", {
      email,
      password
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));
  }

  getCurrentPlant(){
    return JSON.parse(localStorage.getItem('plant_collection'))
  }
}

export default new AuthService();