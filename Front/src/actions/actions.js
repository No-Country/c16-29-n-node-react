export const SET_SELECTED_OPTIONS = 'SET_SELECTED_OPTIONS'
export const CLEAR_SELECTED_OPTIONS = 'CLEAR_SELECTED_OPTIONS'

export const setSelectedOptions = (selectedOptions) => ({
  type: SET_SELECTED_OPTIONS,
  payload: selectedOptions,
})

export const clearSelectedOptions = () => ({
  type: CLEAR_SELECTED_OPTIONS,
})


