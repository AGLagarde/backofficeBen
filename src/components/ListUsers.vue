<!--USERS-->
<template>
    <div class="container">
        <div class="listItems">
            <ul class="navigation">
                <li class="navigation__item">
                    <router-link :to="{ name: 'users'}">COLOCATAIRES</router-link>
                </li>
                <li class="navigation__item">
                    <router-link :to="{ name: 'houses'}">COLOCATION</router-link>
                </li>
                <li class="navigation__item">TÂCHES</li>
            </ul>

            <div class="listItems__actions">
                <!-- search -->
                <div class="searchbar">
                    <input 
                        type="text" 
                        placeholder="Search" 
                        maxlength= "12" 
                        class="searchbar__input"
                        v-model="search" 
                        v-on:keyup="isFiltered = true"
                    >
                    <img 
                        src="../assets/searchbar.png" 
                        alt="search button" 
                        class="searchbar__button"
                    >
                </div>
                <!-- end search  -->

                <!-- add user ------ not working -->
                <span 
                    class="listItems__actions-addButton"
                    v-if="isCreating === false"
                    v-on:click="createForm"
                >Nouvel utilisateur</span>
                <!--<AddUser-->
                <!-- end add user -->
            </div>

            <!-- liste -->
            <table class="listItems__table">
                <tr class="listItems__table__head">
                    <th>#</th>
                    <th>Prénom</th>
                    <th>Nom</th>
                    <th>Mail</th>
                    <th>Actions</th>
                </tr>
                
                <!-- une ligne -->
                <OneRowUser
                    v-for="user in filteredUsers" 
                    v-bind:key="user.id"
                    :user="user"
                ></OneRowUser>
                <!-- end une ligne -->
            </table>
            <!-- end liste -->
        </div>
    </div>
</template>

<script>
import store from '../store/index'
import axios from 'axios'
import Login from './Login'
import OneRowUser from './OneRowUser'
import AddUser from './AddUser'

export default {
    name: 'listUsers',
    components: {
        Login,
        AddUser,
        OneRowUser
    },
    data() {
        return {
            token: store.token,
            users : [],
            isCreating: false,
            search: '',
            isFiltered: true
        }
    },
    mounted() {
        if (!this.token) {
            this.$router.push({ path: 'login' })
        } else {
            this.getAllUsers()
        }
    },
    methods: {
        // API: GET request
        getAllUsers() {
            axios({
                method: 'get',
                url: 'http://ulysse.idequanet.com/ben/web/api/users',
                headers: {
                    Authorization: `BEARER ${this.token}`
                }
            })
            .then(response => {
                console.log(response.data.data)
                this.users = response.data.data.users
            })
            .catch(err => {
                console.log(err)
            })
        },
        createForm() {
            console.log('ty go');
            this.$router.push({ path: 'users/create' })
        }
    },
    computed: {
        filteredUsers() {
            return this.users.filter(user => {
                return user.firstname.toLowerCase().indexOf(this.search.toLowerCase()) > -1
            })
        }
    }
}
</script>


