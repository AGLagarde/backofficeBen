<!--HOUSES-->
<template>
    <div class="container">
        <div class="listItems">
            <ul class="navigation">
                <li class="navigation__item">
                    <router-link :to="{ name: 'users'}">COLOCATAIRES</router-link>
                </li>
                <li class="navigation__item">
                    <router-link :to="{ name: 'houses'}">COLOCATION</router-link>
                </li>
                <li class="navigation__item">
                    <router-link :to="{ name: 'tasks'}">TÂCHES</router-link>
                </li>
            </ul>

            <div class="listItems__actions">
                <!-- search -->
                <div class="searchbar">
                    <input
                        type="text"
                        placeholder="Search"
                        maxlength= "12"
                        class="searchbar__input"
                        v-model="search"
                        v-on:keyup="isFiltered = true"
                    >
                    <img
                        src="../assets/searchbar.png"
                        alt="search button"
                        class="searchbar__button"
                    >
                </div>
                <!-- end search  -->

                <!-- add house ------ not working -->
                <span
                    class="listUsers__actions-addButton"
                    v-if="isCreating === false"
                    v-on:click="createForm"
                >Nouvelle colocation</span>
                <!-- end add house -->
            </div>

            <!-- liste -->
            <table class="listItems__table">
                <tr class="listItems__table__head">
                    <th>#</th>
                    <th>Nom</th>
                    <th>Date de création</th>
                    <th>Colocataires</th>
                    <th>Actions</th>
                </tr>

                <!-- une ligne -->
                <OneRowHouse
                    v-for="house in filteredHouses"
                    v-bind:key="house.id"
                    :house="house"
                ></OneRowHouse>
                <!-- end une ligne -->
            </table>
            <!-- end liste -->
        </div>
    </div>
</template>

<script>
    import store from '../store/index'
    import axios from 'axios'
    import Login from './Login'
    import OneRowHouse from './OneRowHouse'

    export default {
        name: 'listHouses',
        components: {
            Login,
            OneRowHouse
        },
        data() {
            return {
                token: store.token,
                houses : [],
                isCreating: false,
                search: '',
                isFiltered: true
            }
        },
        mounted() {
            if (!this.token) {
                console.log(this.token);
                this.$router.push({ path: 'login' })
            } else {
                console.log('in houses: ', this.token);
                this.getAllHouses()
            }
        },
        methods: {
            // API: GET request
            // @todo
            getAllHouses() {
                axios({
                    method: 'get',
                    url: 'http://ulysse.idequanet.com/ben/web/api/houses',
                    headers: {
                        Authorization: `BEARER ${this.token}`
                    }
                })
                    .then(response => {
                        console.log('get houses');
                        console.log(response.data.data)
                        this.houses = response.data.data.houses
                    })
                    .catch(err => {
                        console.log(err)
                    })
            },
            createForm() {
                console.log('ty go');
                this.$router.push({ path: 'houses/create' })
            }
        },
        computed: {
            filteredHouses() {
                return this.houses.filter(house => {
                    return house.name.toLowerCase().indexOf(this.search.toLowerCase()) > -1
                })
            }
        }
    }
</script>


