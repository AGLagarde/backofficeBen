<template>
  <div class="listUsers">
      <h2>Colocataires</h2>

      <!--ajout user-->
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

      <!--affichage liste-->
      <table class="listUsers__table">
          <tr class="listUsers__table__head">
              <th>#</th>
              <th>Prénom</th>
              <th>Nom</th>
              <th>Mail</th>
              <th>Actions</th>
          </tr>
          <SecondOneRow
            v-for="(user, index) in users"
            v-bind:key="user.id"
            :user="user"
            :token="token"
          >
          </SecondOneRow>
      </table>
  </div>
</template>

<script>
import axios from 'axios'
import ButtonUser from './ButtonUser'
import SecondOneRow from './SecondOneRow'

export default {
    name: 'listUsers',
    components: {
        SecondOneRow
    },
    data() {
          return {
              users : [],
              newUser: {
                  firstname: '',
                  lastname: '',
                  email: '',
                  password: ''
              },
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
            this.users = response.data.data;
            console.log(this.users);
            console.log(this.token)
        })
        .catch(err => {
            console.log(err);
        })
    },
    methods: {
        updateForm(input) {
            document.querySelectorAll('.listUsers__add__form input').forEach(function(input) {
                input.value = ''
            })
        },
        // POST METHOD
        createUser(event) {
            event.preventDefault();
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
                console.log(response.data);
                this.users.push(response.data.data.user);
                //updateForm()
            }).catch(error => {
                console.log(error);
            });
        }
    }
}
</script>


