<template>

    <div>
        <button
            class="button"
            v-on:click="isActive = true">
            titre
        </button>
        <div class="popin"
            v-if="isActive"
        >
            <form action="">
                <input type="text" placeholder="Firstname" v-model="firstName">
                <input type="text" placeholder="Lastname" v-model="lastName">
            </form>
            <img src="../assets/cross-icon.png" alt="close popin" v-on:click="isActive = false">
        </div>
    </div>

</template>

<script>
    export default {
        name:'button-user',
         methods: {

        // PUT METHODE
        editUser(event) {
        
        },
        updateUser(event) {
        event.preventDefault()
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
        data() {
            return {
                isActive: false,
                firstName: "",
                lastName: ""
            }
        },

        // props: {
        //     title: {
        //         type: String
        //     },
        //     activeButton: {
        //         type: Object,
        //     },
        //     nonActiveButton: {
        //         type: Object
        //     }
        // },
        // computed: {
        //     buttonStyle() {
        //         return {
        //             backgroundColor: this.isHover ? this.activeButton.backgroundColor : this.nonActiveButton.backgroundColor,
        //             color: this.isHover ? this.activeButton.colorText : this.nonActiveButton.colorText,
        //             borderColor: this.isHover ? this.activeButton.borderColor : this.nonActiveButton.borderColor
        //         }
        //     }
        // },
        // methods: {
        //     toggleIsHover(val) {
        //         this.isHover = val
        //     }
        // },
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