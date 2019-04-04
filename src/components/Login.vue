<template>
    <div class="login">
        <!-- admin@hetic.net / admin -->
        <!-- DYNAMIQUE -->
        <!-- <input type="email" placeholder="email" v-model:value="connexion.email">
        <input type="password" placeholder="mot de passe" v-model:value="connexion.password">
        <button v-on:click.prevent="login(connexion.email, connexion.password)">ME CONNECTER</button> -->

        <!-- EN DUR  -->
        <input type="email" placeholder="email" value="admin@hetic.net">
        <input type="password" placeholder="mot de passe" value="admin">
        <button v-on:click.prevent="login('admin@hetic.net', 'admin')">ME CONNECTER</button>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name:'Login',
    props: {
        token: String
    }, 
    data() {
        return {
            getUsers: [],
            generatedToken: '',
            connexion: {
                email: '',
                password: ''
            }
        }
    }, 
    methods: {
        // API: IDENTIFICATION LOGIN
        login(email, pwd) {
            axios({
                method: 'post',
                url: 'http://ulysse.idequanet.com/ben/web/api/user/login',
                data: {
                    user: {
                        email: email,
                        password: pwd
                    }
                },
                headers: {
                    "Access-Control-Allow-Origin": "*"
                },
            }).then(response => {
                console.log('Authenticated');
                this.generatedToken = response.data.data.token
                console.log(this.generatedToken)
                this.getAllUsers()
            }).catch(error => {
                console.log(error);
            });
        },

        // API: GET request
        getAllUsers() {
            axios({
                method: 'get',
                url: 'http://ulysse.idequanet.com/ben/web/api/users',
                headers: {
                    Authorization: `BEARER ${this.generatedToken}`
                }
            })
            .then(response => {
                console.log(response.data)
                this.getUsers = response.data.data.users
                // transmission parent ListUser
                this.$emit('transmit-token', this.getUsers, this.generatedToken)
            })
            .catch(err => {
                console.log(err)
            })
        }
    }
}
</script>

