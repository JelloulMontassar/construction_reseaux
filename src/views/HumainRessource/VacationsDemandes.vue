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
      <div class="container-fluid mt-n22 px-auto">
        <div class="row">
          <div class="col-lg-12 col-md-12 col-12">
            <!-- Page header -->
            <div>
              <div class="d-flex justify-content-between align-items-center">
                <div class="mb-2 mb-lg-0">
                  <h3 class="mb-0 fw-bold text-white">Vacations Demandes</h3>
                </div>
              </div>
            </div>
          </div>
          <div class="container-fluid px-auto px-auto">
            <!-- card -->
            <div class="card rounded-3">
              <!-- card body -->
              <div class="card-body">
                <!-- heading -->

                <!-- project number -->
                <table id="example" style="width: 100%">
                  <thead>
                    <tr>
                      <th scope="col">Employee Name</th>
                      <th scope="col">View</th>
                      <th scope="col">Starting Date Of Vacation</th>

                      <th scope="col">Ending Date Of Vacation</th>
                      <th scope="col">Desciption Of Vacation</th>
                      <th scope="col">Reason Of Vacation</th>
                      <th scope="col">Status</th>
                      <th scope="col">Accept/Reject</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="vac in VacationsDemandes" v-bind:key="vac.id">
                      <td>
                        {{ vac.employee.firstName }} {{ vac.employee.lastName }}
                      </td>
                      <td>
                        <span
                          data-bs-toggle="modal"
                          data-bs-target="#exampleModal"
                          class="badge rounded-pill bg-secondary"
                          @click="VacationsHistory(vac.employee.id)"
                          >View History</span
                        >
                      </td>
                      <td>{{ vac.beginDateOfVacation }}</td>
                      <td>
                        {{ vac.endDateOfVacation }}
                      </td>
                      <td>{{ vac.desciptionOfVacation }}</td>
                      <td>{{ vac.reasonOfVacation }}</td>
                      <td v-if="vac.status == 'accepted'">
                        <span class="badge bg-success">Accepted</span>
                      </td>
                      <td v-else-if="vac.status == 'rejected'">
                        <span class="badge bg-danger">Rejected</span>
                      </td>
                      <td v-else>
                        <span class="badge bg-warning">Waiting</span>
                      </td>

                      <td>
                        <div v-if="vac.status == 'rejected'">
                          <button
                            type="button"
                            class="btn btn-outline-success"
                            @click="AcceptVacationById(vac.id)"
                          >
                            <i class="bi bi-check-circle"></i> Accept
                          </button>
                        </div>
                        <div v-else-if="vac.status == 'accepted'">
                          <button
                            type="button"
                            @click="RejectVacationById(vac.id)"
                            class="btn btn-outline-danger"
                          >
                            <i class="bi bi-x-circle"></i> Reject
                          </button>
                        </div>
                        <div v-else>
                          <div class="d-grid gap-2 d-md-flex">
                            <button
                              type="button"
                              class="btn btn-outline-success"
                              @click="AcceptVacationById(vac.id)"
                            >
                              <i class="bi bi-check-circle"></i>
                            </button>
                            <button
                              type="button"
                              @click="RejectVacationById(vac.id)"
                              class="btn btn-outline-danger"
                            >
                              <i class="bi bi-x-circle"></i>
                            </button>
                          </div>
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
      id="exampleModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">
              <i class="bi bi-clock-history"></i> Employee Vacations History
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <div class="list-group">
              <a
                v-for="vac in EmployeeVacationsHistory"
                v-bind:key="vac.id"
                href="#"
                class="list-group-item list-group-item-action"
              >
                <div class="d-flex w-100 justify-content-between">
                  <h5 class="mb-1">{{ vac.reasonOfVacation }}</h5>
                  <small
                    ><i class="bi bi-calendar-date"></i>
                    {{ vac.beginDateOfVacation }}-{{
                      vac.endDateOfVacation
                    }}</small
                  >
                </div>
                <small>
                  <td v-if="vac.status == 'accepted'">
                    <span class="badge bg-success">Accepted</span>
                  </td>
                  <td v-else-if="vac.status == 'rejected'">
                    <span class="badge bg-danger">Rejected</span>
                  </td>
                  <td v-else>
                    <span class="badge bg-warning">Waiting</span>
                  </td></small
                >
              </a>
            </div>
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
</template>


<script>
import NavBar from "../../components/NavBar.vue";
import SideBar from "../../components/SideBar.vue";
import HumainRessources from "../../service/HR/HumainRessouces";
import $ from "jquery";

export default {
  name: "VacationsDemandes",
  components: { NavBar, SideBar },
  data() {
    return {
      VacationsDemandes: [],
      EmployeeVacationsHistory: [],
    };
  },
  methods: {
    getVacationsDemandes() {
      HumainRessources.getVacationsDemandes().then((response) => {
        if (response.status==200){
        this.VacationsDemandes = response.data;
}      }).catch(error=>{
        this.$toast.error(error.response.data.message, {
            position: "top",
          });
          this.$router.push({ path: '/home'});
      });
    },
    AcceptVacationById(vacation_id) {
      HumainRessources.AcceptVacationById(vacation_id).then(() => {
        this.$toast.success("Accepted Vacation ID#." + vacation_id, {
          position: "top",
        });
        this.getVacationsDemandes();
      });
    },
    RejectVacationById(vacation_id) {
      HumainRessources.RejectVacationById(vacation_id).then(() => {
        this.$toast.error("Rejected Vacation ID#." + vacation_id, {
          position: "top",
        });
        this.getVacationsDemandes();
      });
    },
    VacationsHistory(employee_id) {
      HumainRessources.VacationHistory(employee_id).then((response) => {
        this.EmployeeVacationsHistory = response.data;
      });
    },
  },
  created() {
    this.getVacationsDemandes();
    const newLocal = "#example";
    setTimeout(function () {
      $(document).ready(function () {
        $(newLocal).DataTable({
          paging: true,
          info: true,
          pageLength: 5,
          buttons: [
            {
              extend: "pdf",
              text: "Save current page",
              exportOptions: {
                modifier: {
                  page: "current",
                },
              },
            },
          ],
          order: [[6, "desc"]],
        });
      });
    }, 1000);
  },
};
</script>