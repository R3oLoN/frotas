import MandatoryException from './exceptions/mandatory.exception'

export function required(field, value) {
	if (value === null || value === undefined || !value.trim()) throw new MandatoryException(field, `O campo ${field} é obrigatório.`)
}
