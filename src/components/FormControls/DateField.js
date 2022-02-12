/* eslint-disable */
import MobileDatePicker from '@material-ui/lab/MobileDatePicker'
import { FormControl, FormHelperText, FormLabel, Grid, TextField } from '@mui/material'
import _get from 'lodash/get'
import PropTypes from 'prop-types'
import React from 'react'
import { Controller } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

const DateField = props => {
	const { t } = useTranslation()
	const {
		name,
		control,
		formState,
		layout = {},

		label,
		error,
		helperText,
		labelProps,
		...others
	} = props

	const { errors = {} } = formState

	return (
		<Controller
			name={name}
			control={control}
			render={({ field: { onChange, ...fields } }) => (
				<FormControl fullWidth {...others} error={error || !!_get(errors, `${name}.message`)}>
					<Grid container {...layout.grid}>
						<Grid item {...layout.label}>
							{!!label && <FormLabel {...labelProps}>{label}</FormLabel>}
						</Grid>
						<Grid item {...layout.input}>
							<MobileDatePicker
								{...others}
								{...fields}
								onChange={onChange}
								renderInput={inputProps => (
									<TextField
										fullWidth
										size="small"
										{...inputProps}
										error={error || !!_get(errors, `${name}.message`)}
									/>
								)}
							/>
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

DateField.propTypes = {
	name: PropTypes.string.isRequired,
	control: PropTypes.object.isRequired,
	formState: PropTypes.object.isRequired,
	error: PropTypes.bool,
	inputProps: PropTypes.object,
	label: PropTypes.string,
	helperText: PropTypes.string,
	labelProps: PropTypes.object,
	layout: PropTypes.object
}

DateField.defaultProps = {
	label: '',
	error: false,
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

export default DateField
