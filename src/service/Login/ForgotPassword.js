import axios from 'axios';

class resetPassword{
    resetPassword(emailID) {
        const API = "http://localhost:8081/api/auth/resetPasswordRequest/"+emailID
        return axios.post(API); 
    }
    CresetPassword(emailID,activation_code) {
        const API = "http://localhost:8081/api/auth/resetPassword/"+emailID+"/"+activation_code
        return axios.post(API); 
    }
}
export default new resetPassword();