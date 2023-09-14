<template>
  <div class="header @@classList">
    <!-- navbar -->
    <nav class="navbar-classic navbar navbar-expand-lg">
      <a id="nav-toggle" href="#"
        ><i data-feather="menu" class="nav-icon me-2 icon-xs bi-list"></i
      ></a>
      <div class="ms-lg-3 d-none d-md-none d-lg-block">
        <!-- Form -->
      </div>
      <!--Navbar nav -->
      <ul class="navbar-nav navbar-right-wrap ms-auto d-flex nav-top-wrap">
        <li class="dropdown stopevent">
          <a
            class="
              btn btn-light btn-icon
              rounded-circle
              indicator indicator-primary
              text-muted
            "
            href="#"
            role="button"
            id="dropdownNotification"
            data-bs-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <i class="icon-xs bi-bell" data-feather="bell"></i>
          </a>
          <div
            class="dropdown-menu dropdown-menu-lg dropdown-menu-end"
            aria-labelledby="dropdownNotification"
          >
            <div class="">
              <div
                class="
                  border-bottom
                  px-3
                  pt-2
                  pb-3
                  d-flex
                  justify-content-between
                  align-items-center
                "
              >
                <p class="mb-0 text-dark fw-medium fs-4">Notifications</p>
                <a href="/MyProfileSettings#Notifications" class="text-muted">
                  <span>
                    <i class="me-1 icon-xxs" data-feather="settings"></i>
                  </span>
                </a>
              </div>
              <!-- List group -->
              <ul class="list-group list-group-flush notification-list-scroll">
                <!-- List group item -->
                <li class="list-group-item bg-light">
                  <a href="#" class="text-muted">
                    <h5 class="fw-bold mb-1">
                      You don't have notifications now
                    </h5>
                    <p class="mb-0"></p>
                  </a>
                </li>
                <!-- List group item -->

                <!-- List group item -->

                <!-- List group item -->
              </ul>
              <div class="border-top px-3 py-2 text-center">
                <a href="#" class="text-inherit fw-semi-bold">
                  View all Notifications
                </a>
              </div>
            </div>
          </div>
        </li>
        <!-- List -->
        <li class="dropdown ms-2">
          <a
            class="rounded-circle"
            href="#"
            role="button"
            id="dropdownUser"
            data-bs-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <div class="avatar avatar-md avatar-indicators avatar-online">
              <img
                v-if="picture_path != null"
                alt="avatar"
                :src="profile_picture"
                class="rounded-circle"
              />
              <img
                v-else-if="picture_path == null"
                alt="avatar"
                src="../assets/images/avatar/Avatar.png"
                class="rounded-circle"
              />
            </div>
          </a>
          <div
            class="dropdown-menu dropdown-menu-end"
            aria-labelledby="dropdownUser"
          >
            <ul class="list-unstyled">
              <li>
                <a class="dropdown-item" href="/MyProfile">
                  <i
                    class="me-2 icon-xxs dropdown-item-icon"
                    data-feather="user"
                  ></i
                  >View my profile
                </a>
              </li>

              <li>
                <a class="dropdown-item" href="/MyProfileSettings">
                  <i
                    class="me-2 icon-xxs dropdown-item-icon"
                    data-feather="settings"
                  ></i
                  >Account Settings
                </a>
              </li>
              <li>
                <button class="dropdown-item" @click="logOut">
                  <i
                    class="me-2 icon-xxs dropdown-item-icon"
                    data-feather="log-out"
                  ></i
                  >Sign Out
                </button>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import AuthService from "../service/Login/Login";
export default {
  name: "NavBar",
  data() {
    return {
      whoaminow: {},
      profile_picture: "../../assets/user-photos/",
      picture_path: "",
    };
  },
  methods: {
    logOut() {
      AuthService.logout();
      this.$toast.success("You have logged out succesfully.", {
        position: "top",
      });
      this.$router.push("/Authentication");
    },
    async whoami() {
      AuthService.whomai().then((response) => {
        
        this.profile_picture +=
          response.data.id + "/" + response.data.profile_picture;
        this.picture_path = response.data.profile_picture;
        console.log(this.picture_path);
        if (response.data.employee == null)
          this.whoaminow = response.data.clients;
        else this.whoaminow = response.data.employee;
      });
    },
  },
  created() {
    
    setTimeout(function () {
      location = "";
    }, localStorage.getItem("LogoutAt") );
    this.whoami();
  },
};
</script>
