<template>
    <div class="user-data">
        <b-form>
            <input type="hidden" id="user-data-id" v-model="user.id">
            <b-row>
                <b-col md="6" sm="12">
                    <b-form-group label="Nome:">
                        <b-form-input 
                            id="user-data-name" 
                            type="text"
                            :readonly="mode === 'remove'"
                            v-model="user.name" 
                            required/>
                    </b-form-group>
                </b-col>
                <b-col md="6" sm="12">
                    <b-form-group label="Email:">
                        <b-form-input 
                            id="user-data-email" 
                            type="email" 
                            :readonly="mode === 'remove'"
                            v-model="user.email"
                            required/>
                    </b-form-group>
                </b-col>
            </b-row>

            <b-row>
                <b-col xs="12">
                    <b-button variant="primary" v-if="mode === 'save'" @click="updateUser">
                        Salvar
                    </b-button>
                    <b-button variant="danger" v-if="mode === 'remove'">
                        Excluir
                    </b-button>
                    <b-button class="ml-2" @click="reset">
                        Cancelar
                    </b-button>
                </b-col>
            </b-row>
        </b-form>        
    </div>
</template>

<script>
import axios from 'axios'
import { baseApiUrl, showError, userKey } from '../../global'

export default {
    name: 'UserData',
    data: function() {
        return {
            mode: 'save',
            user: {}
        }
    },
    methods: {
        reset() {
            this.mode = 'save'
            this.user = {}
            this.loadUser()
        },
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
        updateUser() {
            const { name, email } = this.user
            if (!name || !email) {
                showError('Dados incompletos')
                return
            }

            axios.put(`${baseApiUrl}/users/${this.user.id}`, this.user)
                .then(() => {
                    this.reset()
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
    }
}

</script>

<style>

</style>