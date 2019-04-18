<template>
    <div class="container">

        <!-- login -->
        <Login 
            v-on:transmit-token="getUsers" 
            ref="getRequest"
        ></Login>
        <!-- end login -->

        <div class="listHouse"
            v-if="isConnected"
        >
            <h2>Colocataires</h2>

            <!-- ajout user ------ not working -->
            <AddUser
                v-on:create-user="updateList" 
            >
            </AddUser>
            <!-- end ajout user -->

            <!-- liste -->
            <table class="listHouse__table">
                <tr class="listHouse__table__head">
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
        
    </div>
</template>

<script>
import Login from './Login'
import OneRow from './OneRow'
import AddHouse from './AddHouse'

export default {
    name: 'listHouse',
    components: {
        Login,
        AddHouse,
        OneRow
    },
    data() {
        return {
            houses : [], // array of objects
            isConnected: false
        }
    },
    methods: {
        getHouses(items, token){
            console.log(status)
            this.houses = items
            this.token = token
            this.isConnected = true
        },
        updateList(id) {
            this.refGetAllUsers()
            if (document.querySelectorAll('.listHouse__add__form input').value !== '') {
                this.updateForm()
            }
        },
        refGetAllHouses() {
            this.$refs.getRequest.getAllHouses() // ref to Login
        },
        updateForm(input) {
            document.querySelectorAll('.listHouse__add__form input').forEach(function(input) {
                input.value = ''
            })
        }
    }
}
</script>


