import { SET_SELECTED_OPTIONS, SET_TUTORS_SELECTED_OPTIONS, CLEAR_TUTORS_SELECTED_OPTIONS, GET_STUDENTS, GET_TUTORS_OPTIONS } from '../actions/actions'

const initialState = {
  selectedTutorsOptions: [],
  selectedOptions: [],
  students: [],
  tutorsOptions: [],
}

const selectReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SELECTED_OPTIONS:
      return {
        ...state,
        selectedOptions: action.payload,
      }
    case SET_TUTORS_SELECTED_OPTIONS:
      console.log(action.payload);
      return {
        ...state,
        selectedTutorsOptions: action.payload,
      }
    case CLEAR_TUTORS_SELECTED_OPTIONS:
      return {
        ...state,
        selectedOptions: [],
      }
    case GET_STUDENTS:
      return {
        ...state,
        students: action.payload,
      }
    case GET_TUTORS_OPTIONS:
      function getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
      }
      const tutorsOptions = action.payload.map(tutor => ({
        ...tutor,
        value: `tutor-${tutor.id}`,
        color: getRandomColor(),
        label: `${tutor.first_name} ${tutor.last_name}`,
      }));

      return {
        ...state,
        tutorsOptions: tutorsOptions,
      };
    default:
      return state
  }
}

export default selectReducer