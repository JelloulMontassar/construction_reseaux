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
                  <h3 class="mb-0 fw-bold text-white">My Vacations</h3>
                </div>
                <div>
                  <button
                    data-bs-toggle="modal"
                    data-bs-target="#AddProject"
                    data-whatever="@fat"
                    class="btn btn-white"
                  >
                    Apply for vacation
                  </button>
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
                  class="
                    display
                    table table-striped
                    dataTable
                    no-footer
                    text-center
                  "
                  border="0"
                  cellpadding="5"
                  role="grid"
                  style="width: 100%"
                >
                  <thead>
                    <tr>
                      <th scope="col">Begin Date</th>
                      <th scope="col">End Date</th>
                      <th scope="col">Resean of Vacation</th>
                      <th scope="col">Description</th>
                      <th scope="col">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="vac in MyVacations" v-bind:key="vac.id">
                      <td>{{ vac.beginDateOfVacation }}</td>
                      <td>{{ vac.endDateOfVacation }}</td>
                      <td>{{ vac.reasonOfVacation }}</td>
                      <td>{{ vac.desciptionOfVacation }}</td>
                      <td v-if="vac.status == 'accepted'">
                        <span class="badge bg-success">Accepted</span>
                      </td>
                      <td v-else-if="vac.status == 'rejected'">
                        <span class="badge bg-danger">Rejected</span>
                      </td>
                      <td v-else>
                        <span class="badge bg-warning">Waiting</span>
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
  </div>
</template>


<script>
import $ from "jquery";
import NavBar from "../../components/NavBar.vue";
import SideBar from "../../components/SideBar.vue";
import EmployeeService from "../../service/Employee/EmployeeService";

export default {
  name: "MyVacations",
  components: { NavBar, SideBar },
  data() {
    return {
      MyVacations: [],
    };
  },
  methods: {
    getMyVacations() {
      EmployeeService.getMyVacations().then((response) => {
        this.MyVacations = response.data;
      });
    },
  },
  created() {
    this.getMyVacations();
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
                    className: 'btn btn-light btn-sm btn-rounded'
                }
            },
            buttons: [
                {
                    //EXCEL
                    extend: 'csv',
                    text: '<i class="bi bi-file-arrow-down"></i> CSV',
                    title: ('MyVacation'),
                },
                {
                    //PRINT
                    extend: 'print',
                    text: '<i class="bi bi-printer"></i> Print',
                    title: ('MyVacation'),
                },
                {
                    //COPY
                    extend: 'copy',
                    text: '<i class="bi bi-clipboard-check"></i> COPY',
                    title: ('MyVacation'),
                }
            ]
        },
        });
      });
    }, 1000);
  },
};
</script>