<template>
    <div class="articles">
        <PageTitle icon="fa fa-folder-o" main="Todos os artigos" sub="Artigos" />
        <ul>
            <li v-for="article in articles" :key="article.id">
               <ArticleItem :article="article" />
            </li>
        </ul>
        <div class="load-more">
            <b-button v-if="loadMore" class="btn btn-md btn-outline-primary" @click="getAllArticles">
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
    name: 'Articles',
    components: {
        PageTitle,
        ArticleItem,
    },
    data: function() {
        return {
            articles: [],
            page: 1,
            loadMore: true,
        }
    },
    methods: {
        getAllArticles() {
            axios.get(`${baseApiUrl}/articles?page=${this.page}`).then(res => {
                if (res.data.data === null) {
                    this.loadMore = false
                    showError('Não há mais artigos')
                    return
                }

                this.articles = this.articles.concat(res.data.data)
                this.page++

                if (res.data.length === 0) {
                    this.loadMore = false
                }
            }).catch(err => {
                if (err.response.status === 404) {
                    this.loadMore = false
                    showError('Não há mais artigos')
                    return
                } else {
                    showError(err.response.data)
                }
            })
        }
    },
    mounted() {
        this.getAllArticles()
    },
}

</script>

<style>
    .articles ul {
        list-style-type: none;
        padding: 0px;
    }

    .articles .load-more {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 25px;
    }
    
</style>