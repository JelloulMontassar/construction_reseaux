import axios from 'axios';
const API_URL = 'http://localhost:8081/api/auth/';
import authHeader from '../Login/Header';
class AuthService {
    async login(user) {
        const response = await axios
        .post(API_URL, {
          username: user.usernamex,
          password: user.passwordx,
          StayLoggedIn: user.StayLoggedInx
        });
      if (response.data.accessToken) {
        localStorage.setItem('user', JSON.stringify(response.data));
        localStorage.setItem('firstTime', JSON.stringify(response.data.firstTime));
        localStorage.setItem('accessToken', JSON.stringify(response.data.accessToken));
        localStorage.setItem('roles', JSON.stringify(response.data.roles[0]["authority"]));

      }
      return response.data;
      }
    logout() {
        localStorage.removeItem('user');
        localStorage.removeItem("accessToken");
        localStorage.removeItem('Expiration');
        localStorage.removeItem("roles");
        localStorage.removeItem("firstTime");
    }
    whomai(){
        const API_URL = 'http://localhost:8081/api/whoami';
        return axios.get(API_URL,{ headers: authHeader() });
    }
    ChangePassword(value){
      const API_URL = 'http://localhost:8081/api/profile/change_password/'+value;
      return axios.put(API_URL,null,{ headers: authHeader() });
    }
}
export default new AuthService();