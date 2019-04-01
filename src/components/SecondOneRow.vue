<template>
    <tr class="listUsers__table__body">
        <th class="listUsers__table__body-entries"><input class="input-firstname" type="text" disabled="true">{{ user.id }}</th> 
        <th class="listUsers__table__body-entries"><input class="input-firstname" type="text" disabled="true" v-on:keyup.enter="editUser">{{ user.firstname }}</th> 
        <th class="listUsers__table__body-entries"><input class="input-name" type="text" disabled="true" v-on:keyup.enter="editUser">{{ user.lastname }}</th>

        <!-- placeholder -->
        <!-- <th class="listUsers__table__body-entries"><input class="input-firstname" type="text" disabled="true" v-on:keyup.enter="editUser">{{ user.username }}</th> 
        <th class="listUsers__table__body-entries"><input class="input-name" type="text" disabled="true" v-on:keyup.enter="editUser">{{ user.name }}</th> -->
        <!-- end placeholder -->

        <th class="listUsers__table__body-entries"><input class="input-mail" type="text" disabled="true" v-on:keyup.enter="editUser">{{ user.email }}</th>
        <th class="listUsers__table__body-actions">
            <ButtonUser
                title="Editer"
                active-button="editButton.activeState"
                :user="user" 
                :token="token"
                v-on:modified-user="receiveModifiedUser"
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
        user: Object, 
        token: String
    },
    data() {
        return {
        }
    },
    methods: {
        // transmission --> parent ListUser
        receiveModifiedUser(userUpdated) { 
            console.log(userUpdated)
            this.user.firstname = userUpdated.firstname 
            this.user.lastname = userUpdated.lastname 
            this.user.email = userUpdated.email 
        }
    }
}
 
</script>