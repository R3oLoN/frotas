import axios from 'axios'
import Veiculo from '../model/veiculos'

export async function listar(params = {}, page = 1) {
	params._page = page
	params._limit = 5
	const { data, headers } = await axios.get('/veiculos', { params })
	return {
		veiculos: data,
		total: parseInt(headers['x-total-count'])
	}
}

export async function buscar(id) {
	const { data } = await axios.get(`/veiculos/${id}`)
	return new Veiculo(
		data.id,
		data.placa,
		data.imagem,
		data.marca,
		data.modelo,
		data.combustivel,
		data.valor
	)
}

export async function salvar(veiculo) {
	if (veiculo.id) {
		const { data } = await axios.put(`/veiculos/${veiculo.id}`, veiculo)
		return data
	}
	const { data } = await axios.post('/veiculos', veiculo)
	return data
}

export async function excluir(veiculo) {
	await axios.delete(`/veiculos/${veiculo.id}`)
}
