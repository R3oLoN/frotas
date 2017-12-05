<template>
	<div class="content">
		<transition enter-active-class="animated fadeIn" leave-active-class="animated fadeOut" mode="out-in">
			<h2 v-if="carregando">Carregando...</h2>
			<form @submit.prevent="salvar" v-else>
				<div class="row">
					<h1>{{ titulo }}</h1>
				</div>
				<div class="row">
					<div class="form-control col-50">
						<label for="placa">Placa*</label>
						<input id="placa" name="placa" type="text" v-model="veiculo.placa" v-validate="'required'" data-vv-as="'Placa'"  :class="{danger: errors.has('placa')}">
					</div>
					<div class="form-control col-50">
						<label for="modelo">Modelo*</label>
						<input id="modelo" name="modelo" type="text" v-model="veiculo.modelo" v-validate="'required'" data-vv-as="'Modelo'" :class="{danger: errors.has('modelo')}">
					</div>
				</div>
				<div class="row">
					<div class="form-control col-50">
						<label for="marca">Marca*</label>
						<input id="marca" name="marca" type="text" v-model="veiculo.marca" v-validate="'required'" data-vv-as="'Marca'" :class="{danger: errors.has('marca')}">
					</div>
					<div class="form-control col-50">
						<label for="imagem">Foto</label>
						<input id="imagem" type="text" v-model="veiculo.imagem">
					</div>
				</div>
				<div class="row">
					<div class="form-control col-50">
						<label for="combustivel">Combustível</label>
						<input id="combustivel" type="text" v-model="veiculo.combustivel">
					</div>
					<div class="form-control col-50">
						<label for="valor">Valor</label>
						<input id="valor" type="text" v-model="veiculo.valor">
					</div>
				</div>
				<div class="row">
					<button class="btn success" :disabled="salvando">Salvar</button>
					<button class="btn danger" @click="voltar" :disabled="salvando">Cancelar</button>
				</div>
			</form>
		</transition>
	</div>
</template>

<script>
import Veiculo from './../../model/veiculos'
import { buscar, salvar } from './../../api/veiculos'

export default {
	name: 'cadasrto-veiculos',
	data() {
		return {
			veiculo: new Veiculo(),
			salvando: false,
			carregando: true
		}
	},
	methods: {
		async salvar() {
			try {
				const success = await this.$validator.validateAll()
				if (!success) return
				this.salvando = true
				this.veiculo.valido()
				await salvar(this.veiculo)
				this.voltar()
			} finally {
				this.salvando = false
			}
		},
		voltar() {
			this.$router.push({ path: '/' })
		}
	},
	computed: {
		titulo() {
			if (this.$route.params.id) return 'Editando carro'
			return 'Cadastrando carro'
		}
	},
	async mounted() {
		try {
			if (this.$route.params.id) {
				this.carregando = true
				this.veiculo = await buscar(this.$route.params.id)
			}
		} finally {
			this.carregando = false
		}
	}
}
</script>

<style>
</style>
