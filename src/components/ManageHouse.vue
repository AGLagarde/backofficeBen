<template>
    <div>
        <!-- popin -->
        <div class="popin">
            <div class="popin__editable">
                <img src="../assets/cross-icon.png" alt="close popin" class="popin__editable-close" v-on:click="goBack">
                <p>HELLOOOOO</p>
                <!--<form action="">-->
                    <!--<input type="email" placeholder="john.doe@gmail.com" value="email">-->
                    <!--<button v-on:click.prevent="sendInvitationHouse('anne.tiberghien@gmail.com')">Validation</button>-->
                <!--</form>-->
            </div>
        </div><!-- end popin -->
    </div>
</template>

<script>
import store from '../store/index'
import axios from 'axios'

export default {
    name:'button-house',
    props: {
        house: Object
    },
    data() {
        return {
            token: store.token,
            currentHouse: {
                id: this.house.id,
                name: this.house.name,
                users: this.house.users
            }
        }
    },
    methods: {
        goback() {
            console.log('go back')
            this.updateForm();
            this.$router.push({ path: '/houses' })
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
        }
    }
}

</script>
