<template>
	<div class="content">
		<div class="row">
			<a class="btn success" href="#/novo">Novo Carro</a>
			<transition enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
				<button class="btn primary" @click="editar" v-if="contSelected === 1">Editar Carro</button>
			</transition>
			<transition enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
				<button class="btn danger" :disabled="!hasSelected || excluindo" @click="excluir" v-if="contSelected > 0">Excluir Carro</button>
			</transition>
		</div>
		<div class="row">
			<table>
				<thead>
					<tr>
						<th class="select">
							<input type="checkbox" v-model="selectAll" @change="selectAllChange()">
						</th>
						<th>Placa</th>
						<th>Modelo</th>
						<th>Marca</th>
						<th>foto</th>
						<th>Combustível</th>
						<th class="number">Valor</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="veiculo in veiculos" :class="{'selected-row': veiculo.selected}" :key="veiculo.id">
						<td class="select">
							<input type="checkbox" v-model="veiculo.selected" @change="selectRow(veiculo)">
						</td>
						<td>{{ veiculo.placa }}</td>
						<td>{{ veiculo.modelo }}</td>
						<td>{{ veiculo.marca }}</td>
						<td>
							<a :href="veiculo.imagem" target="blank" v-if="veiculo.imagem">imagem</a>
							<span v-else>Sem foto</span>
						</td>
						<td>{{ veiculo.combustivel }}</td>
						<td class="number">{{ veiculo.valor | currency }}</td>
					</tr>
				</tbody>
			</table>
		</div>
		<div class="row">
			<div class="pagination">
				<div class="pages">
					<button class="btn previous" :disabled="currentPage === 1" @click="prev">&#60&#60</button>
					<button class="btn" v-for="page in lastPages" :key="page" :class="{selected: page === currentPage}" :disabled="page === currentPage" @click="selectPage(page)">{{ page }}</button>
					<button class="btn next" :disabled="currentPage === lastPages" @click="next">&#62&#62</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script scoped>
import { listar, excluir } from './../../api/veiculos'
export default {
	name: 'veiculo-lista',
	data() {
		return {
			selectAll: false,
			currentPage: 1,
			total: 0,
			veiculos: [],
			excluindo: false
		}
	},
	methods: {
		selectRow(veiculo) {
			if (this.selectAll && !veiculo.selected) {
				this.selectAll = false
			}
			for (const v of this.veiculos) {
				if (v.selected) {
					this.selectAll = true
				} else {
					this.selectAll = false
					break
				}
			}
		},
		selectAllChange() {
			this.veiculos.forEach(veiculo => {
				veiculo.selected = this.selectAll
			})
		},
		async listar() {
			try {
				const { veiculos, total } = await listar({}, this.currentPage)
				this.veiculos = veiculos
				this.total = total
				this.selectAll = false
			} catch (err) {
				console.error(err)
			}
		},
		async excluir() {
			this.excluindo = true
			for (const veiculo of this.veiculos) {
				if (veiculo.selected) {
					await excluir(veiculo)
				}
			}
			this.excluindo = false
			this.listar()
		},
		prev() {
			this.currentPage--
			this.listar()
		},
		next() {
			this.currentPage++
			this.listar()
		},
		selectPage(page) {
			this.currentPage = page
			this.listar()
		},
		editar() {
			for (const veiculo of this.veiculos) {
				if (veiculo.selected) {
					this.$router.push({ path: `/editar/${veiculo.id}` })
					break
				}
			}
		}
	},
	computed: {
		lastPages() {
			let lastPage = Math.trunc(this.total / 5)
			if (this.total % 5 > 0) {
				lastPage++
			}
			if (this.currentPage > lastPage) {
				this.currentPage = lastPage
				this.listar()
			}
			return lastPage
		},
		hasSelected() {
			for (const veiculo of this.veiculos) {
				if (veiculo.selected) {
					return true
				}
			}
			return false
		},
		contSelected() {
			let select = 0
			for (const veiculo of this.veiculos) {
				if (veiculo.selected) {
					select++
				}
			}
			return select
		}
	},
	mounted() {
		this.listar()
	}
}
</script>

<style scoped>
.pagination {
  text-align: center;
  width: 100%;
}

.pagination .pages {
  display: inline-flex;
}

.pagination .btn {
  color: #4a6986;
  margin-right: 0;
  border-radius: 0;
  border: 1px solid #d5dde5;
  border-right: none;
}
.pagination .btn:hover {
  background-color: #fffaeb;
}

.pagination .btn.previous {
  border-radius: 4px 0 0 4px;
}

.pagination .btn.next {
  border-right: 1px solid #d5dde5;
  border-radius: 0 4px 4px 0;
}

.selected {
  background-color: #d8e9fb;
  border-color: #c1dff8;
}

table {
  width: 100%;
  max-width: 100%;
  border-collapse: collapse;
  box-sizing: border-box;
  color: #446482;
  background-color: transparent;
}

table th {
  border-top: 1px solid #d5dde5;
}

table th:first-child {
  border-top-left-radius: 4px;
}

table th:last-child {
  border-top-right-radius: 4px;
}

table th:last-child,
table td:last-child {
  border-right: 1px solid #d5dde5;
}

table thead th,
table tbody td {
  padding: 8px 16px;
  border-bottom: 1px solid #d5dde5;
  border-left: 1px solid #d5dde5;
}

table tbody th:last-of-type {
  border-bottom: none;
}

table thead {
  background-color: #f8fafc;
  font-weight: 500;
}

table tbody {
  background-color: #fff;
}

table tbody tr:hover td {
  background-color: #fffaeb;
}

table tbody tr.selected-row td {
  background-color: #d8e9fb;
  border-color: #c1dff8;
}

table thead th,
table tbody td {
  text-align: left;
}

table thead th.select,
table tbody td.select {
  text-align: center;
}

table thead th.number,
table tbody td.number {
  text-align: right;
}

table .select input[type="checkbox"] {
  cursor: pointer;
}
</style>
