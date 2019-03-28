<template>
    <tr class="listUsers__table__body">
        <th class="listUsers__table__body-entries"><input class="input-firstname" type="text" disabled="true">{{ user.id }}</th> 
        <th class="listUsers__table__body-entries"><input class="input-firstname" type="text" disabled="true" v-on:keyup.enter="editUser">{{ user.firstname }}</th> 
        <th class="listUsers__table__body-entries"><input class="input-name" type="text" disabled="true" v-on:keyup.enter="editUser">{{ user.lastname }}</th>
        <th class="listUsers__table__body-entries"><input class="input-mail" type="text" disabled="true" v-on:keyup.enter="editUser">{{ user.email }}</th>
        <th class="listUsers__table__body-actions">
            <ButtonUser
                title="Editer"
                active-button="editButton.activeState"
                v-on:userUpdated="changeUser"
            >
            </ButtonUser>
            
            

            <!-- <button-user
            title="Editer"
            v-on:click="editUser"
            :active-button="editButton.activeState"
            :non-active-button="editButton.nonActiveState">
            </button-user>
            
            <button-user
            title="Supprimer"
            v-on:click=""
            :active-button="editButton.activeState"
            :non-active-button="editButton.nonActiveState">
            </button-user> -->
        </th>
    </tr>
</template>



<script>

import ButtonUser from './ButtonUser'

export default {
    props: [
        "user",
    ],
    data() {
        return {
            currentUser: this.user,
        }
    } 
    components: {
        ButtonUser
    },
    methods: {
        changeUser(user) {
            console.log(user);
        }
    }
}
 
</script>