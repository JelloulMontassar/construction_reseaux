<template>
  <div id="db-wrapper">
    <SideBar></SideBar>
    <!-- Page content -->
    <div id="page-content">
      <NavBar></NavBar>
      <div class="bg-primary pt-10 pb-21"></div>
      <div class="container-fluid mt-n22 px-6">
        <div class="row justify-content-md-center">
          <div class="row justify-content-md-center">
            <div class="col-xl-8 col-lg-8 col-md-8 col-sm-8 col-8">
              <div id="validation" class="mb-4">
                <h2 class="mb-0 fw-bold text-white text-uppercase">
                  <i class="bi bi-clipboard-check"></i> Apply for a vacation
                </h2>
              </div>
              <!-- Card -->
              <div class="card mb-3">
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
                    <form
                      class="row g-3 needs-validation"
                      @submit="Apply"
                    >
                      <div class="col-lg-12">
                        <div class="col-lg-8">
                          <label for="validationCustom01" class="form-label"
                            >Reason</label
                          >

                          <select
                            class="form-control custom-select"
                            v-model="reason" required
                          >
                          <option selected disabled value="">Choose...</option>
                            <option
                              value="Bad weather hence could not reach office"
                            >
                              Bad weather hence could not reach office
                            </option>

                            <option value="No transport">No transport</option>
                            <option value="Due to a family emergency">
                              Due to a family emergency
                            </option>
                            <option value="Personal problmes">
                              Personal problmes
                            </option>
                          </select>
                        </div>
                      </div>
                      <div class="col-lg-12">
                        <div class="col-sm-6">
                          <label
                            for="validationCustomUsername"
                            class="form-label"
                            >Can you describe the reason ?</label
                          >
                          <div class="input-group has-validation">
                            <textarea
                              type="text"
                              class="form-control"
                              v-model="description"
                              id="validationCustomUsername"
                              aria-describedby="inputGroupPrepend"
                              required
                            />
                          </div>
                        </div>
                      </div>
                      <div class="col-md-4">
                        <label for="validationCustom01" class="form-label"
                          >Stating Date</label
                        >
                        <input
                          type="date"
                          class="form-control"
                          id="validationCustom01"
                          v-model="startDate"
                          :min="state.time"
                          @change="changeStartDate"
                          required
                        />
                        <div class="valid-feedback">Looks good!</div>
                      </div>
                      <div class="col-md-4">
                        <label for="validationCustom02" class="form-label"
                          >Ending Date</label
                        >
                        <input
                          type="date"
                          class="form-control"
                          id="validationCustom02"
                          v-model="EndDate"
                          :min="state.endDateMin"
                          required
                        />
                        <div class="valid-feedback">Looks good!</div>
                      </div>
                      <div class="col-sm-12 align-self-end">
                        <button
                          class="btn btn-primary"
                          type="submit"
                          
                        >
                          Apply
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
import { reactive } from "vue";

function today() {
  var dtToday = new Date();

  var month = dtToday.getMonth() + 1;
  var day = dtToday.getDate();
  var year = dtToday.getFullYear();
  if (month < 10) month = "0" + month.toString();
  if (day < 10) day = "0" + day.toString();

  var maxDate = year + "-" + month + "-" + day;
  return maxDate;
}
function addOneDay(gday) {
  var dtToday = new Date(gday);
  var increasedDate = new Date(dtToday.getTime() + 86400000);
  var month = increasedDate.getMonth() + 1;
  var day = increasedDate.getDate();
  var year = increasedDate.getFullYear();
  if (month < 10) month = "0" + month.toString();
  if (day < 10) day = "0" + day.toString();

  var maxDate = year + "-" + month + "-" + day;
  return maxDate;
}
export default {
  name: "newVacation",
  components: { NavBar, SideBar },
  setup() {
    // ##003 : declare and initialize reactive object
    const state = reactive({
      time: today(),
      startDate: "",
      endDateMin: "",
    });
    function changeStartDate(event) {
      state.startDate = event.target.value;
      state.endDateMin = addOneDay(state.startDate);
      console.log(state.startDate);
    }
    return { state, changeStartDate };
  },
  data() {
    return {
      reason: "",
      startDate: "",
      EndDate: "",
      description: "",
    };
  },
  methods: {
    Apply: function (e) {
      const newVacation = {
        reasonOfVacation: this.reason,
        beginDateOfVacation: this.startDate,
        endDateOfVacation: this.EndDate,
        desciptionOfVacation: this.description,
      };
      EmployeeService.applyForVacation(newVacation).then(() => {
        this.$toast.success(
          "You have submitted a new vacation demande successfully",
          {
            position: "top",
          }
        );
        this.$router.push("/MyVacations");
      });
    
    e.preventDefault();
    },
  },
};
</script>