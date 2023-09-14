import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AddEmployee from '../views/Employees/AddEmployee'
import AllEmployees from '../views/Employees/AllEmployees'
import AllClients from '../views/Clients/AllClients'
import AddClients from '../views/Clients/AddClients'
import AllDepartements from '../views/Departements/AllDepartements'
import Authentication from '../views/Authentication/SecureLogin'
import MyProfile from '../views/Profile/Profile'
import AllProjects from '../views/Projects/AllProjects'
import TeamLeader from '../views/Employees/TeamLeader'
import ForgotPassword from '../views/Authentication/ForgotPassword'
import newVacation from "../views/Employees/Vacations"
import MyVacations from "../views/Employees/MyVacations"
import VacationsDemandes from "../views/HumainRessource/VacationsDemandes"
import newTeam from "../views/Team/newTeam"
import myTeams from "../views/Team/myTeams"
import CForgotPassword from "../views/Authentication/CForgotPassword"
import myProjects from "../views/Projects/myProjects"
import ProfileSettings from "../views/Profile/ProfileSettings"
import ViewProfile from "../views/Profile/ViewProfile"
import MyAssignements from "../views/Team/MyAssignements"
import AllMyProjectsClients from "../views/Projects/AllMyProjectsClients"
import {Buffer} from 'buffer';
Buffer.from('anything','base64');
const routes = [
  {
    path: '/home',
    name: 'home',
    component: HomeView
  },
  {
    path: '/AddEmployee',
    name: 'AddEmployee',
    component: AddEmployee
  },
  {
    path: '/Employees',
    name: 'AllEmployees',
    component: AllEmployees
  },
  {
    path: '/Clients',
    name: 'AllClients',
    component: AllClients
  },
  {
    path: '/AddClients',
    name: 'AddClients',
    component: AddClients
  },
  {
    path: '/AllDepartements',
    name: 'AllDepartements',
    component: AllDepartements
  },
  {
    path: '/Authentication',
    name: 'Authentication',
    component: Authentication
  }
  ,
  {
    path: '/MyProfile',
    name: 'MyProfile',
    component: MyProfile
  }
  ,
  {
    path: '/MyProfileSettings',
    name: 'MyProfileSettings',
    component: ProfileSettings
  }
  ,
  {
    path: '/Projects',
    name: 'AllProjects',
    component: AllProjects
  }
  ,
  {
    path: '/TeamLeader',
    name: 'TeamLeader',
    component: TeamLeader
  }
  ,
  {
    path: '/ForgotPassword',
    name: 'ForgotPassword',
    component: ForgotPassword
  }
  ,
  {
    path: '/CForgotPassword',
    name: 'CForgotPassword',
    component: CForgotPassword
  }
  ,
  {
    path: '/newVacation',
    name: 'newVacation',
    component: newVacation
  }
  ,
  {
    path: '/MyVacations',
    name: 'MyVacations',
    component: MyVacations
  }
  ,
  {
    path: '/VacationsDemandes',
    name: 'VacationsDemandes',
    component: VacationsDemandes
  }
  ,
  {
    path: '/newTeam',
    name: 'newTeam',
    component: newTeam
  }
  ,
  {
    path: '/myTeams',
    name: 'myTeams',
    component: myTeams
  }
  ,
  {
    path: '/myProjects',
    name: 'myProjects',
    component: myProjects
  }
  ,
  {
    path: '/ViewProfile/:id',
    name : "ViewProfile",
    component: ViewProfile,
  }
  ,
  {
    path: '/MyAssignements',
    name : "MyAssignements",
    component: MyAssignements,
  }
  ,
  {
    path: '/AllMyProjectsClients',
    name : "AllMyProjectsClients",
    component: AllMyProjectsClients,
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
function parseJwt (token) {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(Buffer.from(base64, "base64").toString("ascii").split("").map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
}
router.beforeEach((to, from, next) => {
  const publicPages = ['/Authentication','/ForgotPassword','/CForgotPassword'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('user');
  let jwtPayload = 0;
  console.log(localStorage.getItem("roles"));
  if (localStorage.getItem("accessToken")!=null){
    jwtPayload = parseJwt(localStorage.getItem("accessToken"));
    localStorage.setItem("Expiration",jwtPayload.exp-jwtPayload.iat);
  }
  // trying to access a restricted page + not logged in
  // redirect to login page
  if (authRequired && !loggedIn) 
  {
    next('/Authentication');
  } else if (loggedIn&&!authRequired) 
    {

        next({ name: 'home' })
    } 
  else if (jwtPayload.exp <= Date.now()/1000) {
    // token expired
    localStorage.clear()
    next({ name: 'Authentication' });
  }
  else{
    console.log(jwtPayload.exp*1000)
    console.log(Date.now())
    console.log(Date.now()>jwtPayload.exp*1000)
    console.log(((jwtPayload.exp*1000 )-Date.now()))
    localStorage.setItem("LogoutAt",((jwtPayload.exp*1000 )-Date.now()) );

    next()
  }
  
});

export default router
