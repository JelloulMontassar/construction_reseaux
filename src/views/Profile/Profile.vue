<template>
  <div id="db-wrapper">
    <!-- navbar vertical -->
    <!-- Sidebar -->
    <SideBar></SideBar>
    <!-- Page content -->
    <div id="page-content">
      <NavBar></NavBar>
      <div class="container-fluid px-6 py-4">
        <div class="row">
          <div class="col-lg-12 col-md-12 col-12">
            <!-- Page header -->
            <div>
              <div class="border-bottom pb-4 mb-4">
                <div class="mb-2 mb-lg-0">
                  <h3 class="mb-0 fw-bold">Overview</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row align-items-center">
          <div class="col-xl-12 col-lg-12 col-md-12 col-12">
            <!-- Bg -->
            <div
              class="pt-20 rounded-top"
              style="
                background: url(../../assets/images/background/profile-cover.jpg)
                  no-repeat;
                background-size: cover;
              "
            ></div>
            <div class="bg-white rounded-bottom smooth-shadow-sm">
              <div
                class="
                  d-flex
                  align-items-center
                  justify-content-between
                  pt-4
                  pb-6
                  px-4
                "
              >
                <div class="d-flex align-items-center">
                  <!-- avatar -->
                  <div
                    class="
                      avatar-xxl avatar-indicators avatar-online
                      me-2
                      position-relative
                      d-flex
                      justify-content-end
                      align-items-end
                      mt-n10
                    "
                  >
                  <div>

                    <img v-if="picture_path!=null"
                      :src="profile_picture"
                      class="
                        avatar-xxl
                        rounded-circle
                        border border-4 border-white-color-40
                      "
                      alt=""
                    />
                    <img v-else-if="picture_path==null" src="../../assets/images/avatar/Avatar.png"
                      class="
                        avatar-xxl
                        rounded-circle
                        border border-4 border-white-color-40
                      "
                      alt=""
                    />

                  </div>
                    <a
                      href="#!"
                      class="position-absolute top-0 right-0 me-2"
                      data-bs-toggle="tooltip"
                      data-placement="top"
                      title=""
                      data-original-title="Verified"
                    >
                      <img
                        src="../../assets/images/svg/checked-mark.svg"
                        alt=""
                        height="30"
                        width="30"
                      />
                    </a>
                  </div>
                  <!-- text -->
                  
                  <div class="lh-1">
                    <h2 class="mb-0">
                      {{ whoaminow.lastName }} {{ whoaminow.firstName }}
                      <a
                        href="#!"
                        class="text-decoration-none"
                        data-bs-toggle="tooltip"
                        data-placement="top"
                        title=""
                        data-original-title="Beginner"
                      >
                      </a>
                    </h2>
                    <p class="mb-0 d-block text-uppercase"><i class="bi bi-envelope"></i> {{ username }}</p>
                  </div>
                </div>
                <div>
                  <a href="/MyProfileSettings" class="btn btn-outline-primary d-none d-md-block"
                    >Edit Profile</a
                  >
                </div>
              </div>
              <!-- nav -->
              <ul class="nav nav-lt-tab px-4" id="pills-tab" role="tablist">
                <li class="nav-item">
                  <a class="nav-link active" href="#">Overview</a>
                </li>

              </ul>
            </div>
          </div>
        </div>
        <!-- content -->
        <div class="py-6">
          <!-- row -->
          <div class="row">
            <div class="col-xl-6 col-lg-12 col-md-12 col-12 mb-6">
              <!-- card -->
              <div class="card">
                <!-- card body -->
                <div class="card-body">
                  <!-- card title -->
                  <h4 class="card-title mb-4">About Me</h4>
                  <span class="text-uppercase fw-medium text-dark fs-5 ls-2"
                    >Bio</span
                  >
                  <!-- text -->
                  <p class="mt-2 mb-6">
                   
                  </p>
                  <!-- row -->
                  <div class="row">
                    <div class="col-12 mb-5">
                      <!-- text -->
                      <h6 class="text-uppercase fs-5 ls-2">Position & Departement</h6>
                      <p class="mb-0"></p>
                    </div>
                    <div class="col-6 mb-5">
                      <h6 class="text-uppercase fs-5 ls-2"><i class="bi bi-phone"></i>Phone</h6>
                      <p class="mb-0">+216 {{whoaminow.phone}}</p>
                    </div>
                    <div class="col-6 mb-5">
                      <h6 class="text-uppercase fs-5 ls-2"><i class="bi bi-currency-dollar"></i>Salary</h6>
                      <p class="mb-0">{{whoaminow.salary}} TND</p>
                    </div>
                    <div class="col-6">
                      <h6 class="text-uppercase fs-5 ls-2"><i class="bi bi-envelope"></i> E-mail</h6>
                      <p class="mb-0">{{whoaminow.emailId}}</p>
                    </div>
                    <div class="col-6">
                      <h6 class="text-uppercase fs-5 ls-2"><i class="bi bi-geo-alt"></i>Adresse Location</h6>
                      <p class="mb-0">{{whoaminow.location}}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-xl-6 col-lg-12 col-md-12 col-12 mb-6" v-if="role=='ROLE_EMPL' || role=='ROLE_CHEF'">
              <!-- card -->
              <div class="card">
                <!-- card body -->
                <div class="card-body">
                  <!-- card title -->
                  <h4 class="card-title mb-4">Projects Contributions</h4>
                  <div
                    class="
                      d-md-flex
                      justify-content-between
                      align-items-center
                      mb-4
                    " v-for="Project in MyProjects" v-bind:key="Project.id"
                  >
                    <div class="d-flex align-items-center" >
                      <div>
                        <div class="icon-shape icon-lg border p-4 rounded-1">
                          <img
                            src="../../assets/images/brand/slack-logo.svg"
                            alt=""
                          />
                        </div>
                      </div>
                      <!-- text -->
                      <div class="ms-3">
                        <h5 class="mb-1">
                          <a href="#" class="text-inherit"
                            >{{Project.project.project_name}}</a
                          >
                        </h5>
                        <p class="mb-0 fs-5 text-muted">
                          Project description and details about...
                        </p>
                      </div>
                    </div>
                   
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
import AuthService from "../../service/Login/Login";
import ProjectService from "../../service/Project/ProjectService";
import ProfileService from "../../service/Profile/Profile"
export default {
  name: "MyProfile",
  components: { NavBar, SideBar },
  data() {
    return {
      whoaminow: {},
      username: "",
      profile_picture:"../../assets/user-photos/",
      MyProjects:[],
      image: null,
      picture_path:"",
      role:""

    };
  },
  methods: {
    onFileChange(event) {
      let file = event.target.files[0]
      this.image = new FormData();
      this.image.append("image", file);
      ProfileService.ChangeProfilePicture(this.image).then(response=>{
        console.log(response.data);
        this.picture_path = response.data.profile_picture;
        this.whoami();
      })
    },
    
    whoami() {
      AuthService.whomai().then((response) => {
        
        console.log(this.profile_picture);
        this.username = response.data.username;
        this.roles = response.data.roles;
        this.profile_picture +=response.data.id+"/"+ response.data.profile_picture;
        this.picture_path = response.data.profile_picture;
        if (response.data.employee == null)
          this.whoaminow = response.data.clients;
        else this.whoaminow = response.data.employee;
      
      });
    },
    getMyProjects(){
        ProjectService.getMyProjects().then(response=>{
          this.MyProjects=response.data;
          console.log(this.MyProjects)
        })
    }
  },
  created() {
    this.whoami();
    this.getMyProjects();
    this.role = localStorage.getItem('roles').replaceAll('"',"");
    
  },
};
</script>