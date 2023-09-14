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
                      <td>{{ project.project.project_name }}</td>
                      <td>
                        {{ project.clients.firstName }}
                        {{ project.clients.lastName }}
                      </td>
                      <td>
                        {{ project.project.departements.departement_name }}
                      </td>
                      <td>
                        <button
                          type="button"
                          class="btn btn-outline-info mb-2"
                          data-bs-toggle="offcanvas"
                          data-bs-target="#offcanvasRight"
                          aria-controls="offcanvasRight"
                          @click="
                            getProjectDetailsByID(
                              project.project.id,
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
      <div class="offcanvas-body">
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
                  ${{ ProjectDetails.estimatedValue }}
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
                  ><span class="fw-bold text-dark"> Priority </span>
                </li>
              </ul>
            </div>
          </div>
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
            <form>
              <div class="mb-3">
                <label for="recipient-name" class="col-form-label"
                  >Place :
                </label>
                <input type="text" class="form-control" v-model="place" />
              </div>

              <div class="mb-3">
                <label for="validationCustom04" class="form-label"
                  >Estimated Value</label
                >
                <input
                  type="text"
                  class="form-control"
                  v-model="estimatedValue"
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
              @click="finishSettingUpProject()"
            >
              Save changes
            </button>
          </div>
        </div>
      </div>
    </div>
    <div
      class="modal fade"
      id="assignTeam"
      tabindex="-1"
      aria-labelledby="planModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">My Teams</h5>
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
                class="
                  list-group-item
                  d-flex
                  justify-content-between
                  align-items-start
                "
                v-for="team in MyTeams"
                v-bind:key="team.id"
              >
                <div class="ms-2 me-auto">
                  <input
                    class="form-check-input me-1"
                    type="radio"
                    name="R1"
                    v-model="checked"
                    :value="team.id"
                  />
                  {{ team.team_name }}
                </div>

                <span class="badge bg-secondary">{{ team.nbEmployee }}</span>
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
            <button type="button" class="btn btn-primary" @click="AssignTeam()">
              Save changes
            </button>
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
import TeamService from "../../service/Team/Team";

export default {
  name: "AllProjects",
  components: { NavBar, SideBar },
  data() {
    return {
      Projects: [],
      MyTeams: [],
      checked: "",
      project_details_id: "",
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
    getTeams(project_details_id) {
      this.project_details_id = project_details_id;
      TeamService.getTeams().then((response) => {
        this.MyTeams = response.data;
      });
    },
    getProjects() {
      ProjectService.getMyProjectsClient().then((reponse) => {
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

          this.Chef = this.ProjectDetails.emp;
          if (this.ProjectDetails.teams != null) {
            this.Team = this.ProjectDetails.teams;
            this.Team_members = this.Team.employees;
          }

          console.log(response.data);
        } else {
          this.ProjectDetails.exists = false;
          console.log(response.data);
        }
      });
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