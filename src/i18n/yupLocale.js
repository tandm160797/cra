import { toTitleCase } from 'utils/textCase'

const yupLocale = {
	mixed: {
		default: ({ path }) => ({ key: 'yup.mixed.default', values: { path: toTitleCase(path) } }),
		required: ({ path }) => ({ key: 'yup.mixed.required', values: { path: toTitleCase(path) } }),
		oneOf: ({ path, values }) => ({ key: 'yup.mixed.oneOf', values: { path: toTitleCase(path), values } }),
		notOneOf: ({ path, values }) => ({ key: 'yup.mixed.notOneOf', values: { path: toTitleCase(path), values } }),
		notType: ({ path, type }) => ({ key: 'yup.mixed.notType', values: { path: toTitleCase(path), type } }),
		defined: ({ path }) => ({ key: 'yup.mixed.defined', values: { path: toTitleCase(path) } })
	},
	string: {
		length: ({ path, length }) => ({ key: 'yup.string.length', values: { path: toTitleCase(path), length } }),
		min: ({ path, min }) => ({ key: 'yup.string.min', values: { path: toTitleCase(path), min } }),
		max: ({ path, max }) => ({ key: 'yup.string.max', values: { path: toTitleCase(path), max } }),
		matches: ({ path, regex }) => ({ key: 'yup.string.matches', values: { path: toTitleCase(path), regex } }),
		email: ({ path }) => ({ key: 'yup.string.email', values: { path: toTitleCase(path) } }),
		url: ({ path }) => ({ key: 'yup.string.url', values: { path: toTitleCase(path) } }),
		uuid: ({ path }) => ({ key: 'yup.string.uuid', values: { path: toTitleCase(path) } }),
		trim: ({ path }) => ({ key: 'yup.string.trim', values: { path: toTitleCase(path) } }),
		lowercase: ({ path }) => ({ key: 'yup.string.lowercase', values: { path: toTitleCase(path) } }),
		uppercase: ({ path }) => ({ key: 'yup.string.uppercase', values: { path: toTitleCase(path) } })
	},
	number: {
		min: ({ path, min }) => ({ key: 'yup.number.min', values: { path: toTitleCase(path), min } }),
		max: ({ path, max }) => ({ key: 'yup.number.max', values: { path: toTitleCase(path), max } }),
		lessThan: ({ path, less }) => ({ key: 'yup.number.lessThan', values: { path: toTitleCase(path), less } }),
		moreThan: ({ path, more }) => ({ key: 'yup.number.moreThan', values: { path: toTitleCase(path), more } }),
		positive: ({ path }) => ({ key: 'yup.number.positive', values: { path: toTitleCase(path) } }),
		negative: ({ path }) => ({ key: 'yup.number.negative', values: { path: toTitleCase(path) } }),
		integer: ({ path }) => ({ key: 'yup.number.integer', values: { path: toTitleCase(path) } })
	},
	date: {
		min: ({ path, min }) => ({ key: 'yup.min.min', values: { path: toTitleCase(path), min } }),
		max: ({ path, max }) => ({ key: 'yup.min.max', values: { path: toTitleCase(path), max } })
	},
	boolean: {
		isValue: ({ path, value }) => ({ key: 'yup.boolean.isValue', values: { path: toTitleCase(path), value } })
	},
	object: {
		noUnknown: ({ path, unknown }) => ({ key: 'yup.boolean.noUnknown', values: { path: toTitleCase(path), unknown } })
	},
	array: {
		min: ({ path, min }) => ({ key: 'yup.array.min', values: { path: toTitleCase(path), min } }),
		max: ({ path, max }) => ({ key: 'yup.array.max', values: { path: toTitleCase(path), max } }),
		length: ({ path, length }) => ({ key: 'yup.array.default', values: { path: toTitleCase(path), length } })
	}
}

export default yupLocale
