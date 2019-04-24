<template>
    <tr class="listItems__table__body">
        <th class="listItems__table__body-entries">{{ user.id }}</th>
        <th class="listItems__table__body-entries">{{ user.firstname }}</th>
        <th class="listItems__table__body-entries">{{ user.lastname }}</th>
        <th class="listItems__table__body-entries">{{ user.email }}</th>
        <th class="listItems__table__body-entries">{{ user.house }}</th>
        <th class="listItems__table__body-actions">
            <UserButton
                title="Editer"
                :user="user" 
                :token="token"
                v-on:modified-user="receiveModifiedUser"
                v-on:delete-user="transmitToParent"
            >
            </UserButton>
        </th>
    </tr>
</template>



<script>
import store from '../store/index'
import UserButton from './UserButton'

export default {
    name: 'userOneRow',
    components: {
        UserButton
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
            this.user.house = userUpdated.house
        }, 
        // API DELETE request transmission --> parent ListUser
        transmitToParent(id) {
            this.$emit('delete-user-suite', id)
        }
    }
}
 
</script>