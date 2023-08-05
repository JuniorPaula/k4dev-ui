<template>
    <div class="category-admin">
        <b-form>
            <input type="hidden" id="category-id" v-model="category.id">
            <b-row>
                <b-col xs="12">
                    <b-form-group label="Categoria:">
                        <b-form-input 
                            id="category-name" 
                            type="text"
                            :readonly="mode === 'remove'"
                            v-model="category.name" 
                            required 
                            placeholder="Informe o nome do Categoria" />
                    </b-form-group>
                </b-col>
            </b-row>
            
            <b-row>
                <b-col xs="12">
                    <b-button variant="primary" v-if="mode === 'save'" @click="save">
                        Salvar
                    </b-button>
                    <b-button variant="danger" v-if="mode === 'remove'" @click="remove">
                        Excluir
                    </b-button>
                    <b-button class="ml-2" @click="reset">
                        Cancelar
                    </b-button>
                </b-col>
            </b-row>
        </b-form>
        
        <hr />
        <b-table hover striped :items="categories" :fields="fields">
            <template slot="actions" slot-scope="data">
                <b-button variant="warning" @click="loadCategory(data.item)" class="mr-2">
                    <i class="fa fa-pencil"></i>
                </b-button>
                <b-button variant="danger" @click="loadCategory(data.item, 'remove')" class="mr-2">
                    <i class="fa fa-trash"></i>
                </b-button>
            </template>
        </b-table>
    </div>
</template>
<script>
import axios from 'axios';
import { baseApiUrl, showError } from '../../global'

export default {
    name: 'CategoryAdmin',
    data: function() {
        return {
            mode: 'save',
            category: {},
            categories: [],
            fields: [
                { key: 'id', label: 'Código', sortable: true },
                { key: 'name', label: 'Nome', sortable: true },
                { key: 'path', label: 'Caminho', sortable: true },
                { key: 'actions', label: 'Ações' }
            ]
        }
    },
    methods: {
        loadCategories() {
            axios.get(`${baseApiUrl}/category`).then(res => {
                this.categories = res.data;
            });
        },
        reset() {
            this.mode = 'save'
            this.category = {}
            this.loadCategories()
        },
        save() {
            const method = this.category.id ? 'put' : 'post'
            const url = this.category.id ? `${baseApiUrl}/category/${this.category.id}` : `${baseApiUrl}/category`
            axios[method](url, this.category).then(() => {
                const msg = this.category.id ? 'Categoria atualizada com sucesso!' : 'Categoria cadastrada com sucesso!'
                this.$toasted.global.defaultSuccess({ msg })
                this.reset()
            }).catch(err => {
                showError(err)
            })
        },
        remove() {
            axios.delete(`${baseApiUrl}/category/delete/${this.category.id}`).then(() => {
                this.$toasted.global.defaultSuccess({ msg: 'Categoria removida com sucesso!' })
                this.reset()
            }).catch(err => {
                showError(err)
            })
        },
        loadCategory(category, mode = 'save') {
            this.mode = mode
            this.category = { 
                id: category.id,
                name: category.name,
                parent_id: category.parent_id
             }
        },
    },
    mounted() {
        this.loadCategories();
    },
}

</script>

<style>
    
</style>