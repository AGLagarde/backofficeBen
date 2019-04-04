<template>
    <tr class="listUsers__table__body">
        <th class="listUsers__table__body-entries"><input class="input-firstname" type="text" disabled="true">{{ user.id }}</th> 
        <th class="listUsers__table__body-entries"><input class="input-firstname" type="text" disabled="true" v-on:keyup.enter="editUser">{{ user.firstname }}</th> 
        <th class="listUsers__table__body-entries"><input class="input-name" type="text" disabled="true" v-on:keyup.enter="editUser">{{ user.lastname }}</th>
        <th class="listUsers__table__body-entries"><input class="input-mail" type="text" disabled="true" v-on:keyup.enter="editUser">{{ user.email }}</th>
        <th class="listUsers__table__body-actions">
            <ButtonUser
                title="Editer"
                :user="user" 
                :token="token"
                v-on:modified-user="receiveModifiedUser"
                v-on:delete-user="transmitToParent"
            >
            </ButtonUser>
        </th>
    </tr>
</template>



<script>

import ButtonUser from './ButtonUser'

export default {
    components: {
        ButtonUser
    },
    props: {
        user: Object,  // user is one object into users-array
        token: String
    },
    methods: {
        // API PUT request transmission --> parent ListUser
        receiveModifiedUser(userUpdated) { 
            this.user.firstname = userUpdated.firstname 
            this.user.lastname = userUpdated.lastname 
            this.user.email = userUpdated.email 
        }, 
        // API DELETE request transmission --> parent ListUser
        transmitToParent(id) {
            this.$emit('delete-user-suite', id)
        }
    }
}
 
</script>