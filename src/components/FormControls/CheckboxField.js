/* eslint-disable */
import {
	Box,
	Checkbox,
	FormControl,
	FormControlLabel,
	FormHelperText,
	FormLabel,
	Grid,
	Typography
} from '@mui/material'
import _get from 'lodash/get'
import PropTypes from 'prop-types'
import React from 'react'
import { Controller } from 'react-hook-form'

const CheckboxField = ({
	name,
	control,
	formState,
	error,
	label,
	inputProps,
	helperText,
	options,
	layout,
	labelProps,
	...props
}) => {
	const { errors = {} } = formState

	return (
		<Controller
			name={name}
			control={control}
			render={({ field }) => {
				const values = (Array.isArray(field.value) ? field.value : [field.value]).filter(
					i => i || ['', null].includes(i)
				)

				return (
					<FormControl {...props} error={error || !!_get(errors, `${name}.message`)}>
						<Grid container {...layout.grid}>
							<Grid item {...layout.label}>
								{!!label && <FormLabel {...labelProps}>{label}</FormLabel>}
							</Grid>
							<Grid item {...layout.input}>
								{!!options &&
									options.map(item => (
										<FormControlLabel
											{...field}
											control={<Checkbox color="primary" />}
											key={item.value}
											checked={values.includes(item.value)}
											onChange={e => {
												if (e.target.checked) {
													field.onChange([...values, e.target.value])
												} else {
													field.onChange([...values.filter(v => v !== e.target.value)])
												}
											}}
											label={
												<Box sx={{ ml: 2 }}>
													<Typography color="textPrimary" variant="subtitle2">
														{item.label}
													</Typography>
												</Box>
											}
											value={item.value}
										/>
									))}
							</Grid>
						</Grid>
						<Grid item xs={12}>
							<Grid container>
								<Grid item {...layout.label} />
								<Grid item {...layout.input}>
									<FormHelperText sx={{ mx: 0 }}>{helperText || _get(errors, `${name}.message`)}</FormHelperText>
								</Grid>
							</Grid>
						</Grid>
					</FormControl>
				)
			}}
		/>
	)
}

CheckboxField.propTypes = {
	name: PropTypes.string.isRequired,
	control: PropTypes.object.isRequired,
	formState: PropTypes.object.isRequired,
	options: PropTypes.array.isRequired,

	row: PropTypes.bool,
	error: PropTypes.bool,
	required: PropTypes.bool,
	autoFocus: PropTypes.bool,
	disabled: PropTypes.bool,

	inputProps: PropTypes.object,
	defaultValue: PropTypes.array,
	type: PropTypes.string,

	margin: PropTypes.string,
	variant: PropTypes.string,
	label: PropTypes.string,
	helperText: PropTypes.string,
	autoComplete: PropTypes.string,
	labelProps: PropTypes.object,
	layout: PropTypes.object
}

CheckboxField.defaultProps = {
	error: false,
	required: false,
	autoFocus: false,
	disabled: false,

	inputProps: null,
	defaultValue: [],
	type: '',
	label: '',
	helperText: '',
	autoComplete: '',
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

export default CheckboxField
