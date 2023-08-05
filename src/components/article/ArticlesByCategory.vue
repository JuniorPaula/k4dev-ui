<template>
    <div class="articles-by-category">
        <PageTitle icon="fa fa-folder-o" :main="category.name" sub="Categoria" />
    </div>
</template>

<script>
import axios from 'axios'
import PageTitle from '../templates/PageTitle.vue';
import { baseApiUrl, showError } from '../../global';


export default {
    name: 'ArticlesByCategory',
    components: {
        PageTitle,
    },
    data: function() {
        return {
            category: {},
            articles: [],
            page: 1,
            loadMore: true,
        }
    },
    methods: {
        getCategory() {
            axios.get(`${baseApiUrl}/category/${this.category.id}`).then(res => {
                this.category = res.data
            }).catch(err => {
                showError(err.response.data)
            })
        },
    
    },
    mounted() {
        this.category.id = this.$route.params.id
        this.getCategory()
    },
    
}

</script>

<style>
    
</style>