<template>
    <aside class="menu" v-show="isMenuVisible">
        <div class="menu-filter">
            <i class="fa fa-search fa-lg"></i>
            <input type="text" v-model="treeFilter" class="filter-field" placeholder="Pesquisar..." />
        </div>
        <Tree :data="treeData" :options="treeOptions" :filter="treeFilter" ref="tree" />
    </aside>
</template>

<script>
import axios from 'axios'
import Tree from 'liquor-tree'
import { mapState } from 'vuex'
import { baseApiUrl } from '../../global'

export default {
    name: 'Menu',
    components: {
        Tree
    },
    computed: mapState(['isMenuVisible']),
    data: function() {
        return {
            treeFilter: '',
            treeData: this.getTreeData(),
            treeOptions: {
                propertyNames: { 'text': 'name'},
                filter: {
                    emptyText: 'Nenhum resultado encontrado',
                }
            } 
        }
    },
    methods: {
        getTreeData() {
            return axios.get(`${baseApiUrl}/category/tree`)
                        .then(res => res.data)
        },
        onNodeSelected(node) {
            this.$router.push({ name: 'articlesByCategory', params: { id: node.id } })

            if (this.$mq === 'xs' || this.$mq === 'sm') {
                this.$store.commit('toggleMenu', false)
            }
        }
    
    },
    mounted() {
        this.$refs.tree.$on('node:selected', this.onNodeSelected)
    },
}
</script>

<style>
    .menu {
        grid-area: menu;
        background:#232526;

        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
    }

    .menu a {
        color: #fff;
    }
    .menu a:hover {
        color: #fff;
        text-decoration: none;
    }

    .menu .tree-node.selected > .tree-content,
    .menu .tree-node .tree-content:hover {
        background-color: #504f4f;
    }

    .tree-arrow.has-child {
        filter: brightness(2);
    }

    .menu .menu-filter {
        display: flex;
        justify-content: center;
        align-items: center;

        margin:  20px;
        padding-bottom: 8px;
        border-bottom: 1px solid #AAA;
    }

    .menu .menu-filter i {
        color: #AAA;
        margin-right: 10px;
    }

    .menu input {
        color: #CCC;
        font-size: 1.3rem;
        border: 0;
        outline: 0;
        width: 100%;
        background: transparent;
    }

    .menu .tree-filter-empty {
        color: #CCC;
        margin-left: 20px;
        font-size: 1.1rem;
    }
</style>