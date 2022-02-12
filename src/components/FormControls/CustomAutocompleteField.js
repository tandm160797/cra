/* eslint-disable */
import { Autocomplete, CircularProgress, FormControl, FormHelperText, FormLabel, Grid, TextField } from '@mui/material'
import _get from 'lodash/get'
import PropTypes from 'prop-types'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Controller } from 'react-hook-form'
import authAxios from 'src/utils/authAxios'

const AutocompleteField = props => {
	const {
		name,
		label,
		control,
		formState,

		model,
		queryField,
		getOptionLabel,
		getOptionFilter,

		error,
		helperText,
		layout,
		labelProps,
		disabled,
		...others
	} = props

	const { errors } = formState

	const [open, setOpen] = useState(false)
	const [searchTerm, setSearchTerm] = useState('')
	const [_options, setOptions] = useState([])

	const typingTimeoutRef = useRef(null)
	const optionsRef = useRef([])

	const options = useMemo(() => (!_options ? [] : _options.filter(getOptionFilter)), [_options, getOptionFilter])

	const loading = open && !options.length

	const onInputChange = useCallback((evt, value) => {
		if (typingTimeoutRef.current) {
			setOptions([])
			clearTimeout(typingTimeoutRef.current)
		}
		typingTimeoutRef.current = setTimeout(() => {
			setSearchTerm(value)
		}, 300)
	})

	useEffect(() => {
		let active = true
		const getList = async () => {
			const { data } = await authAxios.get(`/${model}/autocomplete?${queryField}=${searchTerm}`)
			if (active && optionsRef) {
				if (data.length) {
					optionsRef.current = data
					setOptions(data)
				} else {
					setOptions(optionsRef.current || [])
				}
			}
		}
		getList()

		return () => {
			active = false
		}
	}, [searchTerm])

	return (
		<Controller
			name={name}
			control={control}
			render={({ field: { onChange, ...field } }) => (
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
								loading={loading}
								onInputChange={onInputChange}
								fullWidth={others.fullWidth}
								onOpen={() => setOpen(true)}
								onClose={() => setOpen(false)}
								isOptionEqualToValue={(opt, value) => opt[queryField] === value[queryField]}
								getOptionSelected={(opt, value) => opt[queryField] === value[queryField]}
								getOptionLabel={opt => getOptionLabel(opt, queryField)}
								onChange={(_, value) => onChange(value)}
								renderInput={params => (
									<>
										<TextField
											size="small"
											error={error || !!errors[name]}
											{...params}
											InputProps={{
												...params.InputProps,
												endAdornment: (
													<>
														{loading ? <CircularProgress color="inherit" size={20} /> : null}
														{params.InputProps.endAdornment}
													</>
												)
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

AutocompleteField.propTypes = {
	name: PropTypes.string.isRequired,
	control: PropTypes.object.isRequired,
	formState: PropTypes.object.isRequired,

	model: PropTypes.string.isRequired,
	queryField: PropTypes.string.isRequired,
	getOptionLabel: PropTypes.func,
	getOptionFilter: PropTypes.func,

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

AutocompleteField.defaultProps = {
	error: false,
	required: false,
	fullWidth: true,
	autoFocus: false,
	disabled: false,

	getOptionFilter: item => !!item,
	getOptionLabel: (opt, queryField) => opt[queryField],

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

export default AutocompleteField
