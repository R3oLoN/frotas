import { required } from '../business/validations'

export default class Veiculo {
	id
	placa
	imagem
	marca
	modelo
	combustivel
	valor

	constructor(id, placa, imagem, marca, modelo, combustivel, valor) {
		this.id = id
		this.placa = placa
		this.imagem = imagem
		this.marca = marca
		this.modelo = modelo
		this.combustivel = combustivel
		this.valor = valor
	}

	valido() {
		required('Placa', this.placa)
		required('Marca', this.marca)
		required('Modelo', this.modelo)
	}
}
