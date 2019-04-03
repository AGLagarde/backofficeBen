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
            <div class="popin__editable" 
                v-if="isEditable" 
            >
                <img 
                    src="../assets/cross-icon.png" 
                    alt="close popin" 
                    class="popin__editable-close"
                    v-if="isEditable"
                    v-on:click="isActive = false"
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
            </div>
            

            <div 
                class="popin__removable"
                v-else-if="isEditable === false"
            >
                <div class="popin__removable__step1"
                    v-if="deletedItem === false">
                    <span class="popin__removable__step1-question">Êtes vous sûr de vouloir supprimer définitivement l'utilisateur n°{{user.id}}: {{user.firstname + ' ' + user.lastname}} ?</span>
                    <a 
                        href="#" class="popin__removable__step1-answer answer-validation" 
                        v-on:click.prevent="deletedItem = true"
                    >Yes</a>
                    <a 
                        href="#" class="popin__removable__step1-answer answer-cancelation"
                        v-on:click="closePopin"
                    >No</a>
                </div>
                
                <div class="popin__removable__step2"
                    v-if="deletedItem">
                    <div class="popin__removable__step2-validation">La suppression est effective</div>
                    <a v-on:click.prevent="deleteUser(user.id)">OK</a>
                </div>
                
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
            deletedItem: false,
            currentUser: {     
                id: '',
                firstName: '',
                lastName: '', 
                email: ''
            } 
        }
    },
    methods: {
        // POPIN BEHAVIOR
        toEdit() {
            this.isActive = true
            this.isEditable = true
        },
        closePopin() {
            this.isActive = false
            this.isEditable = false
        },

        // API : PUT MODIFICATION REQUEST
        updateUser(id) {
            this.currentUser.id = id
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
                this.$emit('modified-user', response.data.data.user); 
            }).catch(error => {
                console.log(error);
            });
        },

        // API : DELETE REQUEST
        deleteUser(id) {
            // -- fake delete -- 
            this.$emit('delete-user', id); 
            
            // -- vrai delete -- 
            // axios({
            //     method: 'DELETE',
            //     url: 'http://ulysse.idequanet.com/ben/web/api/user/delete/' + id,
            //     headers: {
            //         'Access-Control-Allow-Origin': '*',
            //         Authorization: `BEARER ${this.token}`
            //     },
            // }).then(response => {
            //     this.$emit('delete-user', id)
            //     this.deletedItem = true
            // }).catch(error => {
            //     console.log(error);
            // });
        }
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