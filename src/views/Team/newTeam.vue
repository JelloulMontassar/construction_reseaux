<template>
  <div id="db-wrapper">
    <SideBar></SideBar>
    <!-- Page content -->
    <div id="page-content">
      <NavBar></NavBar>
      <div class="bg-primary pt-10 pb-21"></div>
      <div class="container mt-n22 px-6">
        <div id="validation" class="mb-4">
          <h2 class="mb-0 fw-bold text-white">Create a new Team</h2>
        </div>
        <div class="row justify-content-md-center">
          <div class="col-xl-6">
            <!-- Card -->
            <div class="card" style="width: 25rem">
              <img
                class="card-img-top"
                src=" https://cdn.dribbble.com/users/1040983/screenshots/14574381/media/ed68c727412d5be6794d19967f2bf5f8.png?compress=1&resize=400x300"
                alt="Card image cap"
              />
              <ul
                class="nav nav-line-bottom"
                id="pills-tab-validation"
                role="tablist"
              ></ul>
              <!-- Tab content -->
              <div class="tab-content p-4" id="pills-tabContent-validation">
                <div
                  class="tab-pane tab-example-design fade show active"
                  id="pills-validation-design"
                  role="tabpanel"
                  aria-labelledby="pills-validation-design-tab"
                >
                  <form class="row g-3 needs-validation" @submit="checkForm">
                    <div class="col-12">
                      <div class="alert alert-danger" v-if="errors.length">
                        <b>Please correct the following error(s):</b>
                        <ul>
                          <li v-for="error in errors" v-bind:key="error">
                            {{ error }}
                          </li>
                        </ul>
                      </div>
                      <div class="form-floating mb-3">
                        <input
                          type="text"
                          class="form-control"
                          id="floatingInput"
                          placeholder="Team Name"
                          v-model="team_name"
                        />
                        <label for="floatingInput">Team Name</label>
                      </div>
                      <div class="form-floating">
                        <input
                          type="number"
                          class="form-control"
                          placeholder="Number of Employees"
                          v-model="nbEmployee"
                          min="3"
                        />
                        <label for="floatingPassword"
                          >Number of Employees</label
                        >
                      </div>
                    </div>
                    <button class="btn btn-primary float-left" type="submit">
                      Create Team
                    </button>
                  </form>
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
import TeamService from "../../service/Team/Team";
export default {
  name: "newTeam",
  components: { NavBar, SideBar },
  data() {
    return {
      team_name: null,
      nbEmployee: null,
      errors: [],
    };
  },
  methods: {
    checkForm: function (e) {
      if (this.team_name && this.nbEmployee) {
        const newTeam = {
          team_name: this.team_name,
          nbEmployee: this.nbEmployee,
        };
        TeamService.createTeam(newTeam)
          .then((response) => {
            if (response.status) {
              this.$toast.success("Your team has been added successfully ", {
                position: "top",
              });
            }
          })
          .catch((error) => {
            this.errors.push(error.response.data.message);
            this.$toast.error(error.response.data.message, {
              position: "top",
            });
          });
      }

      this.errors = [];

      if (!this.team_name) {
        this.errors.push("Team Name required.");
      }
      if (!this.nbEmployee) {
        this.errors.push("Number of employees required.");
      }

      e.preventDefault();
    },
  },
};
</script>
<style scoped>
.wrapScroll {
  white-space: nowrap;
  overflow-y: auto;
  border: 1px solid orange;
}
</style>

