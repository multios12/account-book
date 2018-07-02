<template>
  <div class="row">
  <b-card id="loginCard" header-tag="header" style="col-mb-2" class="mx-auto">
    <h6 slot="header" variant="info">
      Sign
      <!--<div style="float:right; font-size: 80%; position: relative; top:-10px"><a href="#">Forgot password?</a></div>-->
    </h6>

    <b-card-body>
      <b-alert style="display:none" id="login-alert" variant="danger" class="col-sm-12" />

      <form id="loginform" class="form-horizontal" role="form">
        <div style="margin-bottom: 25px" class="input-group">
          <span class="input-group-addon">
            <i class="glyphicon glyphicon-user"></i>
          </span>
          <input id="login-username" type="text" class="form-control" name="username" value="" placeholder="username">
        </div>

        <div style="margin-bottom: 25px" class="input-group">
          <span class="input-group-addon">
            <i class="glyphicon glyphicon-lock"></i>
          </span>
          <input id="login-password" type="password" class="form-control" name="password" placeholder="password">
        </div>

        <div class="input-group">
          <div class="checkbox">
            <label>
              <input id="login-remember" type="checkbox" name="remember" value="1"> Remember me
            </label>
          </div>
        </div>

        <div style="margin-top:10px" class="form-group">
          <!-- Button -->

          <div class="col-sm-12 controls">
            <a id="btn-login" href="#" class="btn btn-success">Login </a>
            <a id="btn-fblogin" href="#" class="btn btn-primary">Login with Google</a>
          </div>
        </div>

        <b-form-group>
          <div class="col-md-12 control">
            <div style="border-top: 1px solid#888; padding-top:15px; font-size:85%">
              Don't have an account!
              <a href="#" onClick="$('#loginbox').hide(); $('#signupbox').show()">
                Sign Up Here
              </a>
            </div>
          </div>
        </b-form-group>
      </form>
    </b-card-body>
  </b-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  
})
</script>


<style>
</style>
