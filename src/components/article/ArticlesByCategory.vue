<template>
    <div class="articles-by-category">
        <PageTitle icon="fa fa-folder-o" :main="category.name" sub="Categoria" />
        <ul>
            <li v-for="article in articles" :key="article.id">
               <ArticleItem :article="article" />
            </li>
        </ul>
        <div class="load-more">
            <b-button v-if="loadMore" class="btn btn-md btn-outline-primary" @click="getArticles">
                Carregar mais
            </b-button>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import PageTitle from '../templates/PageTitle.vue';
import ArticleItem from './ArticleItem.vue';
import { baseApiUrl, showError } from '../../global';


export default {
    name: 'ArticlesByCategory',
    components: {
        PageTitle,
        ArticleItem,
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
        getArticles() {
            axios.get(`${baseApiUrl}/category/${this.category.id}/articles?page=${this.page}`).then(res => {
                this.articles = this.articles.concat(res.data)
                this.page++

                if (res.data.length === 0) {
                    this.loadMore = false
                }
            }).catch(err => {
                showError(err.response.data)
            })
        }
    
    },
    mounted() {
        this.category.id = this.$route.params.id
        this.getCategory()
        this.getArticles()
    },
    watch: {
        $route(to) {
            this.category.id = to.params.id
            this.articles = []
            this.page = 1
            this.loadMore = true

            this.getCategory()
            this.getArticles()
        }
    }
    
}

</script>

<style>
    .articles-by-category ul {
        list-style-type: none;
        padding: 0px;
    }

    .articles-by-category .load-more {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 25px;
    }
    
</style>