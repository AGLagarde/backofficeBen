 <template>
 <!-- pop in -->
  <div class="popin">
   
    <div class="popin__confirm" v-if="!deletedItem">
      <p class="popin__text">Are you sure you want to delete this user from the database ?</p>
      <a href="#" class="popin__answer popin__answer-validation" v-on:click="deleteUser(user)">Yes</a>
      <a href="#" class="popin__answer popin__answer-cancelation" v-on:click="closePopin">No</a>
    </div>
    <div class="popin__validation" v-if="deletedItem">
      <img src="../assets/cross-icon.png" alt="close popin" v-on:click="closePopin">
      <p>User has been correctly deleted ! </p>
    </div> 
  </div>
</template>

<script>
  export default {
    name:'popin',
    data() {
      return {
        popinIsOpen: false
      }
    },
    props: {
            title: {
                type: String
            },
            activePopin: {
                type: Object,
            },
            nonActivePopin: {
                type: Object
            }
        },
    methods: {
      closePopin(event) {
        event.target.parentNode.parentNode.classList.remove('popin-open')
        // update popin 
        this.deletedItem = false

      },
      deleteConfirmationUser(event) {
        this.popinIsOpen = true
        let domScope = event.target.parentNode.parentNode.parentNode;
        // popin appears
        document.querySelector('.popin').classList.add('popin-open')
      }
    }
  }
</script>