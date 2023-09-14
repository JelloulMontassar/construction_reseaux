<template>
    <div class="container d-flex flex-column">
    <div class="row align-items-center justify-content-center g-0
        min-vh-100">
      <div class="col-12 col-md-8 col-lg-6 col-xxl-4 py-8 py-xl-0">
        <!-- Card -->
        <div class="card smooth-shadow-md">
          <!-- Card body -->
          <div class="card-body p-6">
            <div class="mb-4">
              <a href="../index.html"><div>
            <img src="../../assets/images/svg/logo.png" class="card-img-top" alt="...">
          </div></a>
          <br>
          <br>
          <br>
              <p class="mb-6">Don't worry, we'll send you an email to reset your password.
              </p>
            </div>
            <!-- Form -->
            <form>
              <!-- Email -->
              <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <input v-model="emailID" type="email" id="email" class="form-control" name="email" placeholder="Enter Your Email" required="">
              </div>
              <!-- Button -->
              <div class="mb-3 d-grid">
                <button  class="btn btn-primary" @click="resetPassword()" type="button">
                    Reset Password
                  </button>
              </div>
              <span>You have an account? <a href="/Authentication">sign in</a></span>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ForgotPassword from '../../service/Login/ForgotPassword'
export default {
    name : "ForgotPassword",
    data(){
        
    }
    ,
    methods: {
    resetPassword(){
        
        ForgotPassword.resetPassword(this.emailID).then(response=>{
          if (response.status){
              this.$toast.success('Check your email for the activation code.', {
              position: 'top'})
              this.$router.push('/CForgotPassword');
          }
        }).catch((error)=>{
            this.$toast.error(error.response.data.message, {
            position: 'top'})
        });
        

    }
    }
}
</script>