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
          <div class="col-xl-3 col-lg-6 col-md-12 col-12 mt-6">
            <!-- card -->
            <div class="card rounded-3">
              <!-- card body -->
              <div class="card-body">
                <!-- heading -->
                <div
                  class="d-flex justify-content-between align-items-center mb-3"
                >
                  <div>
                    <h4 class="mb-0">Projects</h4>
                  </div>
                  <div
                    class="
                      icon-shape icon-md
                      bg-light-primary
                      text-primary
                      rounded-1
                    "
                  >
                    <i class="bi bi-briefcase fs-4"></i>
                  </div>
                </div>
                <!-- project number -->
                <div>
                  <h1 class="fw-bold">{{infos.Projects}}</h1>
                  <p class="mb-0">
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="col-xl-3 col-lg-6 col-md-12 col-12 mt-6">
            <!-- card -->
            <div class="card rounded-3">
              <!-- card body -->
              <div class="card-body">
                <!-- heading -->
                <div
                  class="d-flex justify-content-between align-items-center mb-3"
                >
                  <div>
                    <h4 class="mb-0">Active Task</h4>
                  </div>
                  <div
                    class="
                      icon-shape icon-md
                      bg-light-primary
                      text-primary
                      rounded-1
                    "
                  >
                    <i class="bi bi-list-task fs-4"></i>
                  </div>
                </div>
                <!-- project number -->
                <div>
                  <h1 class="fw-bold">{{infos.Tasks}}</h1>
                  <p class="mb-0">
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="col-xl-3 col-lg-6 col-md-12 col-12 mt-6">
            <!-- card -->
            <div class="card rounded-3">
              <!-- card body -->
              <div class="card-body">
                <!-- heading -->
                <div
                  class="d-flex justify-content-between align-items-center mb-3"
                >
                  <div>
                    <h4 class="mb-0">Teams</h4>
                  </div>
                  <div
                    class="
                      icon-shape icon-md
                      bg-light-primary
                      text-primary
                      rounded-1
                    "
                  >
                    <i class="bi bi-people fs-4"></i>
                  </div>
                </div>
                <!-- project number -->
                <div>
                  <h1 class="fw-bold">{{infos.Teams}}</h1>
                  <p class="mb-0">
                    
                  </p>
                </div>
              </div>
            </div>
          </div>
         
        </div>
        <!-- row  -->
        <div class="row mt-6" v-if="role=='ROLE_ADMIN' || role=='ROLE_HR'">
            <div class="col-md-12 col-12">
              <!-- card  -->
              <div class="card">
                <!-- card header  -->
                <div class="card-header bg-white border-bottom-0 py-4">
                  <h4 class="mb-0">Active Projects</h4>
                </div>
                <!-- table  -->
                <div class="table-responsive">
                  <table class="table text-nowrap mb-0">
                    <thead class="table-light">
                      <tr>
                        <th>Project name</th>
                        <th>priority</th>
                        <th>Progress</th>
                      </tr>
                    </thead>
                    <tbody>
                     
                      <tr v-for="p in projects" v-bind:key="p.id">
                        <td class="align-middle"><div class="d-flex
                            align-items-center">
                            
                            <div class="ms-3 lh-1">
                              <h5 class="fw-bold mb-1"> <a href="#"
                                  class="text-inherit">
                                        {{p.project.project_name}}</a></h5>
                            </div>
                          </div></td>
                        <td class="align-middle border-bottom-0"><span class="badge bg-info">Low</span></td>
                       
                        <td class="align-middle text-dark"><div
                            class="float-start me-3">{{p.cpercentage}}%</div>
                          <div class="mt-2">
                            <div class="progress" style="height: 5px;">
                              <div class="progress-bar" role="progressbar"
                                style="width:35%" :aria-valuenow=p.cpercentage
                                aria-valuemin="0" aria-valuemax="100"></div>
                            </div>
                          </div>
                        </td>
                      </tr>
                     
                     
                    
                      

                    </tbody>
                  </table>
                </div>
                <!-- card footer  -->
                <div class="card-footer bg-white text-center">
                  <a href="/Projects">View All Projects</a>

                </div>
              </div>

            </div>
          </div>
      </div>
    </div>
    
  </div>
</template>

<style>
</style>

<script>
import NavBar from "../components/NavBar.vue";
import SideBar from "../components/SideBar.vue";
import DashboardService from "../service/Dashboard/Infos"

export default {
  name: "HomeView",
  components: { NavBar, SideBar },
  data() {
    return {
      infos : {},
      projects:[],
      role:""
    };
  },
  methods: {
    getDashboardInfos(){
      DashboardService.getInfos().then(response=>{
        this.infos = response.data;
      })
      
    },
     getLatestProject(){
      DashboardService.getLatestProject().then(response=>{
        this.projects = response.data;
      })
      
    }
  },
  created() {
    this.role = localStorage.getItem('roles').replaceAll('"',"");

    this.getDashboardInfos();
    this.getLatestProject()
  },
};
</script>
