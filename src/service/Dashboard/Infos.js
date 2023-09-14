import axios from 'axios';
import authHeader from '../Login/Header';

const EMPLOYEE_API_BASE_URL = 'http://localhost:8081/api/dashboard_infos';

class DashboardService{

    getInfos(){
        return axios.get(EMPLOYEE_API_BASE_URL,{ headers: authHeader() });
    }
    getLatestProject(){
        const EMPLOYEE_API_BASE_URL = 'http://localhost:8081/api/project/latest';
        return axios.get(EMPLOYEE_API_BASE_URL,{ headers: authHeader() });
    }
    
}

export default new DashboardService();