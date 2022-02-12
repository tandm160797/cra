/* eslint-disable */
import { FormControl, FormHelperText, FormLabel, Grid } from '@mui/material'
import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'
import _get from 'lodash/get'
import PropTypes from 'prop-types'
import React, { useCallback, useMemo, useRef, useState } from 'react'
import { Controller } from 'react-hook-form'
import countryJSON from 'src/configs/country.json'

const countryList = countryJSON.map(item => ({
	name: item.countryName,
	value: item.countryName
}))

const CountryField = props => {
	const {
		name,
		label,
		control,
		formState,

		error,
		helperText,
		layout,
		labelProps,
		disabled,
		...others
	} = props

	const { errors } = formState

	const [open, setOpen] = useState(false)
	const typingTimeoutRef = useRef(null)
	const [searchTerm, setSearchTerm] = useState('')

	const onInputChange = useCallback((evt, value) => {
		if (typingTimeoutRef.current) {
			clearTimeout(typingTimeoutRef.current)
		}
		typingTimeoutRef.current = setTimeout(() => {
			setSearchTerm(value)
		}, 300)
	})

	const options = useMemo(
		() => countryList.filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase())),
		[searchTerm]
	)

	return (
		<Controller
			name={name}
			control={control}
			render={({ field: { onChange, value, ...field } }) => (
				<FormControl {...others} error={error || !!_get(errors, `${name}.message`)}>
					<Grid container {...layout.grid}>
						<Grid item {...layout.label}>
							{!!label && <FormLabel {...labelProps}>{label}</FormLabel>}
						</Grid>
						<Grid item {...layout.input}>
							<Autocomplete
								autoSelect
								disabled={disabled}
								{...field}
								size="small"
								open={open}
								options={options}
								onInputChange={onInputChange}
								fullWidth={others.fullWidth}
								onOpen={() => setOpen(true)}
								onClose={() => setOpen(false)}
								value={value && value.value ? value : { value: '', name: '' }}
								isOptionEqualToValue={(opt, v) => opt.name === v.name}
								getOptionSelected={(opt, v) => opt.name === v.name}
								getOptionLabel={opt => opt.name}
								onChange={(_, v) => onChange(v)}
								renderInput={params => (
									<>
										<TextField
											size="small"
											error={error || !!errors[name]}
											{...params}
											InputProps={{
												...params.InputProps
											}}
										/>
										<Grid item xs={12}>
											<Grid container>
												<Grid item {...layout.label} />
												<Grid item {...layout.input}>
													<FormHelperText sx={{ mx: 0 }}>
														{helperText || _get(errors, `${name}.message`)}
													</FormHelperText>
												</Grid>
											</Grid>
										</Grid>
									</>
								)}
							/>
						</Grid>
					</Grid>
				</FormControl>
			)}
		/>
	)
}

CountryField.propTypes = {
	name: PropTypes.string.isRequired,
	control: PropTypes.object.isRequired,
	formState: PropTypes.object.isRequired,

	error: PropTypes.bool,
	required: PropTypes.bool,
	fullWidth: PropTypes.bool,
	autoFocus: PropTypes.bool,
	disabled: PropTypes.bool,

	margin: PropTypes.string,
	variant: PropTypes.string,
	label: PropTypes.string,
	helperText: PropTypes.string,
	labelProps: PropTypes.object,
	layout: PropTypes.object
}

CountryField.defaultProps = {
	error: false,
	required: false,
	fullWidth: true,
	autoFocus: false,
	disabled: false,

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

export default CountryField
