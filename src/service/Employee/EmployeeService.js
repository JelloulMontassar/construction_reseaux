import axios from 'axios';
import authHeader from '../Login/Header';

const EMPLOYEE_API_BASE_URL = 'http://localhost:8081/api/employees';

class EmployeeService{

     getEmployees(){
        return  axios.get(EMPLOYEE_API_BASE_URL);
    }
    addEmployees(data){
        return axios.post(EMPLOYEE_API_BASE_URL,data);
    }
    getTeamLeader(){
        const TEAM_API_BASE_URL = 'http://localhost:8081/api/employees/teamleaders';
        return axios.get(TEAM_API_BASE_URL,{ headers: authHeader() });
    }
    applyForVacation(data){
        const EMPLOYEE_API_BASE_URL = 'http://localhost:8081/api/employee/vacations';
        return axios.post(EMPLOYEE_API_BASE_URL,data,{ headers: authHeader() });
    }
    getMyVacations(){
        const EMPLOYEE_API_BASE_URL = 'http://localhost:8081/api/employee/vacations';
        return axios.get(EMPLOYEE_API_BASE_URL,{ headers: authHeader() });
    }
    
    deleteEmployee(employee_id){
        const EMPLOYEE_API_BASE_URL = 'http://localhost:8081/api/employees/disable/'+employee_id;
        return axios.put(EMPLOYEE_API_BASE_URL,null,{ headers: authHeader() });
    }
    enableEmployee(employee_id){
        const EMPLOYEE_API_BASE_URL = 'http://localhost:8081/api/employees/enable/'+employee_id;
        return axios.put(EMPLOYEE_API_BASE_URL,null,{ headers: authHeader() });
    }
    updateEmployee(data){
        const EMPLOYEE_API_BASE_URL = 'http://localhost:8081/api/employees/';
        return axios.put(EMPLOYEE_API_BASE_URL,data,{ headers: authHeader() });
    }
}

export default new EmployeeService();