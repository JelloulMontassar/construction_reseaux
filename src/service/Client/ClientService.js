import axios from 'axios';
import authHeader from '../Login/Header';

const EMPLOYEE_API_BASE_URL = 'http://localhost:8081/api/clients';

class ClientService{

    getClient(){
        return axios.get(EMPLOYEE_API_BASE_URL,{ headers: authHeader() });
    }
    addClient(data){
        return axios.post(EMPLOYEE_API_BASE_URL,data,{ headers: authHeader() });
    }
    deleteClient(client_id){
        const EMPLOYEE_API_BASE_URL = 'http://localhost:8081/api/clients/'+client_id;
        return axios.delete(EMPLOYEE_API_BASE_URL,{ headers: authHeader() });
    }
    updateClient(data){
        const EMPLOYEE_API_BASE_URL = 'http://localhost:8081/api/clients/';
        return axios.put(EMPLOYEE_API_BASE_URL,data,{ headers: authHeader() });
    }
}

export default new ClientService();