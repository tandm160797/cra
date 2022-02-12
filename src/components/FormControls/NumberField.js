import { FormControl, FormHelperText, FormLabel, Grid, TextField } from '@mui/material'
import PropTypes from 'prop-types'
import React from 'react'
import { Controller } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

const NumberField = props => {
	const { t } = useTranslation()
	const {
		name,
		control,
		formState,

		label,
		helperText,
		layout,
		...rest
	} = props

	const { errors } = formState

	const handleChange = (evt, onChange, value) => {
		const currentValue = evt.target.value
		const onlyNumberPattern = /^-?[0-9]*\.?[0-9]*$/
		const startsWithDbZeroPattern = /^-0[0-9]|^0[0-9]/

		if (currentValue === '') {
			onChange('')
		} else if (onlyNumberPattern.test(currentValue)) {
			onChange(startsWithDbZeroPattern.test(currentValue) ? `${parseInt(currentValue)}` : currentValue)
		} else {
			onChange(value || '')
		}
	}

	return (
		<Controller
			name={name}
			control={control}
			render={({ field: { ref, onBlur, onChange, value } }) => (
				<FormControl fullWidth error={!!errors[name]} {...rest}>
					<Grid container {...layout.grid}>
						<Grid item {...layout.label}>
							<FormLabel htmlFor={name} focused={false}>
								{label}
							</FormLabel>
						</Grid>
						<Grid item {...layout.input}>
							<TextField
								size="small"
								id={name}
								inputRef={ref}
								inputProps={{
									onBlur,
									onChange: evt => {
										handleChange(evt, onChange, value)
									}
								}}
								value={value}
								error={!!errors[name]}
								{...rest}
							/>
						</Grid>
						{(!!errors[name] || helperText) && (
							<Grid item {...layout.input}>
								<FormHelperText sx={{ mx: 0 }}>
									{t(errors[name]?.message.key, errors[name]?.message.values) || helperText}
								</FormHelperText>
							</Grid>
						)}
					</Grid>
				</FormControl>
			)}
		/>
	)
}

NumberField.propTypes = {
	name: PropTypes.string.isRequired,
	control: PropTypes.object.isRequired,
	formState: PropTypes.object.isRequired,

	label: PropTypes.string,
	helperText: PropTypes.string,
	layout: PropTypes.object
}

NumberField.defaultProps = {
	label: '',
	helperText: '',
	layout: {
		grid: {
			my: 1
		},
		label: {
			xs: 12
		},
		input: {
			xs: 12
		}
	}
}

export default NumberField
