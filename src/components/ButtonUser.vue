<template>

    <div>
        <button
            class="button"
            v-on:click="isActive = true">
            titre
        </button>
        <div 
            class="popin"
            v-if="isActive"
        >
            <form action="">
                <!-- API -->
                <input type="text" placeholder="Firstname" v-model="currentUser.firstName">
                <input type="text" placeholder="Lastname" v-model="currentUser.lastName">
                <input type="email" placeholder="Email" v-model="currentUser.email">

                <!-- placeholder -->
                <!-- <input type="text" placeholder="First name" v-model="currentUser.firstName">
                <input type="text" placeholder="Last name" v-model="currentUser.name"> -->
                <!-- end placeholder -->
                <button v-on:click.prevent="updateUser(user.id)">Validation</button>
            </form>
            <img src="../assets/cross-icon.png" alt="close popin" v-on:click=" isActive = false ">
        </div>
    </div>

</template>

<script>
import axios from 'axios'

export default {
    name:'button-user',
    props: {
        user: Object, 
        token: String
    },
    data() {
        return {
            isActive: false,
            currentUser: {     
                id: '',
                firstName: '',
                lastName: '', 
                email: ''
            } 
        }
    },
    methods: {
        // A FAIRE : erreur actuelle: besoin de recharger la page pour voir la modif... voir cyclehook
        updateUser(id) {
            this.currentUser.id = id
            
            // API 
            axios({
                method: 'PUT',
                url: 'http://ulysse.idequanet.com/ben/web/api/user/edit/' + this.currentUser.id,
                data: { 
                    user : {
                        firstname : this.currentUser.firstName,
                        lastname : this.currentUser.lastName,
                        email : this.currentUser.email
                    }
                },
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    Authorization: `BEARER ${this.token}`
                },
            }).then(response => {
                console.log(response.data.data.user)
                this.$emit('modified-user', response.data.data.user); // api
            }).catch(error => {
                console.log(error);
            });
        }
    },
    watch: {
        // isHover() {
        //     console.log('is hover a changé')
        // }
    }
}

</script>

<style scoped lang=scss> 
@import "../scss/common/_colors.scss";

.button {
    padding: 2px 6px;
    margin: 0 10px;
    border: 1px solid; 
    border-radius: 10px;
    cursor: pointer;
}
</style>