<template>
  <div id="db-wrapper">
    <SideBar></SideBar>
    <!-- Page content -->
    <div id="page-content">
      <NavBar></NavBar>
      <div class="bg-primary pt-10 pb-21"></div>
      <div class="container-fluid mt-n22 px-6">
        <div class="row">
          <!-- basic table -->
          <div class="col-lg-12 col-md-12 col-12">
            <!-- Page header -->
            <div>
              <div class="d-flex justify-content-between align-items-center">
                <div class="mb-2 mb-lg-0">
                  <h3 class="mb-0 fw-bold text-white">Clients</h3>
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
                <table
                  id="table1"
                  class="table table-bordered text-center"
                  style="width: 100%"
                >
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">First</th>
                      <th scope="col">Last</th>
                      <th scope="col">@Email</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="client in clients" v-bind:key="client.id">
                      <td>{{ client.id }}</td>
                      <td>{{ client.firstName }}</td>
                      <td>{{ client.lastName }}</td>
                      <td>{{ client.emailId }}</td>
                      <td>
                        <div class="d-grid gap-2 d-inline-flex p-2">
                          <button
                            type="button"
                            class="btn btn-outline-danger"
                            @click="DeleteClient(client.id)"
                          >
                            <i class="bi bi-trash"></i>
                          </button>
                          <button
                            type="button"
                            class="btn btn-outline-info"
                            @click="getClientByID(client)"
                            data-bs-toggle="modal"
                            data-bs-target="#UpdateClient"
                            data-whatever="@fat"
                          >
                            <i class="bi bi-pencil-square"></i>
                          </button>
                          <button
                            type="button"
                            class="btn btn-outline-primary"
                            data-bs-toggle="modal"
                            data-bs-target="#AddProject"
                            data-whatever="@fat"
                            @click="getID(client.id)"
                          >
                            <span class="bi bi-folder-plus"></span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <!-- basic table -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      class="modal fade"
      id="AddProject"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabelOne"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabelOne">Add Project</h5>
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
            <form @submit="addProject">
              <div class="mb-3">
                <label for="recipient-name" class="col-form-label"
                  >Project Name :</label
                >
                <input
                  type="text"
                  class="form-control"
                  v-model="project_namex"
                  required
                />
              </div>

              <div class="mb-3">
                <label for="validationCustom04" class="form-label"
                  >Departement</label
                >
                <select
                  class="form-select"
                  id="validationCustom04"
                  v-model="departement_idx"
                  required
                >
                  <option value="1">GAZ</option>
                  <option value="2">EAUX</option>
                </select>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button type="submit" class="btn btn-primary">
                  Add Project
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <div
      class="modal fade"
      id="UpdateClient"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabelOne"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabelOne">
              Update Client {{ activeClient.id }}
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
            <form @submit="updateClients">
              <div class="mb-3">
                <label for="recipient-name" class="col-form-label"
                  >Client EmailID :</label
                >
                <input
                  type="text"
                  class="form-control"
                  v-model="activeClient.emailId"
                  disabled
                />
              </div>
              <div class="mb-3">
                <label for="recipient-name" class="col-form-label"
                  >Client FirstName :</label
                >
                <input
                  type="text"
                  class="form-control"
                  v-model="activeClient.firstName"
                  required
                />
              </div>

              <div class="mb-3">
                <label for="recipient-name" class="col-form-label"
                  >Client LastName :</label
                >
                <input
                  type="text"
                  class="form-control"
                  v-model="activeClient.lastName"
                  required
                />
              </div>
              <button type="submit" class="btn btn-primary">
                Update client
              </button>
            </form>
          </div>
          <div class="modal-footer"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from "../../components/NavBar.vue";
import SideBar from "../../components/SideBar.vue";
import ClientService from "../../service/Client/ClientService";
import ProjectService from "../../service/Project/ProjectService";
import $ from "jquery";
export default {
  name: "AllClients",
  components: { NavBar, SideBar },
  data() {
    return {
      clients: [],
      project_namex: "",
      departement_idx: "",
      client_idx: "",
      activeClient: {},
    };
  },
  methods: {
    getClients() {
      ClientService.getClient()
        .then((response) => {
          if (response.status == 200) this.clients = response.data;
        })
        .catch((error) => {
          this.$toast.error(error.response.data.message, {
            position: "top",
          });
          this.$router.push({ path: "/home" });
        });
    },
    getClientByID(client) {
      this.activeClient = client;
      console.log(this.activeClient.firstName);
    },
    DeleteClient(client_id) {
      ClientService.deleteClient(client_id).then(() => {
        this.getClients();
      });
    },
    updateClients: function (e) {
      ClientService.updateClient(this.activeClient)
        .then(() => {
          location.reload();
        })
        .catch((error) => {
          console.log(error);
        });
      e.preventDefault();
    },
    getID(id) {
      this.client_idx = id;
      console.log(this.client_idx);
    },

    addProject: function (e) {
      e.preventDefault();
      const newProject = {
        client_id: this.client_idx,
        project_name: this.project_namex,
        departement_id: this.departement_idx,
      };
      ProjectService.addProject(newProject)
        .then(() => {
          this.$toast.success("Project Created Successfully.", {
            position: "top",
          });

          this.$router.push({ path: "/Projects" });
        })
        .catch((error) => {
          this.$toast.error(error.response.data.message, {
            position: "top",
          });
        });
    },
  },
  created() {
    this.getClients();
    setTimeout(function () {
      $(document).ready(function () {
        $("#table1").DataTable({
          paging: true,
          info: true,
          pageLength: 5,
        });
      });
    }, 1000);
  },
};
</script>

<style>
</style>