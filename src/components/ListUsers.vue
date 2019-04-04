<template>
    <div class="listUsers">

        <!-- login -->
        <Login 
            v-on:transmit-token="getUsers" 
            ref="getRequest"
        ></Login>
        <!-- end login -->

        <h2>Colocataires</h2>

        <!-- ajout user ------ not working -->
        <AddUser
            v-on:create-user="updateList" 
        >
        </AddUser>
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
            
            <!-- une ligne -->
            <OneRow
                v-for="(user, index) in users"
                v-bind:key="user.id"
                v-on:delete-user-suite="updateList(user.id)"
                :user="user"
                :token="token"
            >
            </OneRow>
            <!-- end une ligne  -->

        </table>
        <!-- end liste -->
    </div>
</template>

<script>
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
            users : [] // array of objects
        }
    },
    methods: {
        getUsers(items, token){
            this.users = items
            this.token = token
        },
        updateList(id) {
            this.refGetAllUsers()
            if (document.querySelectorAll('.listUsers__add__form input').value !== '') {
                this.updateForm()
            }
        },
        refGetAllUsers() {
            this.$refs.getRequest.getAllUsers() // ref to Login
        },
        updateForm(input) {
            document.querySelectorAll('.listUsers__add__form input').forEach(function(input) {
                input.value = ''
            })
        }
    }
}
</script>


