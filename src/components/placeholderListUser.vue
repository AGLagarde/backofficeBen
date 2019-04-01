<template>
  <div class="listUsers">
    <h2>{{ title }}</h2>
    <table class="listUsers__table"> 
      <tr class="listUsers__table__head">
        <th>#</th>
        <th>Name</th> 
        <th>Username</th>
        <th>Mail</th>
        <th>Actions</th>
      </tr>
      <SecondOneRow 
        v-for="(user, index) in users" 
        v-bind:key="user.id"
        v-bind:user="user"
      >
      </SecondOneRow>
    </table>

    <!-- cf modele backoffice : https://vuejsexamples.com/basic-vuejs-data-table/ -->
    <button v-on:click="createUser">Create User</button>
  </div>
  
</template>

<script>
import {HTTP} from '../http-constant'
import axios from 'axios'


export default {
  name: 'listUsers',
  data() {
    return {
      title: 'JSON Placeholder',
      msgAction: 'Editer',
      users: []
    }
  },
   // lifecycle hooks to GET all users in API
  created: function() {
    axios({
      method: 'get',
      url: 'https://jsonplaceholder.typicode.com/users',
    })
    .then(response => {
        this.users = response.data
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
        //   console.log(users.id)
        //   console.log('entry id')
        //   users.id !== entry.id 
        // })
        // console.log(this.users)
      }, 

      createUser: function() {
        console.log('this.users vaut: ')
        console.log(this.users) 
        axios({
          method: 'post',
          url: 'https://jsonplaceholder.typicode.com/users', 
          data: {
            name: 'Helloooo',
            username: 'Here'
          },
          headers: {
            "Content-type": "application/json; charset=UTF-8"
          }
        })
        .then((response) => {
          console.log(response.data);
          console.log('this.users - au moment promesse - vaut: ')
          this.users.push(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
      }
    
  }
}
</script>


