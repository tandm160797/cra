import { createTheme } from '@mui/material'
import { useCallback, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectMode } from 'redux/selectors/colorModeSelector'
import { toggleMode } from 'redux/slices/colorModeSlice'

const useColorTheme = () => {
	const dispatch = useDispatch()

	const mode = useSelector(selectMode)

	const theme = useMemo(
		() =>
			createTheme({
				palette: {
					mode
				}
			}),
		[mode]
	)

	const toggleColorTheme = useCallback(() => {
		dispatch(toggleMode())
	}, [dispatch])

	return {
		theme,
		toggleColorTheme
	}
}

export default useColorTheme
