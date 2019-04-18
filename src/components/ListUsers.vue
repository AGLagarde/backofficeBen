<template>
    <div 
        class="container"
    >
        <!-- login -->
        <!-- end login -->

        <div class="listUsers"
        >
            <ul class="navigation">
                <li class="navigation__item">COLOCATAIRES</li>
                <li class="navigation__item">COLOCATION</li>
                <li class="navigation__item">TÂCHES</li>
            </ul>

            <div class="listUsers__actions">
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

                <!-- ajout user ------ not working -->
                <span 
                    class="listUsers__actions-addButton"
                    v-on:click="isCreating = true"
                    v-if="isCreating === false"
                >Nouvel utilisateur</span>
                <AddUser
                    v-else
                    v-on:create-user="updateList" 
                ></AddUser>
                <!-- end ajout user -->
            </div>

            <!-- liste -->
            <table class="listUsers__table">
                <tr class="listUsers__table__head">
                    <th>#</th>
                    <th>Prénom</th>
                    <th>Nom</th>
                    <th>Mail</th>
                    <th>Actions</th>
                </tr>
                
                <!-- une ligne -->
                <!-- juste pour search -->
                <OneRow
                    v-for="user in filteredUsers" 
                    v-bind:key="user.id"
                    :user="user"
                ></OneRow>
                <!-- end juste pour search -->

                <!-- <OneRow
                    v-else
                    v-for="(user, index) in users"
                    v-bind:key="user.id"
                    v-on:delete-user-suite="updateList(user.id)"
                    :user="user"
                    :token="token"
                >
                </OneRow> -->
                <!-- end une ligne  -->

            </table>
            <!-- end liste -->
        </div>
        
    </div>
</template>

<script>
import store from '../store/index'
import axios from 'axios'
import Login from './Login'
import OneRow from './OneRow'
import AddUser from './AddUser'


export default {
    name: 'listUsers',
    components: {
        Login,
        AddUser,
        OneRow
    },
    data() {
        return {
            token: store.token,
            users : [], // array of objects
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
        // @todo 
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
                // transmission parent ListUser
            })
            .catch(err => {
                console.log(err)
            })
        },
        updateForm(input) {
            document.querySelectorAll('.listUsers__add__form input').forEach(function(input) {
                input.value = ''
            })
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


