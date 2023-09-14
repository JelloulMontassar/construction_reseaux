import axios from 'axios';
import authHeader from '../Login/Header';

const EMPLOYEE_API_BASE_URL = 'http://localhost:8081/api/team/newTeam';

class TeamService{

    createTeam(data){
        return axios.post(EMPLOYEE_API_BASE_URL,data,{ headers: authHeader() });
    }
    getTeams(){
        const EMPLOYEE_API_BASE_URL = 'http://localhost:8081/api/team/MyTeams';
        return axios.get(EMPLOYEE_API_BASE_URL,{ headers: authHeader() });
    }
    getMyTeams(){
        const EMPLOYEE_API_BASE_URL = 'http://localhost:8081/api/project/MyAssignements';
        return axios.get(EMPLOYEE_API_BASE_URL,{ headers: authHeader() });
    }
    addEmployeeToTeam(team_id,employee_id){
        const EMPLOYEE_API_BASE_URL = 'http://localhost:8081/api/team/addEmployee/'+team_id+"/"+employee_id;
        return axios.post(EMPLOYEE_API_BASE_URL);
    }
    addTaskToEmployee(data){
        const EMPLOYEE_API_BASE_URL = 'http://localhost:8081/api/employee/newTask';
        return axios.post(EMPLOYEE_API_BASE_URL,data,{ headers: authHeader() });
    }
    MyAssignements(team_id){
        const EMPLOYEE_API_BASE_URL = 'http://localhost:8081/api/team/MyTasks/'+team_id;
        return axios.get(EMPLOYEE_API_BASE_URL,{ headers: authHeader() });
    }
    
}

export default new TeamService();