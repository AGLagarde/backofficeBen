<template>
  <div class="listUsers">
    <h2>{{ title }}</h2>
    <div class="listUsers__add">
      <h4>Wanna add a new user ?</h4>
      <form action="" class="listUsers__add__form">
        <input type="text" placeholder="Firstname" v-model:value="newUser.firstname">
        <input type="text" placeholder="Lastname" v-model:value="newUser.lastname">
        <input type="email" placeholder="Email" v-model:value="newUser.email">
        <input type="password" placeholder="Password" v-model:value="newUser.password">
        <button v-on:click="createUser">Créer</button>
      </form>
    </div>
    <table class="listUsers__table"> 
      <tr class="listUsers__table__head">
        <th>#</th>
        <th>Prénom</th> 
        <th>Nom</th>
        <th>Mail</th>
        <th>Actions</th>
      </tr>
      <tr class="listUsers__table__body" 
        v-for="(user, index) in users"
        v-bind:item="user"
        v-bind:index="index"
        v-bind:key="user.id"
        >
        <th class="listUsers__table__body-entries"><input class="input-firstname" type="text" disabled="true" v-bind:value="user.id"></th> 
        <th class="listUsers__table__body-entries"><input class="input-firstname" type="text" disabled="true" v-bind:value="user.firstname" v-on:keyup.enter="editUser"></th> 
        <th class="listUsers__table__body-entries"><input class="input-name" type="text" disabled="true" v-bind:value="user.lastname" v-on:keyup.enter="editUser"></th>
        <th class="listUsers__table__body-entries"><input class="input-mail" type="text" disabled="true" v-bind:value="user.email" v-on:keyup.enter="editUser"></th>
        <th class="listUsers__table__body-actions">
          <ul>
            <button-user
                title="Editer"
                :active-button="editButton.activeState"
                :non-active-button="editButton.nonActiveState">
            </button-user>
            <li v-on:click="deleteConfirmationUser">Supprimer</li>
          </ul>
        </th>
      </tr>
    </table>

    <div class="popin">
      <div class="popin__confirm" v-if="!deletedItem">
        <p class="popin__text">Are you sure you want to delete this user from the database ?</p>
        <a href="#" class="popin__answer popin__answer-validation" v-on:click="deleteUser(user)">Yes</a>
        <a href="#" class="popin__answer popin__answer-cancelation" v-on:click="closePopin">No</a>
      </div>
      <div class="popin__validation" v-if="deletedItem">
        <img src="../assets/cross-icon.png" alt="close popin" v-on:click="closePopin">
        <p>User has been correctly deleted ! </p>
      </div> 
    </div>

    <!-- cf modele backoffice : https://vuejsexamples.com/basic-vuejs-data-table/ -->

  </div>
  
</template>

<script>
import {HTTP} from '../http-constant'
import axios from 'axios'
import ButtonUser from './ButtonUser'

export default {
  name: 'listUsers',
  components: {
    ButtonUser
  },
  data() {
    return {
      users : [],
      newUser: {
        firstname: '', 
        lastname: '',
        email: '',
        password: '',
        likes: '0'
      },
      editButton: {
        activeState: {
          backgroundColor: 'black',
          colorText:'white',
          borderColor: 'black'
        },
        nonActiveState: {
          backgroundColor:'white',
          colorText:'black',
          borderColor: 'black'
        }
      },
      title: 'Colocataires', 
      msgAction: 'Editer', 
      deletedItem : false, 
      token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE1NTI2NDI3MzIsImV4cCI6MTU1MjY1MzUzMiwicm9sZXMiOlsiUk9MRV9VU0VSIl0sImVtYWlsIjoiYW5uZS5hemF6ZHNzZGZzZGVAaGV0aWMubmV0In0.aNWVAvos3bOAK_TGj8VmgTMwZvJX8kcZrWU0Fqa9zi5K1x1YXxw2NA3jKL82Y_EXsEX0b8rEND6dUAWqDxL-BSAjG05EqQ6al9nIYfMqQTvYPMibD_bjbzspZ-_E_sWYb6IDIGccrVwGMG14HnBTfAm9awzOY2YbRnkdkW7TYOblOuLMnCH_2rEHRYZMEOGMIu2rf-nWkMteac2zfZAzrYFf9DKkdC6wf5DeXI78tLli0K-6TXzpk0RDPFVi3JN0fkXzQ795UoXPrj5NBYqwwg3qiLlMA5rV5Qz-DlcY7XgsN-mEIzpMs8zFkmytLr-UYALCdz8L1YxTG8_PfyaOQrYr1-oRhjkrsVFxSh-6qot7LFoH2vGOA6k4SWiqreCuQDbfLTGWTUaV2RodTr6lacpFympCGsdFKLDjSjA8GcJ53UH4DZe9EvkxsD-WfYmBq7iu9EYDkeTUx6_hYgjjIglLJdKS14sVJqLN7ViecWmRgESOISohCYl8u-HAGCqGBH72wDZ87JHa0MVBp3TmkF9PY4NCqvxMMCp1U_SAqjDB1Q5qqz3FBsbFhEegFj3kp6I_hiVsm4px-rynvlaVxehX4laFRgyK7AD8Nw-d-2Cw79jBxkpAjIuZVMSvt4gajQPWcSTjBB_I9ZUAxhnVM2m_o6arnjbsr5F_ZWzp9Ww'
    }
  },
  created: function() {
    axios({
      method: 'get',
      url: 'http://ulysse.idequanet.com/ben/web/api/users',
      headers: {
        Authorization: `BEARER ${this.token}`
      }
    })
      .then(response => {
        this.users = response.data.data
        console.log(this.users)
      })
      .catch(err => {
        console.log(err)
      })
  },
  methods: {
    editUser: function(event) {
      let domScope = event.target.parentNode.parentNode.parentNode;
      let inputs = domScope.querySelectorAll('.listUsers__table__body-entries input'); 

      if (!event.target.classList.contains('input-editable')) {
        event.target.classList.add('input-editable')
        this.msgAction = 'Valider'
        inputs.forEach(input => input.removeAttribute('disabled'))

      } else {
        event.target.classList.remove('input-editable')
        this.msgAction = 'Editer'
        inputs.forEach(input => input.setAttribute('disabled', 'true'))
      }
    },

    deleteUser: function(entry) {
      // this.users = this.users.filter(users => {
      //   users.id !== entry.id 
      // })
    }, 

    closePopin: function(event) {
      event.target.parentNode.parentNode.classList.remove('popin-open')
      // update popin 
      this.deletedItem = false
    },

    deleteConfirmationUser: function(event) {
      let domScope = event.target.parentNode.parentNode.parentNode;
      // popin appears
      document.querySelector('.popin').classList.add('popin-open')
    },

    createUser: function(event) {
      event.preventDefault()
      console.log(this.newUser)

      axios({
        method: 'post',
        url: 'http://ulysse.idequanet.com/ben/web/api/user/create',
        data: { 
          user : {
            firstname : this.newUser.firstname,
            lastname : this.newUser.lastname, 
            email : this.newUser.email, 
            password : this.newUser.password, 
            likes: this.newUser.likes
          } 
        },
        headers: {
          "Access-Control-Allow-Origin": "*"
        },
      }).then(response => {
          this.users.push(response.data.data.user);
      }).catch(error => {
          console.log(error);
      });
    }
    
  }
}
</script>


