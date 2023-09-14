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
                  <i class="bi bi-patch-plus"></i> Add New Client
                </h2>
              </div>
              <!-- Card -->
              <div class="card mb-4">
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
                    <form class="row g-3 needs-validation" @submit="AddClient">
                    <div class="alert alert-danger" v-if="errors.length">
                          <b>Please correct the following error(s):</b>
                          <ul>
                            <li v-for="error in errors" v-bind:key="error">
                              {{ error }}
                            </li>
                          </ul>
                        </div>
                      <div class="col-md-4">
                        <label for="validationCustomUsername" class="form-label"
                          >Email</label
                        >
                        <div class="input-group has-validation">
                          <span class="input-group-text" id="inputGroupPrepend"
                            >@</span
                          >
                          <input
                            type="email"
                            class="form-control"
                            v-model="emailId"
                            id="validationCustomUsername"
                            aria-describedby="inputGroupPrepend"
                            
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

                      <div class="col-md-12">
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

                      <div class="col-6">
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
                        <button class="btn btn-primary" type="submit">
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
import MazPhoneNumberInput from "maz-ui/components/MazPhoneNumberInput";
import ClientService from "../../service/Client/ClientService";

export default {
  name: "AddClient",
  components: { NavBar, SideBar, MazPhoneNumberInput },
  data() {
    return {
      firstName: "",
      lastName: "",
      emailId: "",
      homeAdresse: "",
      phone: "",
      errors: [],
    };
  },
  methods: {
    AddClient: function (e) {
    if ( this.emailId &&
        this.firstName &&
        this.lastName &&
        this.phone &&
        this.homeAdresse&&this.phone.length == 12){
      const newClient = {
        firstName: this.firstName,
        lastName: this.lastName,
        emailId: this.emailId,
        location: this.homeAdresse,
        phone: this.phone.substring(4, this.phone.length),
      };
      ClientService.addClient(newClient).then(response=>{
        if (response.status==200){
          this.$swal({
          icon: "success",
          text: "An Email has been sent to the client with login credentials",
        });
        this.$route.push({path: "/AllClients"})}
      }).catch((error) => {
        this.$swal({
          icon: "error",
          text: error.response.data.message,
        });
      })}
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
      if (!this.homeAdresse) {
        this.errors.push("Adresse required.");
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