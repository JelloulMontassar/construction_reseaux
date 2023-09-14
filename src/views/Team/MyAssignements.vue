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
        <div class="row justify-content-md-center">
          <div class="col-xl-10">
          <div class="col-lg-12 col-md-12 col-12">
            <!-- Page header -->
            <div>
              <div class="d-flex justify-content-between align-items-center">
                <div class="mb-2 mb-lg-0">
                  <h3 class="mb-0 fw-bold text-white">My Assignements</h3>
                </div>
                <div>
                  
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
                  class="table table-bordered text-center justify-content-md-center"
                  style="width: 100%"
                >
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Team name</th>

                     
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="team in MyTeams" v-bind:key="team.id">
                      <td class="align-middle">{{ team.id }}</td>
                      <td class="align-middle">{{ team.team_name }}</td>
                      
                      
                      <td class="d-flex justify-content-center">
                        <div class="d-grid gap-2 d-md-flex">
                          <button
                            type="button"
                            class="btn btn-outline-success"
                            @click="getMyTask(team.id)"
                            data-bs-toggle="modal"
                            data-bs-target="#members"
                            data-whatever="@fat"
                          >
                            <i class="bi bi-eye"></i> View my Assignements
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
                    My Tasks
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
                      v-for="task in tasks" v-bind:key="task.id"
                    >
                      <i
                        class="me-2 text-success icon-xs bi bi-person-check"
                      ></i>
                      <span class="fw-bold text-dark">
                        {{ task.taskDescription }}
                      </span
                      >
                      
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
  </div>
</template>

<script>
import $ from "jquery";
import NavBar from "../../components/NavBar.vue";
import SideBar from "../../components/SideBar.vue";
import TeamService from "../../service/Team/Team";
export default {
  name: "MyAssignements",
  components: { NavBar, SideBar },
  data() {
    return {
      MyTeams: [],
      tasks: [],
      
    };
  },

  methods: {
    getTeams() {
      TeamService.getMyTeams().then((response) => {
        this.MyTeams = response.data;
        console.log(response.data);
      });
    },
    getMyTask(team_id){
        TeamService.MyAssignements(team_id).then(response=>{
            this.tasks = response.data;
        })
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