<!--USERS-->
<template>
    <div class="container">
        <div class="listItems">
            <Navigation></Navigation>
            
            <div class="listItems__actions">

                <!-- <SearchBar 
                    v-bind:users="users"
                    v-on:filter-users="filteredUsersResults"
                ></SearchBar> -->
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
                </div><!-- end search  -->
               
               <!-- add user -->
                <span 
                    class="listItems__actions-addButton"
                    v-if="isCreating === false"
                    v-on:click="createForm"
                >Add User</span>
            </div>

            <!-- liste -->
            <table class="listItems__table users">
                <tr class="listItems__table__head">
                    <th>#</th>
                    <th>Firstname</th>
                    <th>Lastname</th>
                    <th>Mail</th>
                    <th>House</th>
                    <th>Actions</th>
                </tr>
                
                <UserOneRow
                    v-for="user in filteredUsers"
                    v-bind:key="user.id"
                    :user="user"
                ></UserOneRow>

                <!-- une ligne -->
                <!-- with composant : <UserOneRow
                    v-for="user in filteredUsersResults" 
                    v-bind:key="user.id"
                    :user="user"
                ></UserOneRow> -->
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
import Navigation from './Navigation'
// import SearchBar from './SearchBar'
import UserOneRow from './UserOneRow'
import UserAdd from './UserAdd'

export default {
    name: 'usersList',
    components: {
        Login,
        Navigation,
        // SearchBar,
        UserAdd,
        UserOneRow
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
                this.users = response.data.data.users
                console.log(this.users)

                // pourquoi ne fonctionne pas avec !user.house ??? 
                this.users.forEach(user => {
                    if (user.house !== null) {
                        user.house = user.house.name
                    } else {
                        user.house = 'oooo'
                    }
                });
            })
            .catch(err => {
                console.log(err)
            })
        },
        createForm() {
            console.log('ty go');
            this.$router.push({ path: 'users/create' })
        }
        // component Searchbar
        // filteredUsersResults(results) {
        //     console.log('mes results :', results)
        //     this.users = results;
        // }
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


