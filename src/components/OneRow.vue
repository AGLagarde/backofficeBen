<template>
    <tr class="listUsers__table__body" 
        v-for="(user, index) in users"
        v-bind:item="user"
        v-bind:index="index"
        v-bind:key="user.id">
        <th class="listUsers__table__body-entries"><input class="input-firstname" type="text" disabled="true" v-bind:value="user.id"></th> 
        <th class="listUsers__table__body-entries"><input class="input-firstname" type="text" disabled="true" v-bind:value="user.firstname" v-on:keyup.enter="editUser"></th> 
        <th class="listUsers__table__body-entries"><input class="input-name" type="text" disabled="true" v-bind:value="user.lastname" v-on:keyup.enter="editUser"></th>
        <th class="listUsers__table__body-entries"><input class="input-mail" type="text" disabled="true" v-bind:value="user.email" v-on:keyup.enter="editUser"></th>
        <th class="listUsers__table__body-actions">
            <ButtonUser
                title="Editer"
                :active-button="editButton.activeState"
                :non-active-button="editButton.nonActiveState">
            </ButtonUser>
            
            <ButtonUser
                title="Supprimer"
                v-on:click="deleteConfirmationUser"
                :active-button="editButton.activeState"
                :non-active-button="editButton.nonActiveState">
            </ButtonUser>
        </th>
    </tr>
</template>

<script>
import ButtonUser from './ButtonUser'

export default {
    name:'one-row',
    component: {
        ButtonUser
    },
    data() {
        return {
            
        }
    },
    props: {
        title: {
            type: String
        },
        activeButton: {
            type: Object,
        },
        nonActiveButton: {
            type: Object
        }
    },
    computed: {
        
    },
    methods: {
        
    },
    watch: {
        
    }
}

</script>
