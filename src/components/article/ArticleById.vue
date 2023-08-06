<template>
    <div class="article-by-id">
        <PageTitle icon="fa fa-file-text-o" :main="article.name" :sub="article.description" />
        <div class="article-content" v-html="article.content"></div>
    </div>
</template>

<script>
import 'highlightjs/styles/dracula.css'
import axios from 'axios'
import hljs from 'highlightjs/highlight.pack.js'
import PageTitle from '../templates/PageTitle.vue';
import { baseApiUrl, showError } from '../../global';

export default {
    name: 'ArticleById',
    components: {
        PageTitle,
    },
    data: function() {
        return {
            article: {},
        }
    },
    mounted() {
       axios.get(`${baseApiUrl}/articles/${this.$route.params.id}`).then(res => {
           this.article = res.data
       }).catch(err => {
           showError(err.response.data)
       })
    },
    updated() {
        document.querySelectorAll('article-content pre').forEach((block) => {
            hljs.highlightBlock(block);
        });
    },
        
}

</script>

<style>
    .article-content {
        background-color: #fff;
        border-radius: 8px;
        padding: 25px;
    }
    
    .article-content pre {
        padding: 20px;
        border-radius: 8px;
        font-size: 1.2rem;
        background-color: #1e1e1e;
        color: #fff
    }

    .article-content img {
        max-width: 100%;
    }

    .article-content :last-child {
        margin-bottom: 0;
    }
</style>