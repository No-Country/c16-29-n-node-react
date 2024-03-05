import { SET_SELECTED_OPTIONS, CLEAR_SELECTED_OPTIONS } from '../actions/actions'

const initialState = {
  selectedOptions: [],
}

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SELECTED_OPTIONS:
      return {
        ...state,
        selectedOptions: action.payload,
      }
    case CLEAR_SELECTED_OPTIONS:
      return {
        ...state,
        selectedOptions: [],
      }
    default:
      return state
  }
}

export default rootReducer