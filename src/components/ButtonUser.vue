<template>

    <div>
        <button
            class="button"
            v-on:click="toEdit">
            Editer
        </button>
        <button
            class="button"
            v-on:click="isActive = true">
            Supprimer
        </button>

        <!-- popin -->
        <div 
            class="popin"
            v-if="isActive"
        >
            <img 
                class="popin__close"
                src="../assets/cross-icon.png" 
                alt="close popin" 
                v-on:click="closePopin"
            >
            <form action="" 
                class="popin__editable" 
                v-if="isEditable === true"
            >
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

            <div 
                class="popin__removable"
                v-else-if="isEditable === false"
            >
                <span class="popin__removable-question">Êtes vous sûr de vouloir supprimer définitivement cet utilisateur ?</span>
                <a href="#" class="popin__removable-answer answer-validation" v-on:click.prevent="deleteUser(user.id)">Yes</a>
                <a href="#" class="popin__removable-answer answer-cancelation">No</a>
            </div>  
        </div>
        <!-- end popin -->

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
            isEditable: false, 
            currentUser: {     
                id: '',
                firstName: '',
                lastName: '', 
                email: ''
            } 
        }
    },
    methods: {
        toEdit() {
            console.log('to edit')
            this.isActive = true
            this.isEditable = true
        },
        closePopin() {
            this.isActive = false
            this.isEditable = false
        },
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
        },
        deleteUser(id) {
            console.log(id)
            console.log(this.user)
            // axios({
            //     method: 'DELETE',
            //     url: 'http://ulysse.idequanet.com/ben/web/api/user/delete/' + id,
            //     headers: {
            //         'Access-Control-Allow-Origin': '*',
            //         Authorization: `BEARER ${this.token}`
            //     },
            // }).then(response => {
            //     console.log(response.data.data)
            //     this.$emit('delete-user', response.data.data.user); // api
            // }).catch(error => {
            //     console.log(error);
            // });
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