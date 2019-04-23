<template>
    <tr class="listItems__table__body">
        <th class="listItems__table__body-entries">{{ user.id }}</th>
        <th class="listItems__table__body-entries">{{ user.firstname }}</th>
        <th class="listItems__table__body-entries">{{ user.lastname }}</th>
        <th class="listItems__table__body-entries">{{ user.email }}</th>
        <th class="listItems__table__body-actions">
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
import store from '../store/index'
import ButtonUser from './ButtonUser'

export default {
    name: 'oneRowUser',
    components: {
        ButtonUser
    },
    props: {
        user: Object
    },
    data() {
        return {
            token: store.token
        }
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