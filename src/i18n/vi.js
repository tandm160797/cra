const vi = {
	text: {
		changeLanguage: 'Thay đổi ngôn ngữ'
	},

	// See more at https://github.com/jquense/yup/blob/master/src/locale.ts
	yup: {
		mixed: {
			default: '{{path}} không hợp lệ',
			required: '{{path}} là trường bắt buộc',
			oneOf: '{{path}} phải là một trong các giá trị sau: {{values}}',
			notOneOf: '{{path}} không được là một trong các giá trị sau: {{values}}',
			notType: '{{path}} phải là một {{type}}',
			defined: '{{path}} phải được định nghĩa'
		},
		string: {
			length: '{{path}} phải có chính xác {{length}} ký tự',
			min: '{{path}} phải có ít nhất {{min}} ký tự',
			max: '{{path}} phải có nhiều nhất {{max}} ký tự',
			matches: '{{path}} phải khớp với giá trị sau: "{{regex}}"',
			email: '{{path}} phải là một email hợp lệ',
			url: '{{path}} phải là một URL hợp lệ',
			uuid: '{{path}} phải là UUID hợp lệ',
			trim: '{{path}} phải là một chuỗi được cắt bớt',
			lowercase: '{{path}} phải là một chuỗi chữ thường',
			uppercase: '{{path}} phải là một chuỗi chữ hoa'
		},
		number: {
			min: '{{path}} phải lớn hơn hoặc bằng {min}',
			max: '{{path}} phải nhỏ hơn hoặc bằng {max}',
			lessThan: '{{path}} phải nhỏ hơn {{less}}',
			moreThan: '{{path}} phải lớn hơn {{more}}',
			positive: '{{path}} phải là một số dương',
			negative: '{{path}} phải là một số âm',
			integer: '{{path}} phải là một số nguyên'
		},
		date: {
			min: '{{path}} phải muộn hơn {{min}}',
			max: '{{path}} phải sớm hơn {{max}}'
		},
		boolean: {
			isValue: '{{path}} phải là {{value}}'
		},
		object: {
			noUnknown: '{{path}} có các khóa không xác định: {{unknown}}'
		},
		array: {
			min: '{{path}} phải có ít nhất {{min}} phần tử',
			max: '{{path}} phải có ít hơn hoặc bằng {{max}} phần tử',
			length: '{{path}} phải có {{length}} phần tử'
		}
	}
}

export default vi
