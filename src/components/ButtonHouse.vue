<template>
    <div>
        <button
            class="buttonRow"
            v-on:click="manageHouse">
            Modifier
        </button>
        <button
            class="buttonRow"
            v-on:click="isActive = true">
            Supprimer
        </button>

        <!-- popin -->
        <div class="popin" v-if="isActive">
            <div class="popin__removable" if="isEditable === false">
                <div class="popin__removable__step1"
                    v-if="deletedItem === false">
                    <span class="popin__removable__step1-question">Êtes vous sûr de vouloir supprimer définitivement l'utilisateur n°{{house.id}}: {{house.name}} ?</span>
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
                    <a v-on:click.prevent="deleteHouse(house.id)">OK</a>
                </div>
            </div>  
        </div> <!-- end popin -->
    </div>
</template>

<script>
import store from '../store/index'
import axios from 'axios'
import ManageHouse from './ManageHouse'

export default {
    name:'button-house',
    components: {
        ManageHouse
    },
    props: {
        house: Object
    },
    data() {
        return {
            token: store.token,
            isActive: false,
            isEditable: false, 
            deletedItem: false,
            currentHouse: {
                id: this.house.id,
                name: this.house.name,
                users: this.house.users
            },
            email: ''
        }
    },
    methods: {
        toEdit() {
            this.isActive = true
            this.isEditable = true
        },
        closePopin() {
            this.isActive = false
            this.isEditable = false
        },
        sendInvitationHouse(mail) {
            console.log(email);
            axios({
                method: 'POST',
                url: 'http://ulysse.idequanet.com/ben/web/api/house/send-invitation/',
                data: {
                    email: mail
                },
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    Authorization: `BEARER ${this.token}`
                },
            }).then(response => {
                console.log(response.data)
                console.log('envoye')
                this.$emit('modified-house', response.data)
                this.isActive = false
            }).catch(error => {
                console.log(error)
            });
        },
        manageHouse() {
            console.log('laisse moi manager')
            this.$router.push({ path: 'houses/manage-house' })
        },
        // API : DELETE REQUEST
        deleteHouse(id) {
            console.log('je delete')
            console.log(this.token)
            // -- fake delete -- 
            // this.$emit('delete-user', id); 
            // this.isActive = false
            
            // -- vrai delete -- 
            axios({
                method: 'DELETE',
                url: 'http://ulysse.idequanet.com/ben/web/api/house/delete/' + id,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    Authorization: `BEARER ${this.token}`
                },
            }).then(response => {
                this.$emit('delete-house', id)
                this.isActive = false
            }).catch(error => {
                console.log(error)
            });
        }
    }
}

</script>
