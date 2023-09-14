import axios from 'axios';

const EMPLOYEE_API_BASE_URL = 'http://localhost:8081/api/departements';

class DepartementService{

    getDepartement(){
        return axios.get(EMPLOYEE_API_BASE_URL);
    }
    getDepartementByID(id){
        const get  = EMPLOYEE_API_BASE_URL+'/'+id; 
        return axios.get(get);
    }
    addDepartement(data){
        return axios.post(EMPLOYEE_API_BASE_URL,data);
    }
    deleteDepartement(id){
        const deleted  = EMPLOYEE_API_BASE_URL+'/'+id;        
        return axios.delete(deleted);
    }
    updateDepartement(id){
        const updated  = EMPLOYEE_API_BASE_URL+'/'+id;        
        return axios.get(updated);
    }
}

export default new DepartementService();