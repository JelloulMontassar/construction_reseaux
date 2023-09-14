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
                  <h3 class="mb-0 fw-bold text-white">Projects</h3>
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
                      <th scope="col">Project name</th>

                      <th>Client ID</th>
                      <th>Departement ID</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="project in Projects" v-bind:key="project.id">
                      <td>{{ project.id }}</td>
                      <td>{{ project.project_name }}</td>
                      <td>
                        {{ project.clients.firstName }}
                        {{ project.clients.lastName }}
                      </td>
                      <td>{{ project.departements.departement_name }}</td>
                      <td>
                        <button
                          type="button"
                          class="btn btn-outline-info mb-2"
                          data-bs-toggle="offcanvas"
                          data-bs-target="#offcanvasRight"
                          aria-controls="offcanvasRight"
                          @click="
                            getProjectDetailsByID(
                              project.id,
                              project.clients.id
                            )
                          "
                        >
                          Project Details
                        </button>
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
      class="offcanvas offcanvas-end"
      tabindex="-1"
      id="offcanvasRight"
      aria-labelledby="offcanvasRightLabel"
    >
      <div class="offcanvas-header">
        <h5 id="offcanvasRightLabel">
          Project Details for CLIENT ID (#{{ Client }})
        </h5>
        <button
          type="button"
          class="btn-close text-reset"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        ></button>
      </div>
      <div class="offcanvas-body" v-if="ProjectDetails.exists == true">
        <div class="mb-3">
          <!-- card -->
          <div class="card">
            <!-- card body -->
            <div class="card-body p-6 border-bottom mb-4">
              <!-- text -->
              <div class="d-flex align-items-center mb-3">
                <div>
                  <h2 class="mb-0">{{ Project.project_name }}</h2>
                </div>
               
              </div>
              <!-- price -->
              <div class="d-flex align-items-end mt-6 mb-3">
                <h1 class="fw-bold me-1 mb-0">
                  TND{{ ProjectDetails.estimatedValue }}
                </h1>
                <p class="mb-0">/Project</p>
              </div>
              <!-- button -->
             
            </div>
            <!-- card body -->
            <div class="card-body">
              <p class="mb-0">Project Details for CLIENT ID (#{{ Client }})</p>
              <ul class="list-group">
                <li class="list-group-item" v-if="ProjectDetails.emp != null">
                  <i
                    data-feather="user-check"
                    class="me-2 text-success icon-xs"
                  ></i
                  ><span
                    class="fw-bold text-dark"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title="Tooltip on top"
                    >Project Manager : </span
                  >{{ Chef.firstName }} {{ Chef.lastName }}
                </li>
                <li class="list-group-item" v-else>
                  <div class="d-grid gap-2 col-12 mx-auto">
                    <a href="/TeamLeader" class="btn btn-outline-warning btn-sm"
                      ><i class="bi bi-info-circle"></i> Assign a Team Leader</a
                    >
                  </div>
                </li>
                <li class="list-group-item">
                  <i
                    data-feather="map-pin"
                    class="me-2 text-success icon-xs"
                  ></i
                  ><span class="fw-bold text-dark">Place : </span>
                  {{ ProjectDetails.place }}
                </li>
               
                <li class="list-group-item">
                  <i
                    data-feather="dollar-sign"
                    class="me-2 text-success icon-xs"
                  ></i
                  ><span class="fw-bold text-dark">Estimated Value :</span
                  >{{ ProjectDetails.estimatedValue }}
                </li>
                <li class="list-group-item" v-if="ProjectDetails.teams != null">
                  <i data-feather="users" class="me-2 text-success icon-xs"></i
                  ><span class="fw-bold text-dark"> Team : </span
                  ><button
                    class="badge bg-dark"
                    data-bs-toggle="modal"
                    data-bs-target="#teamMemebers"
                    data-bs-dismiss="offcanvas"
                    aria-label="Close"
                  >
                    View
                  </button>
                </li>

                <li class="list-group-item">
                  <i
                    data-feather="check-circle"
                    class="me-2 text-success icon-xs"
                  ></i
                  ><span class="fw-bold text-dark"> Status : </span
                  >{{ ProjectDetails.cpercentage }}%
                </li>
                <li class="list-group-item">
                  <i
                    data-feather="check-circle"
                    class="me-2 text-success icon-xs"
                  ></i
                  ><span class="fw-bold text-dark">
                    Priority : <span class="badge bg-info">Low</span>
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="offcanvas-body" v-else>
        <div class="alert alert-danger alert-dismissible fade show">
          <h4 class="alert-heading">
            <i class="bi-exclamation-octagon-fill"></i> Oops! Something went
            wrong.
          </h4>
          <div class="d-grid gap-2 col-6 mx-auto">
            <button
              class="btn btn-outline-success"
              type="button"
              data-bs-toggle="modal"
              data-bs-target="#finishSettingUpProject"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            >
              Finish Setting Up Project
            </button>
          </div>
          <hr />
          <p class="mb-0">
            Once you have filled all the details, you will be able to see all
            the project details.
          </p>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="alert"
          ></button>
        </div>
      </div>
    </div>
    <div
      class="modal fade"
      id="teamMemebers"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">
              {{ Team.team_name }} Members
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
              <li
                class="list-group-item"
                v-for="Team_member in Team_members"
                v-bind:key="Team_member.id"
              >
                <i class="me-2 text-success icon-xs bi bi-person-check"></i>
                <span class="fw-bold text-dark">
                  {{ Team_member.firstName }} {{ Team_member.lastName }}</span
                >
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div
      class="modal fade"
      id="finishSettingUpProject"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">
              Finish Setting Up
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <form @submit="finishSettingUpProject"> 
              <div class="mb-3">
                <label for="recipient-name" class="col-form-label"
                  >Place :
                </label>
                <input type="text" class="form-control" v-model="place"  required/>
              </div>

              <div class="mb-3">
                <label for="validationCustom04" class="form-label"
                  >Estimated Value</label
                >
                 <MazInputPrice
                          v-model="estimatedValue"
                          
                          currency="TND"
                          locale="fr-FR"
                          :min="100"
                          :max="5000"
                          @formatted="formattedPrice = $event" 
                        />
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
             type="submit" class="btn btn-primary"
              
            >
              Save changes
            </button>
          </div>
            </form>
          </div>
          
        </div>
      </div>
    </div>
   
  </div>
</template>


<script>
import NavBar from "../../components/NavBar.vue";
import SideBar from "../../components/SideBar.vue";
import ProjectService from "../../service/Project/ProjectService";
import $ from "jquery";

export default {
  name: "AllProjects",
  components: { NavBar, SideBar },
  data() {
    return {
      Projects: [],
      ProjectDetails: {
        exists: true,
      },
      Project: {},
      Client: {},
      Team: {},
      Chef: {},
      Team_members: [],
      projectID: "",
      place: "",
      estimatedValue: "",
    };
  },
  methods: {
    getProjects() {
      ProjectService.getProjects().then((reponse) => {
        this.Projects = reponse.data;
        console.log(this.Projects);
      });
    },

    getProjectDetailsByID(project_id, client_id) {
      this.projectID = project_id;
      ProjectService.getProjectDetailsByID(project_id).then((response) => {
        this.Client = client_id;
        if (response.data) {
          this.ProjectDetails = response.data;
          this.ProjectDetails.exists = true;
          this.Project = this.ProjectDetails.project;
          if (this.ProjectDetails.emp != null) {
            this.Chef = this.ProjectDetails.emp;
            if (this.ProjectDetails.teams != null) {
              this.Team = this.ProjectDetails.teams;
              this.Team_members = this.Team.employees;
            }
          }
          console.log(response.data);
        } else {
          this.ProjectDetails.exists = false;
          console.log(response.data);
        }
      });
    },
    finishSettingUpProject : function (e) {
      console.log("test")
      const finishProjectDetails = {
        client_id: this.Client,
        project_id: this.projectID,
        place: this.place,
        estimatedValue: this.estimatedValue,
      };
      ProjectService.finishSettingUpP(
        finishProjectDetails,
        this.projectID,
        this.Client
      ).then(()=>{
        location.reload();
      });
      e.preventDefault();
    },
  },
  created() {
    this.getProjects();
    const newLocal = "#example";
    setTimeout(function () {
      $(document).ready(function () {
        $(newLocal).DataTable({
          paging: true,
          info: true,
          pageLength: 5,
        });
      });
    }, 1000);
  },
};
</script>