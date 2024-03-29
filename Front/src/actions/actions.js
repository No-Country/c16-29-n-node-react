import { getAccessToken } from "../utils/accessToken";
import { AxiosInstance } from "../utils/axios";
export const SET_SELECTED_OPTIONS = "SET_SELECTED_OPTIONS";
export const SET_TUTORS_SELECTED_OPTIONS = "SET_TUTORS_SELECTED_OPTIONS";
export const CLEAR_TUTORS_SELECTED_OPTIONS = "CLEAR_TUTORS_SELECTED_OPTIONS";
export const GET_STUDENTS = "GET_STUDENTS";
export const GET_TUTORS_OPTIONS = "GET_TUTORS_OPTIONS";
export const CREATE_STUDENT = "CREATE_STUDENT";
export const GET_BANNS = "GET_BANNS";
export const GET_EXAMS = "GET_EXAMS";
export const GET_MARKS = "GET_MARKS";

export const setSelectedTutorsOptions = (selectedTutorsOptions) => ({
  type: SET_TUTORS_SELECTED_OPTIONS,
  payload: selectedTutorsOptions,
});

export const setSelectedOptions = (selectedOptions) => ({
  type: SET_SELECTED_OPTIONS,
  payload: selectedOptions,
});

export const clearSelectedOptions = () => ({
  type: CLEAR_TUTORS_SELECTED_OPTIONS,
});

export function getStudents() {
  return async function (dispatch) {
    const token = getAccessToken();
    const json = await AxiosInstance.post(
      `users/role`,
      { role: "STUDENT" },
      { headers: { "x-access-token": token } }
    );
    return dispatch({
      type: GET_STUDENTS,
      payload: json.data,
    });
  };
}

export function getBanns() {
  return async function (dispatch) {
    const token = getAccessToken();
    const json = await AxiosInstance.get(`banns/current`, {
      headers: { "x-access-token": token },
    });
    return dispatch({
      type: GET_BANNS,
      payload: json.data,
    });
  };
}

export function getExams() {
  return async function (dispatch) {
    const token = getAccessToken();
    const json = await AxiosInstance.get(`marks/exams/current`, {
      headers: { "x-access-token": token },
    });
    return dispatch({
      type: GET_EXAMS,
      payload: json.data,
    });
  };
}

export function getMarks() {
  return async function (dispatch) {
    const token = getAccessToken();
    const json = await AxiosInstance.get(`marks/current`, {
      headers: { "x-access-token": token },
    });
    return dispatch({
      type: GET_MARKS,
      payload: json.data,
    });
  };
}

export async function editBanns(data, id) {
  const token = getAccessToken();
  const json = await AxiosInstance.put(`banns/${id}`, data, {
    headers: { "x-access-token": token },
  });
  return json;
}

export async function editMark(data, id) {
  const token = getAccessToken();
  const json = await AxiosInstance.put(`marks/${id}`, data, {
    headers: { "x-access-token": token },
  });
  return json;
}

export async function createMark(data) {
  const token = getAccessToken();
  const json = await AxiosInstance.post(`marks`, data, {
    headers: { "x-access-token": token },
  });
  return json;
}

export async function getMarksByExamId(id) {
  const token = getAccessToken();
  const res = await AxiosInstance.get(`marks/exams/${id}`, {
    headers: { "x-access-token": token },
  });
  return res.data;
}

export async function createStudent(data) {
  const token = getAccessToken();
  const json = await AxiosInstance.post(`users/`, data, {
    headers: { "x-access-token": token },
  });
  return json;
}

export async function editStudent(data, id) {
  const token = getAccessToken();
  const json = await AxiosInstance.put(`users/${id}`, data, {
    headers: { "x-access-token": token },
  });
  return json;
}

export async function deleteStudent(id) {
  const token = getAccessToken();
  const json = await AxiosInstance.delete(`users/${id}`, {
    headers: { "x-access-token": token },
  });
  return json;
}

export async function deleteBann(id) {
  const token = getAccessToken();
  const json = await AxiosInstance.delete(`banns/${id}`, {
    headers: { "x-access-token": token },
  });
  return json;
}

export function getTutorsOptions() {
  return async function (dispatch) {
    const token = getAccessToken();
    const json = await AxiosInstance.post(
      `users/role`,
      { role: "TUTOR" },
      { headers: { "x-access-token": token } }
    );
    return dispatch({
      type: GET_TUTORS_OPTIONS,
      payload: json.data,
    });
  };
}
