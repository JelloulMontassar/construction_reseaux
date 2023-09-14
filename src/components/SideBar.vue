<template>
  <div>
    <nav class="navbar-vertical navbar">
      <div class="nav-scroller">
        <!-- Brand logo -->
        <a class="navbar-brand" href="/home">
          <img src="../assets/images/svg/logo1.png"  alt="" />
        </a>
        <!-- Navbar nav -->
        <ul class="navbar-nav flex-column text-capitalize" id="sideNavbar">
          <li class="nav-item">
            <a class="nav-link has-arrow active" href="/home">
              <i data-feather="home" class="nav-icon icon-xs me-2 bi-house"></i>
              Dashboard
            </a>
          </li>
          <li class="nav-item">
            <div class="navbar-heading">Projects</div>
          </li>
          <li class="nav-item" v-if="role=='ROLE_ADMIN' || role=='ROLE_HR'">
            <a class="nav-link" href="/Projects">
              <i data-feather="briefcase" class="nav-icon icon-xs me-2"> </i>
              Projects
            </a>
          </li>
          <li class="nav-item" v-if="role=='ROLE_CHEF'">
            <a class="nav-link" href="/MyProjects">
              <i data-feather="archive" class="nav-icon icon-xs me-2"> </i>
              My Projects
            </a>
          </li>
          <li class="nav-item" v-if="role=='ROLE_CLIENT'">
            <a class="nav-link" href="/AllMyProjectsClients">
              <i data-feather="archive" class="nav-icon icon-xs me-2"> </i>
              My Projects
            </a>
          </li>
          <li class="nav-item" v-if="role=='ROLE_CHEF'">
            <a class="nav-link" href="/MyTeams">
              <i data-feather="users" class="nav-icon icon-xs me-2"> </i>
              My Teams
            </a>
          </li>
          <li class="nav-item" v-if="role=='ROLE_CHEF'">
            <a class="nav-link" href="/newTeam">
              <i data-feather="users" class="nav-icon icon-xs me-2"> </i>
              Create Team
            </a>
          </li>
          
          <li class="nav-item" v-if="role=='ROLE_ADMIN' || role=='ROLE_HR'">
            <a class="nav-link" href="/AllDepartements">
              <i data-feather="home" class="nav-icon icon-xs me-2"> </i>
              Departements
            </a>
          </li>
          <li class="nav-item" v-if="role=='ROLE_EMPL'">
            <a class="nav-link" href="/MyAssignements">
              <i data-feather="home" class="nav-icon icon-xs me-2"> </i>
              My Assignements
            </a>
          </li>
          <li class="nav-item">
            <div class="navbar-heading">Vacations</div>
          </li>
          <li class="nav-item" v-if="role=='ROLE_ADMIN' || role=='ROLE_HR'">
            <a class="nav-link" href="/VacationsDemandes">
              <i data-feather="award" class="nav-icon icon-xs me-2"> </i>
              Vacations Demandes
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/MyVacations" v-if="role=='ROLE_CHEF' || role=='ROLE_HR' || role=='ROLE_EMPL'">
              <i data-feather="cloud-off" class="nav-icon icon-xs me-2"> </i>
              Vacations
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/newVacation" v-if="role=='ROLE_CHEF' || role=='ROLE_HR' || role=='ROLE_EMPL'">
              <i data-feather="clipboard" class="nav-icon icon-xs me-2"> </i>
              Apply for vacation
            </a>
          </li>
          <!-- Nav item -->
          <li class="nav-item">
            <div class="navbar-heading">Employees</div>
          </li>

          <!-- Nav item -->


          <li class="nav-item" v-if="role=='ROLE_ADMIN' || role=='ROLE_HR'">
            <a class="nav-link" href="/TeamLeader">
              <i data-feather="at-sign" class="nav-icon icon-xs me-2"> </i>
              Team Leaders
            </a>
          </li>
          <li class="nav-item" v-if="role=='ROLE_ADMIN' || role=='ROLE_HR' || role=='ROLE_CHEF'">
            <a
              class="nav-link has-arrow"
              href="#!"
              data-bs-toggle="collapse"
              data-bs-target="#navMenuLevelSecond"
              aria-expanded="false"
              aria-controls="navMenuLevelSecond"
            >
              <i data-feather="users" class="nav-icon icon-xs me-2"> </i>
              Employees
            </a>
            <div id="navMenuLevelSecond" class="collapse" >
              <ul class="nav flex-column">
                <li class="nav-item">
                  <a class="nav-link" href="/Employees" 
                    ><i data-feather="user" class="nav-icon icon-xs me-2"> </i>
                    Employees</a
                  >
                </li>
                <li class="nav-item" v-if="role=='ROLE_ADMIN' || role=='ROLE_HR'">
                  <a class="nav-link" href="/AddEmployee"
                    ><i data-feather="plus" class="nav-icon icon-xs me-2"> </i>
                    Add Employees</a
                  >
                </li>
              </ul>
            </div>
          </li>
          
          <li class="nav-item" v-if="role=='ROLE_ADMIN' || role=='ROLE_HR'">
            <div class="navbar-heading">Clients</div>
          </li>
          <li class="nav-item" v-if="role=='ROLE_ADMIN' || role=='ROLE_HR'">
            <a
              class="nav-link has-arrow collapsed"
              href="#!"
              data-bs-toggle="collapse"
              data-bs-target="#navMenuLevelThree"
              aria-expanded="false"
              aria-controls="navMenuLevelThree"
            >
              <i data-feather="users" class="nav-icon icon-xs me-2"> </i>
              Clients
            </a>
            <div id="navMenuLevelThree" class="collapse">
              <ul class="nav flex-column">
                <li class="nav-item">
                  <a class="nav-link" href="/Clients"
                    ><i data-feather="user" class="nav-icon icon-xs me-2"> </i>
                    Clients
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="/AddClients"
                    ><i data-feather="plus" class="nav-icon icon-xs me-2"> </i>
                    Add Client
                  </a>
                </li>
              </ul>
            </div>
          </li>
          <li class="nav-item">
            <div class="navbar-heading">Profile</div>
          </li>
                    <li class="nav-item">
            <a class="nav-link" href="/MyProfile">
              <i data-feather="user" class="nav-icon icon-xs me-2"> </i>
              My profile
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/MyProfileSettings">
              <i data-feather="settings" class="nav-icon icon-xs me-2"> </i>
              Account settings
            </a>
          </li>
          <!-- Nav item -->

          <!-- Nav item -->

          <!-- Nav item -->

          <!-- Nav item -->

          <!-- Nav item -->

          <!-- Nav item -->

          <!-- Nav item -->
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: "SideBar",
  data(){
    return  {
      role : ""
    }
  },
  created(){
    this.role = localStorage.getItem('roles').replaceAll('"',"");
  }
};
</script>

