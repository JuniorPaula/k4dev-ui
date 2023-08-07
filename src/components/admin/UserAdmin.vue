<template>
    <div class="user-admin">
        <b-form>
            <input type="hidden" id="user-id" v-model="user.id">
            <b-row>
                <b-col md="6" sm="12">
                    <b-form-group label="Nome:">
                        <b-form-input 
                            id="user-name" 
                            type="text"
                            :readonly="mode === 'remove'"
                            v-model="user.name" 
                            required 
                            placeholder="Informe o nome do usuário" />
                    </b-form-group>
                </b-col>
                <b-col cols="12" md="6">
                    <b-form-group label="E-mail:">
                        <b-form-input 
                            id="user-email"
                            type="email" 
                            :readonly="mode === 'remove'"
                            v-model="user.email"
                            required 
                            placeholder="Informe o e-mail do usuário" />
                    </b-form-group>
                </b-col>
            </b-row>

            <b-form-checkbox 
                id="user-admin" 
                v-show="mode === 'save'" 
                v-model="user.admin" 
                class="mt-3 mb-3"
            >
                Administrador?
            </b-form-checkbox>
            
            <b-row v-show="mode === 'save' && !isUpdatePassword">
                <b-col md="6" sm="12">
                    <b-form-group label="Senha:">
                        <b-form-input 
                            id="user-password"
                            type="password" 
                            v-model="user.password" 
                            required 
                            placeholder="Informe a senha do usuário" />
                    </b-form-group>
                </b-col>
                <b-col cols="12" md="6">
                    <b-form-group label="Confirmação de senha:">
                        <b-form-input 
                            id="user-confirm-password"
                            type="password" 
                            v-model="user.confirmPassword"
                            required 
                            placeholder="Confirme a senha do usuário" />
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
        
        <b-table hover striped :items="users" :fields="fields">
            <template slot="actions" slot-scope="data">
                <b-button variant="warning" @click="loadUser(data.item)" class="mr-2">
                    <i class="fa fa-pencil"></i>
                </b-button>
                <b-button variant="danger" @click="loadUser(data.item, 'remove')" class="mr-2">
                    <i class="fa fa-trash"></i>
                </b-button>
            </template>
        </b-table>
    </div>
</template>
<script>
import axios from 'axios'
import { baseApiUrl, showError } from '../../global';

export default {
    name: 'UserAdmin',
    data: function() {
        return {
            mode: 'save',
            isUpdatePassword: false,
            user: {},
            users: [],
            fields: [
                { key: 'id', label: 'Código', sortable: true },
                { key: 'name', label: 'Nome', sortable: true },
                { key: 'email', label: 'E-mail', sortable: true },
                { key: 'admin', label: 'Administrador', sortable: true, formatter: value => value ? 'Sim' : 'Não' },
                { key: 'actions', label: 'Ações' },
            ],
        }
    },
    methods: {
        loadUsers() {
            axios.get(`${baseApiUrl}/users`).then(res => {
                this.users = res.data
            })
        },
        reset() {
            this.isUpdatePassword = false
            this.mode = 'save'
            this.user = {}
            this.loadUsers()
        },
        save() {
            const { name, email, password, confirmPassword, admin } = this.user
            if (!name || !email || !password || !confirmPassword) {
                showError('Dados incompletos')
                return
            }
            if (password !== confirmPassword) {
                showError('Senhas não conferem')
                return
            }
            const user = { name, email, password, admin }
            const method = this.user.id ? 'put' : 'post'
            const url = this.user.id ? `${baseApiUrl}/users/${this.user.id}` : `${baseApiUrl}/users`
            axios[method](url, user).then(() => {
                const msg = this.user.id ? 'Usuário atualizado com sucesso!' : 'Usuário cadastrado com sucesso!'
                this.$toasted.global.defaultSuccess({ msg })
                this.reset()
            }).catch(err => {
                showError(err)
            })
        },
        remove() {
            axios.delete(`${baseApiUrl}/users/${this.user.id}`).then(() => {
                this.$toasted.global.defaultSuccess({ msg: 'Usuário removido com sucesso!' })
                this.reset()
            }).catch(err => {
                showError(err)
            })
        },
        loadUser(user, mode = 'save') {
            this.isUpdatePassword = true
            this.mode = mode
            this.user = { ...user }
        },
    },
    mounted() {
        this.loadUsers()
    },
}
</script>
<style>
    
</style>