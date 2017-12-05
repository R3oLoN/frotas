import Vue from 'vue'

const formatter = Intl.NumberFormat('pt-BR', {
	minimumFractionDigits: 2,
	currency: 'BRL'
}).format

Vue.filter('currency', valor => {
	if (valor === null || valor === undefined) return valor
	return formatter(valor)
})
