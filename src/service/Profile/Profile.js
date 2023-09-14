import axios from 'axios';
import authHeader from '../Login/Header';


class ProfileService{

    ChangeProfilePicture(data){
        const EMPLOYEE_API_BASE_URL = "http://localhost:8081/api/profile/change_profile_picture";
        return axios.post(EMPLOYEE_API_BASE_URL,data,{ headers: authHeader() });
    }
    DeleteProfilePicture(){
        const EMPLOYEE_API_BASE_URL = "http://localhost:8081/api/profile/delete_profile_picture/any";
        return axios.put(EMPLOYEE_API_BASE_URL,null,{ headers: authHeader() })
    }
    UpdateEmail(email){
        const EMPLOYEE_API_BASE_URL = "http://localhost:8081/api/profile/update_email/"+email;
        
        return axios.put(EMPLOYEE_API_BASE_URL,null,{ headers: authHeader() })
    }
    UpdateBasicDetailsEmpl(data){
        const EMPLOYEE_API_BASE_URL = "http://localhost:8081/api/profile/updateBasicDetailsEmpl"
        return axios.put(EMPLOYEE_API_BASE_URL,data,{ headers: authHeader() })
    }
    UpdateBasicDetailsClient(data){
        const EMPLOYEE_API_BASE_URL = "http://localhost:8081/api/profile/updateBasicDetailsClient"
        return axios.put(EMPLOYEE_API_BASE_URL,data,{ headers: authHeader() })
    }
    GetProfileById(profile_id){
        const EMPLOYEE_API_BASE_URL = "http://localhost:8081/api/profile/ViewProfile/"+profile_id;
        return axios.get(EMPLOYEE_API_BASE_URL,{ headers: authHeader() })
    }
    
    
}

export default new ProfileService();