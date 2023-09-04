<template>
    <div class="user-page">
        <div class="content-header">
            <PageTitle title="Perfil" icon="fa fa-profile" main="Perfil" sub="Perfil & Cia" />

            <h2>Olá, <strong>Jhon</strong></h2>
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
import PageTitle from '../templates/PageTitle.vue'
import UserData from './UserData.vue'
import UserArticles from './UserArticles.vue'

export default {
    name: 'User',
    components: {
        PageTitle,
        UserData,
        UserArticles
    },
}

</script>

<style>
    .content-header {
        margin-bottom: 15px;
    }
    
    .content-header span {
        font-size: 18px;
    }

</style>