<template>
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
</template>

<script>
import axios from 'axios'
export default {
    name: 'AddUser',
    props: {
        user: Object,
        token: String
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
        }
    }, 
    methods: {
        // POST METHOD CREATE
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
