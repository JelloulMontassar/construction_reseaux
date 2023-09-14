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
                  <h3 class="mb-0 fw-bold text-white">My Teams</h3>
                </div>
                
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
                  class="table table-bordered text-center"
                  style="width: 100%"
                >
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Team name</th>

                      <th>Number Of Employees</th>
                      <th>Available</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="team in MyTeams" v-bind:key="team.id">
                      <td class="align-middle">{{ team.id }}</td>
                      <td class="align-middle">{{ team.team_name }}</td>
                      <td class="align-middle">
                        <div class="avatar-group">
                          <span class="avatar avatar-sm avatar-primary">
                            <span class="avatar-initials rounded-circle fs-6">{{
                              team.nbEmployee
                            }}</span>
                          </span>
                        </div>
                      </td>
                      <td class="align-middle">
                        <div class="avatar-group">
                          <span class="avatar avatar-sm avatar-primary">
                            <span class="avatar-initials rounded-circle fs-6">{{
                              team.available
                            }}</span>
                          </span>
                        </div>
                      </td>
                      <td class="align-middle">
                        <div class="d-grid gap-2 d-md-flex">
                          <button
                            type="button"
                            class="btn btn-outline-success"
                            @click="team_members(team.employees,team.id)"
                            data-bs-toggle="modal"
                            data-bs-target="#members"
                            data-whatever="@fat"
                          >
                            <i class="bi bi-eye"></i> View members
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
          <div
            class="modal fade"
            id="UpdateDepartement"
            tabindex="-1"
            role="dialog"
            aria-labelledby="exampleModalLabelOne"
            aria-hidden="true"
          >
            <div class="modal-dialog" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabelOne">
                    Update Departement
                  </h5>
                  <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true"></span>
                  </button>
                </div>
                <div class="modal-body">
                  <form>
                    <div class="mb-3">
                      <label for="recipient-name" class="col-form-label"
                        >Departement Name :</label
                      >
                      <input
                        type="text"
                        class="form-control"
                        v-model="Departement_update_id"
                        hidden
                      />
                      <input
                        type="text"
                        class="form-control"
                        v-model="Departement_update"
                      />
                    </div>
                  </form>
                </div>
                <div class="modal-footer">
                  <button
                    type="button"
                    class="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    class="btn btn-primary"
                    data-bs-toggle="modal"
                    data-bs-target="#ProjectDetails"
                    data-whatever="@fat"
                    data-bs-dismiss="modal"
                    @click="updateDepartement()"
                  >
                    Save Departement
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div
            class="modal fade"
            id="AddTask"
            tabindex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">Add Task</h5>
                  <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div class="modal-body">
                  <div class="input-group mb-3">
                    <input
                      v-model="TaskDesc"
                      type="text"
                      class="form-control"
                      placeholder="Task Description"
                      aria-label="Task Description"
                      aria-describedby="basic-addon2"
                    />
                    <div class="input-group-append">
                      <button
                        class="btn btn-outline-secondary"
                        @click="AddTask()"
                        type="button"
                      >
                        Add
                      </button>
                    </div>
                   
                  </div>
                   
                </div>
               
              </div>
            </div>
          </div>
          <div
            class="modal fade"
            id="members"
            tabindex="-1"
            role="dialog"
            aria-labelledby="exampleModalLabelOne"
            aria-hidden="true"
          >
            <div class="modal-dialog" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabelOne">
                    Team members
                  </h5>
                  <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true"></span>
                  </button>
                </div>
                <div class="modal-body">
                  <ul class="list-group">
                    <li
                      class="list-group-item"
                      v-for="Team_member in members"
                      v-bind:key="Team_member.id"
                    >
                      <i
                        class="me-2 text-success icon-xs bi bi-person-check"
                      ></i>
                      <span class="fw-bold text-dark">
                        {{ Team_member.firstName }}
                        {{ Team_member.lastName }}</span
                      >
                      <button
                        type="button"
                        class="btn btn"
                        @click="getEmployeeId(Team_member.id)"
                        data-bs-dismiss="modal"
                        data-bs-toggle="modal"
                        data-bs-target="#AddTask"
                        data-whatever="@fat"
                      >Add Task</button>
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import NavBar from "../../components/NavBar.vue";
import SideBar from "../../components/SideBar.vue";
import TeamService from "../../service/Team/Team";
export default {
  name: "MyTeams",
  components: { NavBar, SideBar },
  data() {
    return {
      MyTeams: [],
      members: [],
      TaskDesc: "",
      team_id:"",
      employee_id:""
    };
  },

  methods: {
    getTeams() {
      TeamService.getTeams().then((response) => {
        this.MyTeams = response.data;
        console.log(response.data);
      });
    },
    team_members(team,team_id) {
      this.members = team;
      this.team_id = team_id
    },
    AddTask() {
      const newTask = {
        taskDescription: this.TaskDesc,
        emp:{
            id:this.employee_id
        },
        teams: {id:this.team_id},
        
      }
      
      TeamService.addTaskToEmployee(newTask).then(response=>{
        this.TaskDesc=null
        console.log(response)
      })
    },
    getEmployeeId(employee_id){
      this.employee_id = employee_id
    }
  },

  created() {
    this.getTeams();
    setTimeout(function () {
      $(document).ready(function () {
        $("#example").DataTable({
          paging: true,
          info: true,
          pageLength: 5,
          dom: "Bfrtip",
          buttons: {
            dom: {
              button: {
                className: "btn btn-light btn-sm btn-rounded",
              },
            },
            buttons: [
              {
                //EXCEL
                extend: "csv",
                text: '<i class="bi bi-file-arrow-down"></i> CSV',
                title: "MyVacation",
              },
              {
                //PRINT
                extend: "print",
                text: '<i class="bi bi-printer"></i> Print',
                title: "MyVacation",
              },
              {
                //COPY
                extend: "copy",
                text: '<i class="bi bi-clipboard-check"></i> COPY',
                title: "MyVacation",
              },
            ],
          },
        });
      });
    }, 1000);
  },
};
</script>