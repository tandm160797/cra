import { FormControl, FormHelperText, FormLabel, Grid, Switch } from '@mui/material'
import PropTypes from 'prop-types'
import React from 'react'
import { Controller } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

const SwitchField = props => {
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

	return (
		<Controller
			name={name}
			control={control}
			render={({ field: { ref, onBlur, onChange, value } }) => (
				<FormControl error={!!errors[name]} {...rest}>
					<Grid container {...layout.grid}>
						<Grid item {...layout.label}>
							<FormLabel htmlFor={name} focused={false}>
								{label}
							</FormLabel>
						</Grid>
						<Grid item {...layout.input}>
							<Switch
								size="small"
								edge="start"
								id={name}
								inputRef={ref}
								inputProps={{ onBlur, onChange }}
								checked={!!value}
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

SwitchField.propTypes = {
	name: PropTypes.string.isRequired,
	control: PropTypes.object.isRequired,
	formState: PropTypes.object.isRequired,

	label: PropTypes.string,
	helperText: PropTypes.string,
	layout: PropTypes.object
}

SwitchField.defaultProps = {
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

export default SwitchField
