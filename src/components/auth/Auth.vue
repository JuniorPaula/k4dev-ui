<template>
    <div class="auth-content">
        <div class="auth-modal">
            <img src="@/assets/logo.png" width="200" alt="Logo" />
            <hr />

            <div class="auth-title">{{ showSignup ? 'Cadastro' : 'Login' }}</div>

            <input type="text" v-if="showSignup" v-model="user.name" name="name" placeholder="Nome">
            <input type="email" v-model="user.email" name="email" placeholder="E-mail">
            <input type="password" v-model="user.password" name="password" placeholder="Senha">
            <input type="password" v-if="showSignup" v-model="user.confirmPassword" placeholder="Confirme a senha">
        
            <button v-if="showSignup" @click="signup">Registrar</button>
            <button v-else @click="signin">Entrar</button>

            <a href @click.prevent="showSignup = !showSignup">
                <span v-if="showSignup">Já tem cadastro? Acesse o Login!</span>
                <span v-else>Não tem cadastro? Registre-se aqui!</span>
            </a>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import { baseApiUrl, showError, userKey } from '../../global'

export default {
    name: 'Auth',
    data: function() {
        return {
            showSignup: false,
            user: {}
        }
    },
    methods: {
        signin() {
            if (!this.user.email || !this.user.password) {
                showError('Preencha todos os campos')
                return
            }

            axios.post(`${baseApiUrl}/login`, this.user)
                .then(res => {
                    if (!res) {
                        showError('E-mail e/ou senha inválidos')
                        return
                    }
                    
                    this.$store.commit('setUser', res.data)
                    localStorage.setItem(userKey, JSON.stringify(res.data))
                    this.$router.push({ path: '/' })
                })
                .catch(err => {
                    if (err.response.status === 401) {
                        alert(err)
                        showError('E-mail e/ou senha inválidos')
                        return
                    }
                    showError(err.response.data.error)
                })      
        },
        signup() {
            if (!this.user.name) {
                showError('Nome é obrigatório')
                return
            }
            if (!this.user.email) {
                showError('E-mail é obrigatório')
                return
            }
            if (!this.user.password) {
                showError('Senha é obrigatória')
                return
            }   
            if (this.user.password !== this.user.confirmPassword) {
                showError('Senhas não conferem')
                return
            }

            axios.post(`${baseApiUrl}/signup`, this.user)
                .then(() => {
                    this.$toasted.global.defaultSuccess()
                    this.user = {}
                    this.showSignup = false
                })
                .catch(err => {
                    showError(err.response.data.error)
                })
        }
    },
}

</script>

<style>
    .auth-content {
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .auth-modal {
        background-color: #fff;
        width: 350px;
        padding: 35px;
        box-shadow: 0 1px 5px rgba(0, 0, 0, 0.15);

        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .auth-title {
        font-size: 1.2em;
        font-weight: 100;
        margin-top: 10px;
        margin-bottom: 15px;
    }

    .auth-modal input {
        border: 1px solid #bbb;
        width: 100%;
        margin-bottom: 14px;
        padding: 3px 8px;
        height: 40px;
        border-radius: 3px;
        outline: none;
    }

    .auth-modal button {
        align-self: flex-end;
        background-color: #2460ae;
        color: #fff;
        padding: 5px 15px;
        border: none;
        cursor: pointer;
        margin-bottom: 10px;
    }

    .auth-modal hr {
        width: 100%;
        border: none;
        border-bottom: 1px solid #ddd;
        margin-bottom: 20px;
    }

</style>