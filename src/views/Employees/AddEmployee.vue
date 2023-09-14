<template>
  <div id="db-wrapper">
    <SideBar></SideBar>
    <!-- Page content -->
    <div id="page-content">
      <NavBar></NavBar>
      <div class="bg-primary pt-10 pb-21"></div>
      <div class="container-fluid mt-n22 px-6">
        <div class="row">
          <div class="row justify-content-md-center">
            <div class="col-xl-8 col-lg-8 col-md-8 col-sm-8 col-8">
              <div id="validation" class="mb-4">
                <h2 class="mb-0 fw-bold text-white text-uppercase">
                  <i class="bi bi-patch-plus"></i> Add New Employee
                </h2>
              </div>
              <!-- Card -->
              <div class="card border-info mb-3">
                <ul
                  class="nav nav-line-bottom"
                  id="pills-tab-validation"
                  role="tablist"
                >
                  <li class="nav-item">
                    <a
                      class="nav-link active"
                      id="pills-validation-design-tab"
                      data-bs-toggle="pill"
                      href="#pills-validation-design"
                      role="tab"
                      aria-controls="pills-validation-design"
                      aria-selected="true"
                      >Fill the form below</a
                    >
                  </li>
                </ul>
                <!-- Tab content -->
                <div class="tab-content p-4" id="pills-tabContent-validation">
                  <div
                    class="tab-pane tab-example-design fade show active"
                    id="pills-validation-design"
                    role="tabpanel"
                    aria-labelledby="pills-validation-design-tab"
                  >
                    <form class="row g-3" @submit="checkForm">
                      <div class="col-12">
                        <div class="alert alert-danger" v-if="errors.length">
                          <b>Please correct the following error(s):</b>
                          <ul>
                            <li v-for="error in errors" v-bind:key="error">
                              {{ error }}
                            </li>
                          </ul>
                        </div>
                        <label for="validationCustom05" class="form-label"
                          >Type of Employee</label
                        >
                        <div class="form-check form-switch">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="flexSwitchCheckDefault"
                            v-model="checked"
                            :value="team_leader"
                          />
                          <label
                            class="form-check-label"
                            for="flexSwitchCheckDefault"
                            >Team Leader</label
                          >
                        </div>
                      </div>
                      <div class="col-md-4">
                        <label class="form-label">Email</label>
                        <div class="input-group">
                          <span class="input-group-text">@</span>
                          <input
                            type="email"
                            class="form-control"
                            v-model="emailId"
                          />
                        </div>
                      </div>
                      <div class="col-md-4">
                        <label for="validationCustom01" class="form-label"
                          >First name</label
                        >
                        <input
                          type="text"
                          class="form-control"
                          id="validationCustom01"
                          v-model="firstName"
                        />
                      </div>
                      <div class="col-md-4">
                        <label for="validationCustom02" class="form-label"
                          >Last name</label
                        >
                        <input
                          type="text"
                          class="form-control"
                          id="validationCustom02"
                          v-model="lastName"
                        />
                      </div>

                      <div class="col-md-4">
                        <i class="bi bi-currency-dollar"></i>
                        <label for="validationCustom03" class="form-label"
                          >Salary</label
                        >
                        <MazInputPrice
                          v-model="salary"
                          
                          currency="TND"
                          locale="fr-FR"
                          :min="800"
                          :max="5000"
                          @formatted="formattedPrice = $event"
                        />
                      </div>
                      <div class="col-md-4">
                        <i class="bi bi-geo-alt"></i
                        ><label
                          for="validationCustomUsername"
                          class="form-label"
                          >Adresse</label
                        >
                        <div class="input-group has-validation">
                          <input
                            type="text"
                            class="form-control"
                            v-model="homeAdresse"
                          />
                        </div>
                      </div>
                      <div class="col-md-3">
                        <label for="validationCustom04" class="form-label"
                          ><i class="bi bi-inboxes"></i> Departement</label
                        >
                        <select
                          class="form-select"
                          id="validationCustom04"
                          v-model="departement"
                          required
                        >
                          <option selected disabled value="">Choose...</option>
                          <option value="1">GAZ</option>
                          <option value="2">EAUX</option>
                        </select>
                      </div>
                      <div class="col-md-6">
                        
                        
                        <MazPhoneNumberInput
                        
                          v-model="phone"
                          show-code-on-list
                          color="info"
                          default-country-code="TN"
                          :only-countries="['TN']"
                          @update="results = $event"
                          :success="results?.isValid"
                        />
                      </div>

                      <div class="col-12">
                        <button
                          class="btn btn-primary float-left"
                          type="submit"
                        >
                          Submit form
                        </button>
                      </div>
                    </form>
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
import NavBar from "../../components/NavBar.vue";
import SideBar from "../../components/SideBar.vue";
import EmployeeService from "../../service/Employee/EmployeeService";
import MazPhoneNumberInput from "maz-ui/components/MazPhoneNumberInput";
import MazInputPrice from "maz-ui/components/MazInputPrice";

export default {
  name: "AddEmployee",
  components: { NavBar, SideBar, MazPhoneNumberInput, MazInputPrice },
  data() {
    return {
      firstName: "",
      lastName: "",
      departement: "",
      emailId: "",
      phone: "",
      homeAdresse: "",
      salary: "",
      checked: "",
      errors: [],
    };
  },
  methods: {
    checkForm: function (e) {
      if (
        this.emailId &&
        this.firstName &&
        this.lastName &&
        this.departement &&
        this.phone &&
        this.salary &&
        this.phone.length == 12
      ) {
        let newEmployee = {
          firstName: this.firstName,
          lastName: this.lastName,
          departement: this.departement,
          emailId: this.emailId,
          phone: this.phone.substring(4, this.phone.length),
          location: this.homeAdresse,
          salary: this.salary,
          checked: "",
        };
        if (this.checked == true) {
          newEmployee.checked = "true";
        } else {
          newEmployee.checked = "false";
        }

        EmployeeService.addEmployees(newEmployee)
          .then(() => {
            this.$swal({
              icon: "success",
              text: "An Email has been sent to the new employee with his login credentials",
            });
            this.$router.push("/Employees");
          })
          .catch((error) => {
            this.errors.push(error.response.data.message);
            console.log(this.errors);
            this.$swal({
              icon: "error",
              text: error.response.data.message,
            });
          });
      }

      this.errors = [];

      if (!this.emailId) {
        this.errors.push("Email required.");
        console.log(this.errors);
      }
      if (!this.lastName) {
        this.errors.push("LastName required.");
      }
      if (!this.firstName) {
        this.errors.push("FirstName required.");
      }
      if (!this.salary) {
        this.errors.push("Salary required.");
      }

      if (!this.phone) {
        this.errors.push("Phone number required.");
      }
      e.preventDefault();
    },
  },
};
</script>

<style>
</style>