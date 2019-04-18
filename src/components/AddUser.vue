<template>
    <div class="addUser popin">
        <!-- <img src="../assets/cross-icon.png" alt="close popin" v-on:click="isCreating = false"> -->
        <img src="../assets/cross-icon.png" alt="close popin" v-on:click="isCreated = false">
        <form action="" class="addUser__form">
            <input type="text" class="addUser__form-input" placeholder="Firstname" v-model:value="newUser.firstname">
            <input type="text" class="addUser__form-input" placeholder="Lastname" v-model:value="newUser.lastname">
            <input type="email" class="addUser__form-input" placeholder="Email" v-model:value="newUser.email">
            <input type="password" class="addUser__form-input" placeholder="Password" v-model:value="newUser.password">
            <button v-on:click="createUser">Créer</button>
        </form>
    </div>
</template>

<script>
// PB pour is Creating (passé via v-else)... pas initalisé à true comme devrait l'être 
import axios from 'axios'
export default {
    name: 'AddUser',
    props: {
        user: Object,
        token: String
        // isCreating: Boolean - ne fonctionne pas
    }, 
    data() {
        return {
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
                        password : this.newUser.password,
                        likes: this.newUser.likes
                    }
                },
                headers: {
                    "Access-Control-Allow-Origin": "*"
                },
            }).then(response => {
                this.users.push(response.data.data.user)
                console.log(response.data)
                this.$emit('create-user', response.data.data.user.id)
            }).catch(error => {
                console.log(error)
            });
        }
    }
}
</script>
