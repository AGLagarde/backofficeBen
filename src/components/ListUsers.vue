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
          <button-user
            title="Editer"
            v-on:click="editUser"
            :active-button="editButton.activeState"
            :non-active-button="editButton.nonActiveState">
          </button-user>
            
          <button-user
            title="Supprimer"
            v-on:click=""
            :active-button="editButton.activeState"
            :non-active-button="editButton.nonActiveState">
          </button-user>
        </th>
      </tr>
    </table>

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
      token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE1NTM2NjI1MDYsImV4cCI6MTU1NjI1NDUwNiwicm9sZXMiOlsiUk9MRV9VU0VSIl0sImVtYWlsIjoic2RmQHNmLmZyIn0.c883wSdzUJAM3tXxI5YhZ-5MsC7rw_6StJ4JQGJEFM5SYHbfNZhrsgpYLTXofm3qlkdmxCK7N1XBvvtSn-8q4AVhpZlD_uCuEd66zLFiuKUwIL2NMTbjG6d3NasRw5nnf0UTcZUqa1INEOGWASOI5JQR6sWTNbIvTPj6ujthklAqxYUCEwGgSFV35PtYTg64aYzvFixVsQv1PMKrZmfNvRExkWVbzhLiSgfX-3HOQlFuDnPrQiLbBBySx1jrHjtjU8HIw_IZNwi8TKSxF63BJLy-9QmO3_zfiWo1RW_E6YXOUIfPiRGqKw2nxbHuJGc90fqKglx3aCgG8kufAornurm7XdPn0oOZH78vUbXBwGduwuVVtanXKjYiGE96j0KIIGQKVE78zaGgLUCZha4IxXVaP7RUpVT9LKdmE0268OegxGamtLcMVtEW5avx_1PF8T9YbmZ6pWDjrnBeSx_rNLAcae6-b65CdXamiPbs2x-kXJgdh7oaWgyYkJ0onL2QzFJg9kCgTt4qziT3DhutIFCzxDv4gQP9VfCUPd0cyd-rnC4q6u9utY81ncUkStRKNdoV8YPzOc0kKTejEs5cZBpsx2sd4J1nTuoPplesSCFLEz3rNnYw77_Y_c9nADAOEVvtipDq2ifof4KNuqy1sJm8KDDCBhNUPfs4UlgxIrs'
    }
  },
  // GET METHOD
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

    // PUT METHODE
    editUser(event) {
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

    updateUser(event) {
      event.preventDefault()
      axios({
        method: 'PUT',
        url: 'http://ulysse.idequanet.com/ben/web/api/user/edit',
        data: { 
          user : {
            id: this.newUser.id,
            firstname : this.newUser.firstname
          } 
        },
        headers: {
          "Access-Control-Allow-Origin": "*"
        },
      }).then(response => {
        console.log(response.data)
      }).catch(error => {
        console.log(error);
      });
    },

    updateForm(input) {
      document.querySelectorAll('.listUsers__add__form input').forEach(function(input) {
        input.value = ''
      })
    }, 

    // POST METHOD
    createUser(event) {
      event.preventDefault()
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
        console.log(response.data)
        this.users.push(response.data.data.user)
        //updateForm()
      }).catch(error => {
        console.log(error);
      });
    }
  }
}
</script>


