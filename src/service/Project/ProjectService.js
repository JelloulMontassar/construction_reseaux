import axios from 'axios';
import authHeader from '../Login/Header';

const EMPLOYEE_API_BASE_URL = 'http://localhost:8081/api/projects';

class ProjectService{

    getProjects(){
        return axios.get(EMPLOYEE_API_BASE_URL,{ headers: authHeader() });
    }
    addProject(data){
        return axios.post(EMPLOYEE_API_BASE_URL,data,{ headers: authHeader() });
    }
    getProjectDetailsByID(id){
        const API = "http://localhost:8081/api/projectsDetails/"+id;
        return axios.get(API,{ headers: authHeader() });
    }
    finishSettingUpP(data,project_id,client_id){
        const API =  "http://localhost:8081/api/projects/projectDetails/"+project_id+"/"+client_id;
        return axios.post(API,data,{ headers: authHeader() });
    }
    getLatestProjects(project_id){
        const API =  "http://localhost:8081/api/unfinishedDetailsprojects/"+project_id;
        return axios.get(API,{ headers: authHeader() });
    }
    AssignTeamLeader(project_id,team_leader_id){
        const API =  "http://localhost:8081/api/project/AssignTeamLeader/"+project_id+"/"+team_leader_id;
        return axios.post(API,{ headers: authHeader() });
    }
    getMyProjects(){
        const API =  "http://localhost:8081/api/project/My"
        return axios.get(API,{ headers: authHeader() });
    }
    getMyProjectsClient(){
        const API =  "http://localhost:8081/api/ClientProject/My"
        return axios.get(API,{ headers: authHeader() });
    }
    AssignTeam(project_details_id,team_id){
        const API =  "http://localhost:8081/api/project/AssignTeam/"+project_details_id+"/"+team_id;
        return axios.post(API,{ headers: authHeader() });

    }
    UpdateProgress(project_details_id,progress){
        const API =  "http://localhost:8081/api/projectsDetails/"+project_details_id+"/"+progress;
        return axios.post(API,{ headers: authHeader() });

    }
}

export default new ProjectService();