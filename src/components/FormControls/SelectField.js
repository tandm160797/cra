/* eslint-disable */
import { FormControl, FormHelperText, FormLabel, Grid, MenuItem, Select } from '@mui/material'
import _get from 'lodash/get'
import PropTypes from 'prop-types'
import React from 'react'
import { Controller } from 'react-hook-form'

const SelectField = ({
	name,
	control,
	formState,
	error,
	inputProps,
	helperText,
	options,
	label,
	labelProps,
	layout,
	disabled,
	...props
}) => {
	const { errors = {} } = formState
	return (
		<Controller
			name={name}
			control={control}
			render={({ field }) => (
				<FormControl
					fullWidth
					{...props}
					disabled={disabled}
					error={error || !!_get(errors, `${name}.message`)}
					helperText={helperText || _get(errors, `${name}.message`)}
				>
					<Grid container {...layout.grid}>
						<Grid item {...layout.label}>
							{!!label && <FormLabel {...labelProps}>{label}</FormLabel>}
						</Grid>
						<Grid item {...layout.input}>
							<Select
								displayEmpty
								defaultValue=""
								fullWidth
								size="small"
								{...field}
								disabled={disabled}
								error={error || !!_get(errors, `${name}.message`)}
								helperText={helperText || _get(errors, `${name}.message`)}
							>
								{options &&
									options.map(item => (
										<MenuItem value={item.value} key={item.value}>
											{item.label}
										</MenuItem>
									))}
							</Select>
						</Grid>
						<Grid item xs={12}>
							<Grid container>
								<Grid item {...layout.label} />
								<Grid item {...layout.input}>
									<FormHelperText sx={{ mx: 0 }}>{helperText || _get(errors, `${name}.message`)}</FormHelperText>
								</Grid>
							</Grid>
						</Grid>
					</Grid>
				</FormControl>
			)}
		/>
	)
}

SelectField.propTypes = {
	name: PropTypes.string.isRequired,
	control: PropTypes.object.isRequired,
	formState: PropTypes.object.isRequired,
	options: PropTypes.array.isRequired,

	error: PropTypes.bool,
	required: PropTypes.bool,
	autoFocus: PropTypes.bool,
	disabled: PropTypes.bool,

	inputProps: PropTypes.object,
	type: PropTypes.string,

	margin: PropTypes.string,
	variant: PropTypes.string,
	label: PropTypes.string,
	helperText: PropTypes.string,
	autoComplete: PropTypes.string,
	labelProps: PropTypes.object,
	layout: PropTypes.object
}

SelectField.defaultProps = {
	error: false,
	required: false,
	autoFocus: false,
	disabled: false,

	inputProps: null,
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

export default SelectField
