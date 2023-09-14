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
              <div
                class="
                  border-bottom
                  pb-4
                  mb-4
                  d-flex
                  align-items-center
                  justify-content-between
                "
              >
                <div class="mb-2 mb-lg-0">
                  <h3 class="mb-0 fw-bold">General</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row mb-8">
          <div class="col-xl-3 col-lg-4 col-md-12 col-12">
            <div class="mb-4 mb-lg-0">
              <h4 class="mb-1">General Setting</h4>
              <p class="mb-0 fs-5 text-muted">Profile configuration settings</p>
            </div>
          </div>

          <div class="col-xl-9 col-lg-8 col-md-12 col-12">
            <!-- card -->
            <div class="card">
              <!-- card body -->
              <div class="card-body">
                <div class="mb-6">
                  <h4 class="mb-1">General Settings</h4>
                </div>
                <div class="row align-items-center mb-12">
                  <div class="col-md-3 mb-3 mb-md-0">
                    <h5 class="mb-0">Avatar</h5>
                  </div>
                  <div class="col-md-9">
                    <div class="d-flex align-items-center">
                      <div class="me-3">
                        <img
                          v-if="picture_path != null"
                          :src="profile_picture"
                          class="rounded-circle avatar avatar-lg"
                          alt=""
                        />
                        <img
                          v-else-if="picture_path == null"
                          src="../../assets/images/avatar/Avatar.png"
                          class="rounded-circle avatar avatar-lg"
                          alt=""
                        />
                      </div>
                      <div>
                        <button
                          type="submit"
                          class="btn btn-outline-white mb-0"
                        >
                          Choose ...<input
                            style="opacity: 0"
                            type="file"
                            @change="onFileChange"
                            accept="image/png, image/jpeg"
                          />
                        </button>
                        <button
                          type="submit"
                          class="btn btn-outline-white"
                          @click="deleteProfilepicture()"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- col -->

                <div>
                  <!-- border -->
                  <div class="mb-6">
                    <h4 class="mb-1">Basic information</h4>
                  </div>
                  <form @change="OnChangePers" @submit="UpdateBasicDetails">
                    <!-- row -->

                    <div class="mb-3 row">
                      <label
                        for="fullName"
                        class="col-sm-4 col-form-label form-label"
                        >Full name
                      </label>
                      <div class="col-sm-4 mb-3 mb-lg-0">
                        <input
                          name="firstName"
                          type="text"
                          class="form-control"
                          placeholder="First name"
                          v-model="state.data.firstName"
                          required
                        />
                      </div>
                      <div class="col-sm-4">
                        <input
                          name="lastName"
                          type="text"
                          class="form-control"
                          placeholder="Last name"
                          v-model="state.data.lastName"
                          required
                        />
                      </div>
                    </div>

                    <!-- row -->

                    <!-- row -->
                    <div class="mb-3 row">
                      <label
                        for="phone"
                        class="col-sm-4 col-form-label form-label"
                        >Phone <span class="text-muted"></span
                      ></label>
                      <div class="col-md-8 col-12">
                        <MazPhoneNumberInput
                          id="phone"
                          v-model="state.defaultNumber"
                          
                          :default-phone-number="state.defaultNumber"
                          name="phone"
                          show-code-on-list
                          color="info"
                          default-country-code="TN"
                          :only-countries="['TN']"
                          @update="results = $event"
                          :success="results?.isValid"
                        />
                      </div>
                    </div>
                    <!-- row -->

                    <!-- row -->
                    <div class="mb-3 row">
                      <label
                        for="addressLine"
                        class="col-sm-4 col-form-label form-label"
                        >Address line
                      </label>

                      <div class="col-md-8 col-12">
                        <input
                          name="location"
                          type="text"
                          class="form-control"
                          placeholder="Adresse"
                          v-model="state.data.location"
                          required
                        />
                      </div>
                    </div>
                    <!-- row -->

                    <!-- row -->
                    <div class="row align-items-center">
                      <div class="offset-md-4 col-md-8 mt-4">
                        <button
                          
                          class="btn btn-primary" type="submit"
                        >
                          Save Changes
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row mb-8">
          <div class="col-xl-3 col-lg-4 col-md-12 col-12">
            <div class="mb-4 mb-lg-0">
              <h4 class="mb-1">Email Setting</h4>
              <p class="mb-0 fs-5 text-muted">
                Add an email settings to profile
              </p>
            </div>
          </div>

          <div class="col-xl-9 col-lg-8 col-md-12 col-12">
            <!-- card -->
            <div class="card" id="edit">
              <!-- card body -->
              <div class="card-body">
                <div class="mb-6">
                  <h4 class="mb-1">Email</h4>
                </div>
                <!-- row -->
                <div class="mb-3 row">
                  <!-- label -->
                  <label
                    for="newEmailAddress"
                    class="col-sm-4 col-form-label form-label"
                    >New email
                  </label>
                  <div class="col-md-8 col-12">
                    <!-- input -->
                    <input
                      type="email"
                      class="form-control"
                      placeholder="Enter your email address"
                      v-model="state.data.emailId"
                      disabled
                    />
                  </div>
                  <!-- button -->
                </div>

               
              </div>
            </div>
          </div>
        </div>

       
        <div class="row">
          <div class="col-xl-3 col-lg-4 col-md-12 col-12">
            <div class="mb-4 mb-lg-0">
              <h4 class="mb-1">Delete Account</h4>
              <p class="mb-0 fs-5 text-muted"></p>
            </div>
          </div>

          <div class="col-xl-9 col-lg-8 col-md-12 col-12">
            <!-- card -->

            <div class="card mb-6">
              <!-- card body -->
              <div class="card-body">
                <div class="mb-6">
                  <h4 class="mb-1">Danger Zone</h4>
                </div>
                <div>
                  <!-- text -->
                  <p>Delete any and all content you have.</p>
                  <button class="btn btn-danger" @click="Confirm()" disabled>
                    Delete Account
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
import AuthService from "../../service/Login/Login";
import ProjectService from "../../service/Project/ProjectService";
import ProfileService from "../../service/Profile/Profile";
import { reactive } from "vue";
import MazPhoneNumberInput from "maz-ui/components/MazPhoneNumberInput";
import {useToast} from 'vue-toast-notification';

export default {
  name: "MyProfile",
  components: { NavBar, SideBar,MazPhoneNumberInput },
  setup() {
    const toast = useToast();
    
    const state = reactive({
      defaultNumber:null,
      data: {},
      
      new_password:null,
      
      employee:false
    });
    function getProfileDetails() {
      AuthService.whomai().then((response) => {
        if (response.data.employee == null) {state.data = response.data.clients;state.defaultNumber =state.data.phone.toString()}
        else {state.data = response.data.employee;state.employee=true;
        state.defaultNumber =state.data.phone.toString()
        
        }
      });
    }
    
    function changeEmailId(event) {
      state.data.emailId = event.target.value;
    }
    function OnChangePers(event) {
      if (event.target.name == "firstName") {
        state.data.firstName = event.target.value;
      }
      if (event.target.name == "lastName") {

        state.data.lastName = event.target.value;
      }
      if (event.target.name == "location") {
        state.data.location = event.target.value;
      }
      if (event.target.name == "phone") {
        console.log(event.target.value);
        state.data.phone = event.target.value;
        
        
      }
    }
    function UpdateBasicDetails(e) {

       e.preventDefault();
      if (state.employee){
      
      state.data.phone = state.data.phone.split(' ').join('');
      ProfileService.UpdateBasicDetailsEmpl(state.data).then(() => {
        toast.success("Basic information updated successfully", {
          position: "top",
        })
      });}
      else{
        state.data.phone = state.data.phone.split(' ').join('');
        ProfileService.UpdateBasicDetailsClient(state.data).then(() => {
        toast.success("Basic information updated successfully", {
          position: "top",
        })
      });
      }
     
    }
    function changeEmail() {
      ProfileService.UpdateEmail(state.data.emailId).then((response) => {
        console.log(response.data);
      });
      
    }
    getProfileDetails();
    return {
      state,
      changeEmailId,
      getProfileDetails,
      changeEmail,
      OnChangePers,
      UpdateBasicDetails
    };
  },
  data() {
    return {
      whoaminow: {},
      username: "",
      profile_picture: "../../assets/user-photos/",
      MyProjects: [],
      image: null,
      picture_path: "",
      profile: {
        firstName: "",
        lastName: "",
        phone: "",
        location: "",
        emailId: "",
      },
    };
  },
  methods: {
    onFileChange(event) {
      let file = event.target.files[0];
      this.image = new FormData();
      this.image.append("image", file);
      ProfileService.ChangeProfilePicture(this.image).then(() => {
        this.whoami();
        this.$toast.success("Profile picture updated succesfully.", {
          position: "top",
        });
        location.reload()
      });
    },
    deleteProfilepicture() {
      ProfileService.DeleteProfilePicture().then(() => {
        this.whoami();
        location.reload()
      });
    },
    async whoami() {
      AuthService.whomai().then((response) => {
        console.log(this.profile_picture);
        this.username = response.data.username;
        this.roles = response.data.roles;
        this.profile_picture +=
          response.data.id + "/" + response.data.profile_picture;
        this.picture_path = response.data.profile_picture;

        if (response.data.employee == null)
          this.whoaminow = response.data.clients;
        else this.whoaminow = response.data.employee;
      });
    },
    getMyProjects() {
      ProjectService.getProjects().then((response) => {
        this.MyProjects = response.data;
      });
    },
    Confirm() {
      this.$swal({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        inputPlaceholder: 'Enter your password to confirm',
        input: 'password',
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          this.$swal("Deleted!", "Your account has been deleted.", "success");
        }
      });
    },
  },
  created() {
    this.whoami();
    this.getMyProjects();
  },
};
</script>