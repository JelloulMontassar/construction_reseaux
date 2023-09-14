<template>
  <div id="db-wrapper">
    <!-- navbar vertical -->
    <!-- Sidebar -->
    <SideBar></SideBar>
    <!-- Page content -->
    <div id="page-content">
      <NavBar></NavBar>
      <!-- Container fluid -->
      <div class="bg-primary pt-10 pb-21"></div>
      <div class="container-fluid mt-n22 px-6">
        <div class="row">
          <div class="col-lg-12 col-md-12 col-12">
            <!-- Page header -->
            <div>
              <div class="d-flex justify-content-between align-items-center">
                <div class="mb-2 mb-lg-0">
                  <h3 class="mb-0 fw-bold text-white">Project Managers</h3>
                </div>
                <div></div>
              </div>
            </div>
          </div>
          <div class="container-fluid px-6 py-4">
            <!-- card -->
            <div class="card rounded-3">
              <!-- card body -->
              <div class="card-body">
                <!-- heading -->

                <!-- project number -->
                <table
                  id="example"
                  class="cell-border  text-center"
                  style="width: 100%"
                >
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Full Name</th>

                      <th>Departement Name</th>
                      <th>E-mail</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="tl in Teams_Leadears" v-bind:key="tl.id">
                      <td>{{ tl.id }}</td>
                       
                      <td >
                        {{ tl.employee.firstName }} {{ tl.employee.lastName }}
                      </td>
                      <td >{{ tl.employee.departements.departement_name }}</td>
                      <td >{{ tl.employee.emailId }}</td>
                      <td>
                        <div class="d-grid gap-2 d-inline-flex p-2">
                          <button
                            type="button" class="btn btn-outline-success"
                            @click="
                              getLatestProject(tl.employee.departements.id,tl.employee.id)
                            "
                            data-bs-toggle="modal"
                            data-bs-target="#AssignProject"
                          >
                            <i class="bi bi-plus-square"></i>
                            Assign to project
                              
                            
                          </button>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <!-- row  -->
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      class="modal fade"
      id="AssignProject"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">
              The latest porjects
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <ul class="list-group">
              <li class="list-group-item" v-for="p in latest_project" v-bind:key="p.id">
                <input
                  class="form-check-input" type="radio"  v-model="checked" :value=p.id>
                {{p.project.project_name}}
              </li>
            </ul>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="AssignProject()" id="liveToastBtn">Save changes</button>
          </div>
        </div>
      </div>
    </div>
    <div class="position-fixed bottom-0 end-0 p-3" style="z-index: 11">
  <div id="liveToast" class="toast hide" role="alert" aria-live="assertive" aria-atomic="true">
    <div class="toast-header">

      <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
    </div>
    <div class="toast-body">
      You have assigned the team leader successfully
    </div>
  </div>
</div>
  </div>
</template>


<script>
import NavBar from "../../components/NavBar.vue";
import SideBar from "../../components/SideBar.vue";
import EmployeeService from "../../service/Employee/EmployeeService";
import ProjectService from "../../service/Project/ProjectService";

import $ from "jquery";
export default {
  name: "TeamLeader",
  components: { NavBar, SideBar },
  data() {
    return {
      checked:"",
      team_leader_id:"",
      Teams_Leadears: [],
      departement_id: "",
      latest_project : []
    };
  },
  methods: {
    getTeamLeaders() {
      EmployeeService.getTeamLeader().then((response) => {
        if (response.status==200)
        this.Teams_Leadears = response.data;
        
      }).catch(error=>{
        this.$toast.error(error.response.data.message, {
            position: "top",
          });
          this.$router.push({ path: '/home'});
      });
    },
    getLatestProject(departement_id,team_lead_id) {
      this.team_leader_id=team_lead_id;
      this.departement_id = departement_id;
      ProjectService.getLatestProjects(departement_id).then((response) => {
        this.latest_project = response.data;
        console.log(response.data);
      });
    },
    AssignProject(){
      ProjectService.AssignTeamLeader(this.checked,this.team_leader_id);
      console.log(`CHECKED =>${this.checked}`);
  },
  },
  
  created() {
    this.getTeamLeaders();
    const newLocal = "#example";
    setTimeout(function() {    $(document).ready(function () {
      $(newLocal).DataTable({
        paging: true,
        info: true,
        pageLength: 5,
      });
    })},1000);
  },
  
};
</script>
<style >

</style>