<template>
    <div class="user-articles">
        <b-form>
            <input type="hidden" id="article-id" v-model="article.id">
            <input type="hidden" id="user-id" v-model="article.user_id">
            <b-form-group label="Artigo:" label-for="article-name">
                <b-form-input 
                    id="article-name" 
                    type="text"
                    :readonly="mode === 'remove'"
                    v-model="article.name" 
                    required 
                    placeholder="Informe o nome do Artigo" />
            </b-form-group>

            <b-form-group label="Descrição:" label-for="article-description">
                <b-form-input 
                    id="article-description" 
                    type="text"
                    :readonly="mode === 'remove'"
                    v-model="article.description" 
                    required 
                    placeholder="Informe a descrição do Artigo" />
            </b-form-group>

            <b-form-group label="Imagem (URL):" label-for="article-imageUrl">
                <b-form-input 
                    id="article-imageUrl" 
                    type="text" 
                    :readonly="mode === 'remove'"
                    v-model="article.image_url"
                    required 
                    placeholder="Informe a URL da imagem" />
            </b-form-group>

            <b-form-group v-show="mode === 'save'" label="Categoria:" label-for="article-categoryId">
                <b-form-select id="article-categoryId" v-model="article.category_id" :options="categories"/>
            </b-form-group>

            <b-form-group v-show="mode === 'save'" label="Conteúdo" label-for="category-content">
                <VueEditor
                    id="category-content"
                    v-model="article.content"
                    placeholder="Informe o conteúdo do Artigo..." />
            </b-form-group>

            <b-button variant="primary" v-if="mode === 'save'" @click="save">
                Salvar
            </b-button>
            <b-button variant="danger" v-if="mode === 'remove'" @click="remove">
                Excluir
            </b-button>
            <b-button class="ml-2" @click="reset">
                Cancelar
            </b-button>
        </b-form>
        <hr />
        <b-table hover striped :items="articles" :fields="fields">
            <template slot="actions" slot-scope="data">
                <b-button variant="warning" @click="loadArticle(data.item)" class="mr-2">
                    <i class="fa fa-pencil"></i>
                </b-button>
                <b-button variant="danger" @click="loadArticle(data.item, 'remove')" class="mr-2">
                    <i class="fa fa-trash"></i>
                </b-button>
            </template>
        </b-table>

        <b-pagination size="md" v-model="page" :total-rows="count" :per-page="limit" />
    </div>
</template>

<script>
import axios from 'axios'
import { VueEditor } from 'vue2-editor'
import { baseApiUrl, showError, userKey } from '../../global'

export default {
    name: 'UserArticles',
    components: {
        VueEditor
    },
    data: function() {
        return {
            mode: 'save',
            article: {},
            articles: [],
            categories: [],
            page: 1,
            limit: 0,
            count: 0,
            fields: [
                { key: 'id', label: 'Código', sortable: true },
                { key: 'name', label: 'Nome', sortable: true },
                { key: 'description', label: 'Descrição', sortable: true },
                { key: 'actions', label: 'Ações' }
            ]
        }
    },
    methods: {
        reset() {
            this.mode = 'save'
            this.article = {}
            this.loadUser()
            this.loadArticles()
        },
        loadArticles() {
            axios.get(`${baseApiUrl}/articles?page=${this.page}`).then(res => {
                const articles = res.data.data.filter(a => {
                    return a.user_id === this.article.user_id
                })
                
                this.articles = articles
                this.count = res.data.count
                this.limit = res.data.limit
            }).catch(err => showError(err.response.data))
        },
        loadArticle(article, mode = 'save') {
            this.mode = mode
            axios.get(`${baseApiUrl}/articles/${article.id}`).then(res => {
                this.article = res.data
            }).catch(err => showError(err.response.data))
        },
        save() {
            const method = this.article.id ? 'put' : 'post'
            const url = this.article.id ? `${baseApiUrl}/articles/${this.article.id}` : `${baseApiUrl}/articles`
            axios[method](url, this.article).then(() => {
                const msg = this.article.id ? 'Artigo atualizado com sucesso!' : 'Artigo cadastrado com sucesso!'
                this.$toasted.global.defaultSuccess({ msg })
                this.reset()
            }).catch(err => {
                showError(err.response.data)
            })
        },
        remove() {
            axios.delete(`${baseApiUrl}/articles/${this.article.id}`).then(() => {
                this.$toasted.global.defaultSuccess({ msg: 'Artigo removido com sucesso!' })
                this.reset()
            }).catch(err => {
                if (err.response.status === 400) {
                    this.$toasted.global.defaultError({ msg: 'Permissão negada para deletar o artigo.' })
                    return
                } else if (err.response.status === 500) {
                    this.$toasted.global.defaultError({ msg: 'Error ao deletar o artigo.' })
                    return
                }
                
                showError(err)
            })
        },
        loadCategories() {
            axios.get(`${baseApiUrl}/category`).then(res => {
                this.categories = res.data.map(category => {
                    return {
                        value: category.id,
                        text: category.path,
                    }
                })
            }).catch(err => showError(err.response.data))
        },
        loadUser() {
            const jsonUser = localStorage.getItem(userKey)
            const user = JSON.parse(jsonUser)
            this.article.user_id = parseInt(user.user_id)
        },
    },
    watch: {
        page() {
            this.loadArticles()
        }
    },
    mounted() {
        this.loadArticles()
        this.loadCategories()
        this.loadUser()
    },
}

</script>

<style>

</style>