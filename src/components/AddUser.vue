<template>
    <div class="addItem popin">
        <!-- <img src="../assets/cross-icon.png" alt="close popin" v-on:click="isCreating = false"> -->
        <!--<img src="../assets/cross-icon.png" alt="close popin" v-on:click="isCreated = false">-->
        <form action="" class="addItem__form">
            <input type="text" class="addItem__form-input" placeholder="Firstname" v-model:value="newUser.firstname">
            <input type="text" class="addItem__form-input" placeholder="Lastname" v-model:value="newUser.lastname">
            <input type="email" class="addItem__form-input" placeholder="Email" v-model:value="newUser.email">
            <input type="password" class="addItem__form-input" placeholder="Password" v-model:value="newUser.password">
            <span v-on:click="goback">Annuler</span>
            <button v-on:click="createUser">Créer</button>
        </form>
    </div>
</template>

<script>
import store from '../store/index'
import axios from 'axios'

export default {
    name: 'AddUser',
    props: {
        user: Object
    }, 
    data() {
        return {
            token: store.token,
            users : [],
            newUser: {
                firstname: '',
                lastname: '',
                email: '',
                password: ''
            }
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
                        password : this.newUser.password
                    }
                },
                headers: {
                    "Access-Control-Allow-Origin": "*"
                },
            }).then(response => {
                this.users.push(response.data.data.user)
                console.log(response.data)
                this.goback()
            }).catch(error => {
                console.log(error)
            });
        },
        goback() {
            console.log('go back')
            this.updateForm();
            this.$router.push({ path: '/users' })
        },
        updateForm(input) {
            document.querySelectorAll('.listUsers__add__form input').forEach(function(input) {
                input.value = ''
            })
        }
    }
}
</script>
