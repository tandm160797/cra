import { FormControl, FormControlLabel, FormHelperText, FormLabel, Grid, Radio, RadioGroup } from '@mui/material'
import PropTypes from 'prop-types'
import React from 'react'
import { Controller } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

const RadioField = props => {
	const { t } = useTranslation()
	const {
		name,
		control,
		formState,

		options,

		row,
		label,
		helperText,
		layout,
		...rest
	} = props

	const { errors } = formState

	return (
		<Controller
			name={name}
			control={control}
			render={({ field: renderFields }) => (
				<FormControl error={!!errors[name]} {...rest}>
					<Grid container {...layout.grid}>
						<Grid item {...layout.label}>
							<FormLabel htmlFor={name} focused={false}>
								{label}
							</FormLabel>
						</Grid>
						<Grid item {...layout.input}>
							<RadioGroup row={row} {...renderFields}>
								{options.map(option => (
									<FormControlLabel key={option.value} control={<Radio size="small" {...rest} />} {...option} />
								))}
							</RadioGroup>
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

RadioField.propTypes = {
	name: PropTypes.string.isRequired,
	control: PropTypes.object.isRequired,
	formState: PropTypes.object.isRequired,

	options: PropTypes.arrayOf(
		PropTypes.shape({
			label: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
			value: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
		})
	).isRequired,

	row: PropTypes.bool,
	label: PropTypes.string,
	helperText: PropTypes.string,
	layout: PropTypes.object
}

RadioField.defaultProps = {
	row: false,
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

export default RadioField
