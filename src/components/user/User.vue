<template>
    <div class="user-page">
        <div class="content-header">
            <PageTitle title="Perfil" icon="fa fa-profile" main="Perfil" sub="Perfil & Cia" />

            <h2>Olá, <strong>{{ this.user.name }}</strong></h2>
            <span>Bem vindo à sua página de perfil.</span>
        </div>
        <div class="user-page-tabs">
            <b-card no-body>
                <b-tabs card>
                    <b-tab title="Dados" active>
                        <UserData />
                    </b-tab>
                    <b-tab title="Artigos">
                        <UserArticles />
                    </b-tab>
                </b-tabs>
            </b-card>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import PageTitle from '../templates/PageTitle.vue'
import UserData from './UserData.vue'
import UserArticles from './UserArticles.vue'
import { baseApiUrl, showError, userKey } from '../../global'

export default {
    name: 'User',
    components: {
        PageTitle,
        UserData,
        UserArticles
    },
    data: function() {
        return {
            user: {}
        }
    },
    methods: {
        loadUser() {
            const jsonUser = localStorage.getItem(userKey)
            const userData = JSON.parse(jsonUser)
            
            axios.get(`${baseApiUrl}/users/${userData.user_id}`)
                .then(res => {
                    this.user = res.data
                })
                .catch(error => {
                    if(error.response.status === 400) {
                        showError('Usuário não encontrado')
                        return
                    }         
                    showError(error)
                })
        }, 
    },
    created() {
        this.loadUser()
    },
}

</script>

<style>
    .content-header {
        margin-bottom: 20px;
    }
    
    .content-header span {
        font-size: 18px;
    }

    h2 strong {
        font-size: 24px;
    }
</style>