import axios from "axios"
import { getAccessToken } from "../utils/accessToken"
export const SET_SELECTED_OPTIONS = 'SET_SELECTED_OPTIONS'
export const SET_TUTORS_SELECTED_OPTIONS = 'SET_TUTORS_SELECTED_OPTIONS'
export const CLEAR_TUTORS_SELECTED_OPTIONS = 'CLEAR_TUTORS_SELECTED_OPTIONS'
export const GET_STUDENTS = 'GET_STUDENTS'
export const GET_TUTORS_OPTIONS = 'GET_TUTORS_OPTIONS'
export const CREATE_STUDENT = 'CREATE_STUDENT'



export const setSelectedTutorsOptions = (selectedTutorsOptions) => ({
  type: SET_TUTORS_SELECTED_OPTIONS,
  payload: selectedTutorsOptions,
})

export const setSelectedOptions = (selectedOptions) => ({
  type: SET_SELECTED_OPTIONS,
  payload: selectedOptions,
})

export const clearSelectedOptions = () => ({
  type: CLEAR_TUTORS_SELECTED_OPTIONS,
})

export function getStudents() {
  return async function (dispatch) {
    const token = getAccessToken()
    const json = await axios.post(`https://no-country-backend-dev-srdg.1.us-1.fl0.io/api/users/role`,
      { role: "STUDENT" },
      { headers: { "x-access-token": token } }
    );
    return dispatch({
      type: GET_STUDENTS,
      payload: json.data
    });
  };
}

export function createStudent() {
  return async function (dispatch) {
    const token = getAccessToken()
    const json = await axios.post(`https://no-country-backend-dev-srdg.1.us-1.fl0.io/api/users/role`,
      { role: "STUDENT" },
      { headers: { "x-access-token": token } }
    );
    return dispatch({
      type: CREATE_STUDENT,
      payload: json.data
    });
  };
}

export function getTutorsOptions() {
  return async function (dispatch) {
    const token = getAccessToken()
    const json = await axios.post(`https://no-country-backend-dev-srdg.1.us-1.fl0.io/api/users/role`,
      { role: "TUTOR" },
      { headers: { "x-access-token": token } }
    );
    return dispatch({
      type: GET_TUTORS_OPTIONS,
      payload: json.data
    });
  };
}


