<template>
    <div class="listHouse__add">
        <h4>Wanna add a new house ?</h4>
        <form action="" class="listUsers__add__form">
            <input type="text" placeholder="name" v-model:value="newHouse.name">
            <input type="password" placeholder="Password" v-model:value="newHouse.created">
            <button v-on:click="createHouse">Créer</button>
        </form>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'AddHouse',
    props: {
        house: Object,
        token: String
    }, 
    data() {
        return {
            houses : [],
            newHouse: {
                name: '',
                created: ''
            },
        }
    }, 
    methods: {
        // POST METHOD CREATE
        createUser(event) {
            event.preventDefault();
            axios({
                method: 'post',
                url: 'http://ulysse.idequanet.com/ben/web/api/house/create',
                data: {
                    house : {
                        firstname : this.newHouse.firstname,
                        lastname : this.newHouse.lastname,
                        email : this.newHouse.email,
                        password : this.newHouse.password
                    }
                },
                headers: {
                    "Access-Control-Allow-Origin": "*"
                },
            }).then(response => {
                this.users.push(response.data.data.user)
                this.$emit('create-user', response.data.data.user.id)
            }).catch(error => {
                console.log(error)
            });
        }
    }
}
</script>
