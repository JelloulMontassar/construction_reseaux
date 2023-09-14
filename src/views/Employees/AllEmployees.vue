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
                  <h3 class="mb-0 fw-bold text-white text-uppercase">
                    <i class="bi bi-people"></i> Employees
                  </h3>
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
                  class="text-center"
                  border="0"
                  cellpadding="5"
                  role="grid"
                  style="width: 100%"
                >
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">First Name</th>
                      <th scope="col">Last Name</th>
                      <th scope="col">Departement Name</th>
                      <th scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="emp in employees" v-bind:key="emp.id">
                      <td v-if="emp.employee">
                        <router-link :to="`/ViewProfile/${emp.employee.emailId}`"> {{ emp.employee.id }} </router-link>
                      </td>
                      <td v-else></td>
                      <td v-if="emp.employee">
                        {{ emp.employee.firstName }}
                      </td>
                      <td v-else></td>
                      <td v-if="emp.employee">
                        {{ emp.employee.lastName }}
                      </td>
                      <td v-else></td>
                      <td v-if="emp.employee">
                        {{ emp.employee.departements.departement_name }}
                      </td>
                      <td v-else></td>
                      <td v-if="emp.employee">
                        <div
                          class="
                            d-grid
                            gap-2
                            d-md-flex
                            justify-content-md-center
                          "
                        >
                          <button
                            v-if="role == 'ROLE_HR'"
                            type="button"
                            class="btn btn-outline-info"
                            data-bs-toggle="modal"
                            data-bs-target="#UpdateEmployee"
                            @click="getActiveEmpl(emp.employee)"
                          >
                            <i class="bi bi-pencil-square"></i> Edit
                          </button>
                          <button
                            v-if="role == 'ROLE_HR'&&emp.enabled==true" 
                            type="button"
                            class="btn btn-outline-danger"
                            @click="disableEmployeeById(emp.employee.id)"
                          >
                            <i class="bi bi-person-x"></i> Disable
                          </button>
                          <button
                            v-if="role == 'ROLE_HR'&&emp.enabled==false" 
                            type="button"
                            class="btn btn-outline-success"
                            @click="enableEmployeeById(emp.employee.id)"
                          >
                            <i class="bi bi-person-check"></i> Enable
                          </button>
                          <button
                            v-if="role == 'ROLE_CHEF'"
                            type="button"
                            class="btn btn-outline-success"
                            @click="getTeams(emp.employee.id)"
                            data-bs-toggle="modal"
                            data-bs-target="#exampleModal"
                          >
                            <i class="bi bi-plus-square"></i> Assign
                          </button>
                        </div>
                      </td>
                      <td v-else></td>
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
      id="exampleModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
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
            <button
              type="button"
              class="btn btn-primary"
              @click="AddEmployeeToTeam()"
              data-bs-dismiss="modal"
            >
              Save changes
            </button>
          </div>
        </div>
      </div>
    </div>
    <div
      class="modal fade"
      id="UpdateEmployee"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabelOne"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabelOne">
              Update Employee {{ activeEmployee.id }}
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
            <form @submit="updateEmployee">
              <div class="mb-3">
                <label for="recipient-name" class="col-form-label"
                  >Employee EmailID :</label
                >
                <input
                  type="text"
                  class="form-control"
                  v-model="activeEmployee.emailId"
                  disabled
                />
              </div>
              <div class="mb-3">
                <label for="recipient-name" class="col-form-label"
                  >Employee FirstName :</label
                >
                <input
                  type="text"
                  class="form-control"
                  v-model="activeEmployee.firstName"
                  required
                />
              </div>

              <div class="mb-3">
                <label for="recipient-name" class="col-form-label"
                  >Employee LastName :</label
                >
                <input
                  type="text"
                  class="form-control"
                  v-model="activeEmployee.lastName"
                  required
                />
              </div>
              <button type="submit" class="btn btn-primary">
                Update Employee
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
import EmployeeService from "../../service/Employee/EmployeeService";
import TeamService from "../../service/Team/Team";
import $ from "jquery";

export default {
  name: "AllEmployees",
  components: { NavBar, SideBar },

  data() {
    return {
      checked: "",
      employees: "",
      MyTeams: [],
      employee_id: "",
      role: "",
      activeEmployee: {},
    };
  },
  methods: {
    updateEmployee: function (e) {
      EmployeeService.updateEmployee(this.activeEmployee)
        .then(() => {
          location.reload();
        })
        .catch((error) => {
          console.log(error);
        });
      e.preventDefault();
    },
    getActiveEmpl(employee) {
      this.activeEmployee = employee;
    },
    disableEmployeeById(employee_id) {
      EmployeeService.deleteEmployee(employee_id).then(() => {
        this.$swal({
          icon: "error",
          text: "Employee ID:" + employee_id + " Disabled successfully",
        });
        this.getEmployees();
      });
    },
    enableEmployeeById(employee_id){
      EmployeeService.enableEmployee(employee_id).then(() => {
        this.$swal({
          icon: "success",
          text: "Employee ID:" + employee_id + " Enabled successfully",
        });
        this.getEmployees();
      });
    },
    getEmployees() {
      EmployeeService.getEmployees().then((response) => {
        this.role = localStorage.getItem("roles").replaceAll('"', "");
        this.employees = response.data;
      });
    },
    getTeams(employee_id) {
      this.employee_id = employee_id;
      TeamService.getTeams().then((response) => {
        this.MyTeams = response.data;
      });
    },
    AddEmployeeToTeam() {
      TeamService.addEmployeeToTeam(this.checked, this.employee_id)
        .then((response) => {
          console.log(response.status);
          if (response.status == 201) {
            this.$toast.success("Employee added successfully to the team", {
              position: "top",
            });
          }
        })
        .catch((error) => {
          this.$toast.error(error.response.data.message, {
            position: "top",
          });
        });
    },
  },

  created() {
    EmployeeService.getEmployees().then((response) => {
      this.role = localStorage.getItem("roles").replaceAll('"', "");
      this.employees = response.data;
    });
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

<style>
</style>