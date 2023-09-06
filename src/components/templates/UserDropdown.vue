<template>
    <div class="user-dropdown">
        <div class="user-button">
            <span class="d-none d-sm-block">{{ user.name }}</span>
            <div class="user-dropdown-img">
                <gravatar :email="user.email" alt="User"></gravatar>
            </div>
            <i class="fa fa-angle-down"></i>
        </div>
        <div class="user-dropdown-content">
            <router-link to="/admin" v-if="user.role">
                <i class="fa fa-cogs"></i> Administração
            </router-link>
            <router-link to="/dashboard" v-if="user.role">
                <i class="fa fa-home"></i> Dashboard
            </router-link>
            <router-link to="/user">
                <i class="fa fa-user"></i> Perfil
            </router-link>
            <a href @click.prevent="logout"><i class="fa fa-sign-out"></i> Sair</a>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import { userKey } from '../../global';
import Gravatar from 'vue-gravatar'

export default {
    name: 'UserDropdown',
    components: {
        Gravatar
    },
    computed: mapState(['user']),
    methods: {
        logout() {
            localStorage.removeItem(userKey)
            this.$store.commit('setUser', null)
            this.$router.push({ path: '/login' })
        }
    },
}

</script>

<style>
    .user-dropdown {
        position: relative;
        height: 100%;
    }

    .user-button {
        display: flex;
        align-items: center;
        color: #fff;
        height: 100%;
        font-weight: 100;
        padding: 0px 20px;
        cursor: pointer;
    }

    .user-button:hover {
        background: rgba(0, 0, 0, 0.2);
    }

    .user-dropdown-img {
        margin: 0px 10px;
    }

    .user-dropdown-img > img {
        max-height: 37px;
        border-radius: 5px;
    }
    
    .user-dropdown-content {
        position: absolute;
        right: 0px;
        background-color: #f9f9f9;
        min-width: 170px;
        box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
        padding: 10px;
        z-index: 1;

        display: flex;
        flex-direction: column;
        flex-wrap: wrap;

        visibility: hidden;
        opacity: 0;
        transition: visibility 0s, opacity 0.5s linear;
    }

    .user-dropdown:hover .user-dropdown-content {
        visibility: visible;
        opacity: 1;
    }

    .user-dropdown-content a {
        color: #000;
        padding: 7px;
        text-decoration: none;
    }

    .user-dropdown-content a:hover {
        background-color: #ededed;
        text-decoration: none;
        color: #000;
    }

</style>