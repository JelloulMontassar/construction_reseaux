<template>
  <div class="container d-flex flex-column">
    <div class="row align-items-center justify-content-center g-0 min-vh-100">
      <div class="col-12 col-md-8 col-lg-6 col-xxl-4 py-8 py-xl-0">
        <!-- Card -->
        <div class="card">
          <!-- Card body -->
          <div class="card-body p-6">
            <div>
              <img
                src="../../assets/images/svg/logo.png"
                class="card-img-top"
                alt="..."
              />
            </div>
            <!-- Form -->
            <br />
            <br />
            <form>
              <!-- Username -->
              <div class="mb-6">
                <label for="email" class="form-label">Username or email</label>
                <input
                  type="email"
                  class="form-control"
                  name="email"
                  placeholder="Email address here"
                  required=""
                  v-model="username"
                />
              </div>
              <!-- Password -->
              <div class="mb-3">
                <label for="password" class="form-label">Password</label>
                <input
                  type="password"
                  class="form-control"
                  name="password"
                  placeholder="**************"
                  required=""
                  v-model="password"
                />
              </div>
              <!-- Checkbox -->
              <div
                class="
                  d-lg-flex
                  justify-content-between
                  align-items-center
                  mb-4
                "
              >
                <div class="form-check custom-checkbox">
                  <input
                    type="checkbox"
                    class="form-check-input"
                    id="rememberme"
                    v-model="StayLoggedIn"
                    value="1"
                  />
                  <label class="form-check-label" for="rememberme"
                    >Remember me</label
                  >
                </div>
              </div>
              <div>
                <!-- Button -->
                <div class="d-grid">
                  <button
                    type="button"
                    class="btn btn-primary"
                    @click="SecureLogin()"
                  >
                    Sign in
                  </button>
                </div>

                <div class="d-md-flex justify-content-between mt-4">
                  <div>
                    <a href="/ForgotPassword" class="text-inherit fs-5"
                      >Forgot your password?</a
                    >
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>



<script>
import AuthService from "../../service/Login/Login";
export default {
  name: "SecureLogin",
  data() {
    return {
      usernamex: "",
      passwordx: "",
      StayLoggedInx: false,
    };
  },
  methods: {
    SecureLogin() {
      const login_credentials = {
        usernamex: this.username,
        passwordx: this.password,
        StayLoggedInx: this.StayLoggedIn,
      };
      AuthService.login(login_credentials).then(() => {
        this.$toast.success("You have logged in succesfully.", {
          position: "top",
        });
        if (localStorage.getItem("firstTime") == 0) {
          this.$swal({
            title: "Change your password",
            inputPlaceholder: "Enter your new password",
            inputAttributes: {
              maxlength: 10,
              minlength: 6,
            },
            input: "password",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Confirm",
            inputValidator: (value) => {
              if (!value || value.length > 10 || value.length < 6) {
                return "Enter your new password!";
              } else {
                return AuthService.ChangePassword(value).then((result) => {
                  if (result.data) {
                    this.$swal(
                      "Updated!",
                      "Your account password has been updated.",
                      "success"
                    );
                  }
                });
              }
            },
          });
        }
        this.$router.push({ path: '/home'});
      }).catch((error)=>{
        if(error.response.data.status==401){
          this.$toast.error("Bad Credentials.", {
          position: "top",
        });
        }
      });
    },
  },
};
</script>