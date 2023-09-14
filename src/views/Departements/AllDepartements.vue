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
                  <h3 class="mb-0 fw-bold text-white">Departements</h3>
                </div>
                <div>
                  <button
                    data-bs-toggle="modal"
                    data-bs-target="#AddProject"
                    data-whatever="@fat"
                    class="btn btn-white"
                  >
                    Create New Departement
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
                  class="table table-bordered text-center"
                  style="width: 100%"
                >
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">departement_name</th>
                      
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="dep in departements" v-bind:key="dep.id">
                      <td>{{ dep.id }}</td>
                      <td>{{ dep.departement_name }}</td>
                      
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
                        v-model="Departement_update_id" hidden    

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
                    data-whatever="@fat" data-bs-dismiss="modal"
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
            id="AddProject"
            tabindex="-1"
            role="dialog"
            aria-labelledby="exampleModalLabelOne"
            aria-hidden="true"
          >
            <div class="modal-dialog" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabelOne">
                    Add Departement
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
                        v-model="Departement"
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
                    data-whatever="@fat" data-bs-dismiss="modal"
                    @click="saveDepartement"
                  >
                    Save Departement
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
import NavBar from "../../components/NavBar.vue";
import SideBar from "../../components/SideBar.vue";
import DepartementService from "../../service/Departement/Departement";
export default {
  name: "AllDepartements",
  components: { NavBar, SideBar },
  data() {
    return {
      departements: [],
      depart:[],
      departement: {
        departement_name: "",
      }
      
    };
  },
  
  methods: {
    getDepartement() {
      DepartementService.getDepartement().then((response) => {
        this.departements = response.data;
      });
    },
    saveDepartement() {
      DepartementService.addDepartement({
        departement_name: this.Departement,
      }).then(() => {
            console.log("Success");
            this.getDepartement();
      });
    },
    deleteDepartement(id){
        DepartementService.deleteDepartement(id)
        .then(()=>{
          this.$swal({
            icon: 'success',
            text: 'Departement Deleted Succesfully',
          });
            this.getDepartement();
        })
    },
    getDepartementById(id){
        DepartementService.getDepartementByID(id).then((response) => {
        this.depart = response.data;
        console.log(this.depart);
      
      });
    },
    
  },

  created() {
    this.getDepartement();
  },
  computed: {
   Departement_update() {
       // simplified example
      return this.depart.departement_name;
      },
    Departement_update_id() {
       // simplified example
      return this.depart.id;
   }
}
};
</script>