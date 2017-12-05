import Vue from 'vue'
import Router from 'vue-router'
import VeiculosLista from '../components/veiculos/Lista.vue'
import VeiculosCadastro from '../components/veiculos/Cadastro.vue'

Vue.use(Router)

export default new Router({
	routes: [
		{
			path: '/',
			name: 'VeiculosLista',
			component: VeiculosLista
		},
		{
			path: '/editar/:id',
			name: 'VeiculosEdicao',
			component: VeiculosCadastro
		},
		{
			path: '/novo',
			name: 'VeiculosCadastro',
			component: VeiculosCadastro
		}
	]
})
