<template>
    <div class="addItem">
        <form action="" class="item__form">
            <h2 class="h2">Add a user</h2>
            <div> <!-- firstname -->
                <label for="firstname" class="item__form-label" >Firstname</label>
                <input type="text" name="firstname" class="item__form-input" placeholder="Ben" v-model:value="newUser.firstname"/>
            </div>
            <div> <!-- lastname -->
                <label for="lastname" class="item__form-label" >Lastname</label>
                <input type="text" name="lastname" class="item__form-input" placeholder="L'assistant" v-model:value="newUser.lastname"/>
            </div>
            <div> <!-- email -->
                <label for="email" class="item__form-label" >Email</label>
                <input type="email" name="email" class="item__form-input" placeholder="ben_assistant@gmail.com" v-model:value="newUser.email"/>
            </div>
            <div> <!-- password -->
                <label for="password" class="item__form-label">Password</label>
                <input type="password" name="password" class="item__form-input" placeholder="Password" v-model:value="newUser.password"/>
            </div>
            <div> <!-- house -->
                <label for="housename" class="item__form-label">House</label>
                <input type="text" name="housename" class="item__form-input" placeholder="The name of your house" v-model:value="newUser.house"/>
            </div>
            <div> <!-- buttons -->
                <input v-on:click="goback" type="submit" name="action" value="Annuler" class="item__form-submit" />
                <input v-on:click="createUser" type="submit" name="action" value="Créer" class="item__form-submit validate" />
            </div>
        </form>
    </div>
</template>

<script>
import store from '../store/index'
import axios from 'axios'

export default {
    name: 'userAdd',
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
                password: '',
                house: ''
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
                        house : this.newUser.House
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
