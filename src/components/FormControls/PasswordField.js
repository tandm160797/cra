import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import { FormControl, FormHelperText, FormLabel, Grid, TextField } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { Controller } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

const PasswordField = props => {
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

	const [showPassword, setShowPassword] = useState(false)

	const toggleShowPassword = () => {
		setShowPassword(!showPassword)
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
								inputProps={{ onBlur, onChange }}
								value={value}
								error={!!errors[name]}
								type={showPassword ? 'text' : 'password'}
								/* eslint-disable-next-line */
								InputProps={{
									endAdornment: (
										<InputAdornment position="end">
											<IconButton edge="end" onClick={toggleShowPassword}>
												{showPassword ? <Visibility /> : <VisibilityOff />}
											</IconButton>
										</InputAdornment>
									)
								}}
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

PasswordField.propTypes = {
	name: PropTypes.string.isRequired,
	control: PropTypes.object.isRequired,
	formState: PropTypes.object.isRequired,

	label: PropTypes.string,
	helperText: PropTypes.string,
	layout: PropTypes.object
}

PasswordField.defaultProps = {
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

export default PasswordField
