<template>
  <div class="listUsers">
    <h2>{{ title }}</h2>
    <table class="listUsers__table"> 
      <tr class="listUsers__table__head">
        <th>#</th>
        <th>Prénom</th> 
        <th>Nom</th>
        <th>Mail</th>
        <th>Like</th>
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
        <th class="listUsers__table__body-entries"><input class="input-mail" type="text" disabled="true" v-bind:value="user.mail" v-on:keyup.enter="editUser"></th>
        <th class="listUsers__table__body-entries"><input class="input-likes" type="text" disabled="true" v-bind:value="user.likes" v-on:keyup.enter="editUser"></th>
        <th class="listUsers__table__body-actions">
          <ul>
            <li v-on:click="editUser">{{ msgAction }}</li>
            <li v-on:click="deleteConfirmationUser">Supprimer</li>
          </ul>
        </th>
      </tr>
    </table>

    <Popin/>

    <!-- cf modele backoffice : https://vuejsexamples.com/basic-vuejs-data-table/ -->
    <button v-on:click="getUser">Get Users</button>
    <button v-on:click="createUser">Create User</button>
  </div>
  
</template>

<script>
import {HTTP} from '../http-constant'
import axios from 'axios'
import Popin from './popin.vue'


export default {
  name: 'listUsers',
  components: {
    Popin
  },
  data() {
    return {
      // users : {
      //   firstname:'',
      //   lastname: '',
      //   email: '',
      //   password: ''
      // },
      users: [
        { id: 33, firstname: 'Anna', name: 'Lagarde', mail: 'allie@gmail.com', likes: 10 }, 
        { id: 44, firstname: 'Olga', name: 'Fritz', mail: 'money@gmail.com', likes: 22 },
        { id: 55, firstname: 'Tosupress', name: 'Tosupress', mail: 'Tosupress@gmail.com', likes: 0 }
      ], 
      title: 'Colocataires', 
      msgAction: 'Editer', 
      deletedItem : false
    }
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
        console.log(this.users)
        this.users = this.users.filter(users => {
          console.log(users.id)
          console.log('entry id')
          console.log('entry.id)
          users.id !== entry.id 
        })
        console.log(this.users)
      }, 

      

      // HTTP.get(...).then(...).catch(...)
        
          // http://ulysse.idequanet.com/ben/web/api/user
          // un user : repo, stars
          // travailler l'authentification token  jwt ou oAuth2
          // JSON: renvoie un objet clé:users

      // search bar 
      // https://codepen.io/AndrewThian/pen/QdeOVa

      getUser: function() {
        axios({
          method: 'get',
          url: 'http://ulysse.idequanet.com/ben/web/api/users',
          headers: {
            Authorization: "BEARER eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE1NTI1NjQyNjYsImV4cCI6MTU1MjU3NTA2Niwicm9sZXMiOlsiUk9MRV9VU0VSIl0sImVtYWlsIjoiam90ZXNzc2VAZ21haWwuY29tIn0.SO-brZ3PEHStRJo9vfllIsazTFjfbzr_IKr4RcXuFfeYaH_02Eu3k6csws6s7YcATpyWSfM7LIk7V6OjnperjadVdQTtHQBLBuKkj6v6kOn_BMiTARck-7JYLVFJCoBfv3a8VjiqkI3NGfrqzHdTv89tjs_ktX8mdcN5ljrC05gzjeBu8I2107Xg0UGLQVbqO0OyXfVHEROTv6Ws7pOPJBqD-JCwRkM0diK_2B94nGKaDBEOkWCbTSgtrnCok5KAvtVquVsEsvKv4aTUWPf_swlCkrz9FP92Dv1ilupS7KM7NYDcct8aEUMp-w0lrlH8GDtKSDSyoFrW7AqnBvdfL9yng8_kbjNUkag-C6sFRCSehAdSWZQBJuRMPDFA2r-1-xtmSsGXqAsdlOjVJ0n3ViYb6n0g_UmT14Cfx-Wp6l8kYZGR6l6yqrGxJb9hx-CD4DZOoUpJV4ksNOusQqpJah0JALMNJMx8tmnMqd9gtZ7hdttVCiYBov8C3Q-lRkEv45K6waw8M1R8c1vOrzd-j1BSb0W1yQeHZxyQS4o7qfl5rYks5gUIrKYcW0C5XkDbgNv6pvnk6yDCXndgghOq7aM-USDkPNeF3xvhbe4cm0L4lxT-Kl-Wra6DyevjDY-y1-CncsxEajpCeeLhrrzY8yYBlek9PWrdNpbYZWnt5-4"
          }
        })
          .then(response => {
            this.users = response.data
            console.log(this.users)
            console.log(this.users[0].firstname)
            console.log(this.users[0].lastname)
          })
          .catch(err => {
            console.log(err)
          })
      },

      createUser: function() {
        axios({
          method: 'post',
          url: 'http://ulysse.idequanet.com/ben/web/api/user/create',
          data: { user : {
              firstname : 'Anne',
              lastname : 'Lagarde', 
              email : 'anne.lagarde@hetic.net', 
              password : 'ben'
          } },
          headers: {
            "Access-Control-Allow-Origin": "*"
          },
        }).then(function (response) {
            console.log(response);
        }).catch(function (error) {
            console.log(error);
        });
      }
    
  }
}
</script>


