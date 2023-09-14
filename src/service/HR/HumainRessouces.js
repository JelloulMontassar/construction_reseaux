import axios from 'axios';
import authHeader from '../Login/Header';

const EMPLOYEE_API_BASE_URL = 'http://localhost:8081/api/employee/AllVacations';

class HumainRessources{

    getVacationsDemandes(){
        return axios.get(EMPLOYEE_API_BASE_URL,{ headers: authHeader() });
    }
    AcceptVacationById(vacation_id){
        const EMPLOYEE_API_BASE_URL="http://localhost:8081/api/employee/vacations/accept/"+vacation_id;
        return axios.put(EMPLOYEE_API_BASE_URL,null,{ headers: authHeader() })
    }
    RejectVacationById(vacation_id){
        const EMPLOYEE_API_BASE_URL="http://localhost:8081/api/employee/vacations/reject/"+vacation_id;
        return axios.put(EMPLOYEE_API_BASE_URL,null,{ headers: authHeader() })
    }
   VacationHistory(employee_id){
        const EMPLOYEE_API_BASE_URL="http://localhost:8081/api/employee/vacations/history/"+employee_id;
        return axios.get(EMPLOYEE_API_BASE_URL,{ headers: authHeader() })
    }
    
}

export default new HumainRessources();