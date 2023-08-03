<template>
    <div class="home">
        <PageTitle title="Home" icon="fa fa-home" main="Dashboard" sub="Base de Conhecimento" />   
        <div class="stats">
            <Stat title="Categorias" :value="stat.category" icon="fa fa-folder" color="#d54d50" />
            <Stat title="Artigos" :value="stat.article" icon="fa fa-file" color="#3bc480" />
            <Stat title="Usuários" :value="stat.users" icon="fa fa-users" color="#3282cd" />     
        </div>
    </div>
</template>
<script>
import axios from 'axios'
import PageTitle from '../templates/PageTitle.vue'
import Stat from './Stat.vue';

import { baseApiUrl } from '../../global'

export default {
    name: 'Home',
    components: {
    PageTitle,
    Stat,
},
    data: function() {
        return {
            stat: {}
        }
    },
    methods: {
        getStat() {
            axios.get(`${baseApiUrl}/stats`).then(res => {
                this.stat = res.data
            })
        }
    },
    mounted() {
        this.getStat()
    },
}
</script>

<style>
    .stats {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
    }    
</style>