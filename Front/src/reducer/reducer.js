import { SET_SELECTED_OPTIONS } from '../actions/actions'

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
    default:
      return state;
  }
}

export default rootReducer