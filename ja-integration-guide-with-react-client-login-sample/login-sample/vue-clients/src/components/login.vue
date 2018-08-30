<style>
  h1 {
  }
</style>

<template>
  <div class="login">
    <div class="columns is-centered">
      <div class="column is-half">
        <div class="box">
          <div class="media-content">
            <p class="title is-2">{{message}}</p>
            <div class="content">
              <label class="label">Login Id</label>
              <input class="input" :value="loginId" placeholder="please insert your id" @input="updateLoginIdAction" /><br/>
              <label class="label">Password</label>
              <input class="input" :value="password" placeholder="please insert your password" @input="updatePasswordAction" /><br/>
              <br/>
              <a class="button is-primary is-medium" v-on:click="onClickSubmitButton(loginId, password)">{{button}}</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'
  import __ from '../utils/common'
  import Requests from '../utils/requests'

  export default {
    name : 'login',
    
    methods: {
      onClickSubmitButton(loginId, password){
        __.log('Login.onClickSubmitButton: ',loginId ,password)
        
        Requests.login(loginId, password, (isSuccess)=>{
          
          if(isSuccess) {
            // Requests.getAction()
          }
          
        })
      },
      ...mapActions('Login', [
        'updateLoginIdAction',
        'updatePasswordAction',
      ])
    },
    
    computed: mapGetters('Login', [
      'loginId',
      'password'
    ]),
    
    data() {
      return {
        message: 'Login Sample',
        button: 'submit',
      }
    }
  }
</script>
