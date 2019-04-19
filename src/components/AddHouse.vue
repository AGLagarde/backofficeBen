<template>
    <div class="addItem popin">
        <!-- <img src="../assets/cross-icon.png" alt="close popin" v-on:click="isCreating = false"> -->
        <!--<img src="../assets/cross-icon.png" alt="close popin" v-on:click="isCreated = false">-->
        <form action="" class="addItem__form">
            <input type="text" class="addItem__form-input" placeholder="Nom de la colocation" v-model:value="newHouse.name">
            <span v-on:click="goback">Annuler</span>
            <button v-on:click="createHouse">Créer</button>
        </form>
    </div>
</template>

<script>
    import store from '../store/index'
    import axios from 'axios'

    export default {
        name: 'AddHouse',
        props: {
            house: Object
        },
        data() {
            return {
                token: store.token,
                houses : [],
                newHouse: {
                    name: '',
                    created: '',
                    users: []
                }
            }
        },
        methods: {
            // POST METHOD CREATE
            createHouse(event) {
                event.preventDefault();
                console.log(this.token)
                axios({
                    method: 'post',
                    url: 'http://ulysse.idequanet.com/ben/web/api/house/create',
                    data: {
                        house : {
                            name : this.newHouse.name,
                            created : this.newHouse.created,
                            users : this.newHouse.users
                        }
                    },
                    headers: {
                        "Access-Control-Allow-Origin": "*",
                        Authorization: `BEARER ${this.token}`
                    },
                }).then(response => {
                    console.log(this.token)
                    this.houses.push(response.data.data.house)
                    console.log(response.data)
                    this.goback()
                }).catch(error => {
                    console.log(error)
                });
            },
            goback() {
                console.log('go back')
                this.updateForm();
                this.$router.push({ path: '/houses' })
            },
            updateForm(input) {
                document.querySelectorAll('.listUsers__add__form input').forEach(function(input) {
                    input.value = ''
                })
            }
        }
    }
</script>
