<template>
    <div>
        <button
            class="button"
            v-on:click="isActive = true">Clic
        </button>
        <div class="popin"
            v-if="isActive"
        >
            <form action="">
                <input type="text" placeholder="Firstname" v-model="firstName">
                <input type="text" placeholder="Lastname" v-model="lastName">
                <button v-on:click="userUpdated">Valider</button>
            </form>
            <img src="../assets/cross-icon.png" alt="close popin" v-on:click="isActive = false">
        </div>
    </div>
</template>

<script>
    export default {
        name:'button-user',
        data() {
            return {
                isActive: false,
                firstName: "",
                lastName: ""
            }
        },
        methods: {
             userUpdated(event) {
                 event.preventDefault();
                 // récupérer dans une var
                 console.log(this.firstname); // undefined
            },
            // API PUT METHODE
            updateUser(event) {
                event.preventDefault();
                axios({
                    method: 'PUT',
                    url: 'http://ulysse.idequanet.com/ben/web/api/user/edit',
                    data: {
                    user : {
                        id: id,
                        firstname : this.firstName
                    }
                    },
                    headers: {
                    "Access-Control-Allow-Origin": "*"
                    },
                }).then(response => {
                    console.log(response.data)
                    this.$emit('userUpdated', response.data)
                }).catch(error => {
                    console.log(error);
                });
            },
        },
        watch: {
            // isHover() {
            //     console.log('is hover a changé')
            // }
        }
    }
</script>
