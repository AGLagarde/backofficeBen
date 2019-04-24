<!--HOUSES-->
<template>
    <div class="container">
        <div class="listItems">
           
            <Navigation></Navigation>
            
            <div class="listItems__actions">
                <!-- <SearchBar></SearchBar> -->
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
                </div><!-- end search  -->

                <!-- add house ------ not working -->
                <span
                    class="listItems__actions-addButton"
                    v-if="isCreating === false"
                    v-on:click="createForm"
                >Add House</span>
                <!-- end add house -->
            </div>

            <!-- liste -->
            <table class="listItems__table houses">
                <tr class="listItems__table__head">
                    <th>#</th>
                    <th>Name</th>
                    <th>Created</th>
                    <th>Room-Mates</th>
                    <th>Actions</th>
                </tr>

                <!-- une ligne -->
                <HouseOneRow
                    v-for="house in filteredHouses"
                    v-bind:key="house.id"
                    :house="house"
                ></HouseOneRow>
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
    import Navigation from './Navigation'
    import SearchBar from './SearchBar'
    import HouseOneRow from './HouseOneRow'

    export default {
        name: 'listHouses',
        components: {
            Login,
            Navigation,
            SearchBar,
            HouseOneRow
        },
        data() {
            return {
                token: store.token,
                houses : [],
                isCreating: false,
                search: '',
                isFiltered: true,
                userDataVue: []
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
                    console.log('ma rp ', response.data.data)
                    this.houses = response.data.data.houses
                    this.houses.forEach(house => {
                        console.log(house.users)
                        // recup firstname + ID (update)
                    })
                    console.log('mes datas ', this.userDataVue)
                    
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
                    console.log(this.houses)
                })
            }
        }
    }
</script>


