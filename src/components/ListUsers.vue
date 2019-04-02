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
            token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE1NTQxOTI3MjcsImV4cCI6MTU1Njc4NDcyNywicm9sZXMiOlsiUk9MRV9VU0VSIl0sImVtYWlsIjoic2RmZHNAc2RmZi5mciJ9.nO9dMs7r6doWBYA8_1CFBoJ_LmeDVsaHs84SzWwZ-SFcvkazfdeuz_tVLpXPScNPLByk2aEO-l8NINWO3KwJFc0EeezeWwWqL24124ZRRuJqQKhkYsvrdQciwQFzYRpw8feCuunv2zyo4kbmMOqw7gDGa7EP2WVuT37idWeOyqrs0ZmcXjLGuO50rUg7oinnqCTl9zIWAB3FDpswN52q_vs-kBoA8G6LTxy36s1lPNyKtwt4I2MpPJuQLfEnApzJ0t0h_MCe914v8ovW7ZPKdwsTMaBki8mAzvHA5Q69Ml3TRa2wcqpSjOIorHA-RoN45jJpXEYwPE_PT5-E1eGwZamarDj4tJu1rVmhzv0o0X72iYryWiuTHgilkyh78L20E6LnKUJfU78_3EFd5sQNQHvSQ-jYcWxFK1hUjJYL4eoJz7b5WSmyNLtLJAivdhxtYmnlGty5K6ecPlcuCDwHtHwk112SxlLjPMdXkcg9KHFGZ5i-xlDvcVoHGC4XCA91vekUryNRVNhzAh0h4AaEfUbCO9jjXXjWgiKBcA1My2i_zubB8XE_zjysRrkwQ4QiDd75ZuGtbvW5-ufvZlrof22C4xsgZFcAJ9cv4fj0m5BNXQw81rq6HEiX7wltcFzVrkHMgJW_Axjkme-gU8sdg22T2UqCpLDrcOTQOl4tzxM'
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
            }).catch(error => {
                console.log(error);
            });
        }
    }
}
</script>


