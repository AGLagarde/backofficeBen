<template>
    <div>
        <button
            class="buttonRow"
            v-on:click="toEdit">
            Edit
        </button>
        <button
            class="buttonRow"
            v-on:click="isActive=true">
            Delete
        </button>

        <div 
            class="popin"
            v-if="isActive"
        >
        <!-- popin EDIT -->
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
                <h2 class="h2">Edit user</h2>
                <form action="" class="editForm">
                    <div>
                        <label for="firstname" class="item__form-label" >Firstname</label>
                        <input type="text" 
                        name="firstname"
                        class="item__form-input" v-model="currentUser.firstName" value="user.id">
                    </div>
                    <div>
                        <label for="lastname" class="item__form-label" >Lastname</label>
                        <input type="text" 
                        name="lastname"
                        class="item__form-input" placeholder="Lastname" v-model="currentUser.lastName">
                    </div>
                    <div>
                        <label for="email" class="item__form-label" >Email</label>
                        <input type="email" 
                        name="email" 
                        class="item__form-input" placeholder="Email" v-model="currentUser.email">
                    </div>
                    <div> <!-- house -->
                        <label for="housename" class="item__form-label" >House</label>
                        <input type="text" 
                        name="housename" readonly
                        class="item__form-input" value="user.house" v-model="currentUser.house">
                    </div>
                    <div> <!-- buttons -->
                        <input v-on:click.prevent="updateUser(user.id)" type="submit" name="action" value="OK" class="item__form-submit validate" />
                    </div>
                </form>
            </div>

        <!-- popin DELETE -->
            <div 
                class="popin__removable"
                v-else-if="isEditable === false"
            >
                <h2 class="h2">Delete user</h2>
                <div class="popin__removable__step1"
                    v-if="deletedItem === false">
                    <span class="popin__removable__step1-question">Are you sure to delete the user <strong> n°{{user.id}}: {{user.firstname + ' ' + user.lastname}} </strong>for good ?</span>
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
                    <div class="popin__removable__step2-validation">
                        <p>La suppression est effective</p>
                        <a v-on:click.prevent="deleteUser(user.id)">OK</a>
                    </div>
                    
                </div>
            </div>  
        </div> <!-- end popin -->
    </div>
</template>

<script>
import store from '../store/index'
import axios from 'axios'

export default {
    name:'user-button',
    props: {
        user: Object
    },
    data() {
        return {
            token: store.token,
            isActive: false,
            isEditable: false, 
            deletedItem: false,
            currentUser: {     
                id: this.user.id,
                firstName: this.user.firstname,
                lastName: this.user.lastname, 
                email: this.user.email,
                house: this.user.house
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
            console.log('laaaaaa: ', this.currentUser)
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
                this.$emit('modified-user', response.data.data.user) 
                this.isActive = false
            }).catch(error => {
                console.log(error)
            });
        },

        // API : DELETE REQUEST
        // @todo actualiser la liste au clic
        deleteUser(id) {
            console.log('je delete')
            // -- fake delete -- 
            // this.$emit('delete-user', id); 
            // this.isActive = false
            
            // -- vrai delete -- 
            axios({
                method: 'DELETE',
                url: 'http://ulysse.idequanet.com/ben/web/api/user/delete/' + id,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    Authorization: `BEARER ${this.token}`
                },
            }).then(response => {
                this.$emit('delete-user', id)
                this.isActive = false
            }).catch(error => {
                console.log(error)
            });
        }
    }
}

</script>

