<template>
    <div class="listUsers">

        <!-- login -->
        <Login 
            v-on:transmit-token="getUsers" 
            v-bind:users="users"
            ref="getRequest"
        ></Login>
        <!-- end login -->

        <h2>Colocataires</h2>

        <!-- ajout user -->
        <AddUser></AddUser>
        <!-- end ajout user -->

        <!-- liste -->
        <table class="listUsers__table">
            <tr class="listUsers__table__head">
                <th>#</th>
                <th>Prénom</th>
                <th>Nom</th>
                <th>Mail</th>
                <th>Actions</th>
            </tr>
            <OneRow
                v-for="(user, index) in users"
                v-bind:key="user.id"
                v-on:delete-user-suite="updateList(user.id)"
                :user="user"
                :token="token"
            >
            </OneRow>
        </table>
        <!-- end liste -->
    </div>
</template>

<script>
import Login from './Login'
import OneRow from './OneRow'
import AddUser from './AddUser'
import ButtonUser from './ButtonUser'

export default {
    name: 'listUsers',
    components: {
        Login,
        AddUser,
        OneRow
    },
    data() {
        return {
            users : []
        }
    },
    methods: {
        getUsers(items, token){
            this.users = items
            this.token = token
        },
        updateList(id) {
            this.users = this.users.filter(user => {
                user.id !== id
            })
            this.refGetAllUsers()
        },
        refGetAllUsers() {
            this.$refs.getRequest.getAllUsers()
        },
        updateForm(input) {
            document.querySelectorAll('.listUsers__add__form input').forEach(function(input) {
                input.value = ''
            })
        }
    }
}
</script>


