import * as actionTypes from "./actionTypes";
import axios from "axios";

export const addItem = () => {
  return {
    type: actionTypes.ADD_ITEM,
  };
};

export const deleteItem = (item: any) => {
  return {
    type: actionTypes.DELETE_ITEM,
    item: item,
  };
};

export const editItem = (item: undefined) => {
  return {
    type: actionTypes.EDIT_ITEM,
    item: item,
  };
};
export const setTitle = (title: any) => {
  return {
    type: actionTypes.SET_TITLE,
    title: title,
  };
};
export const setError = (error: any) => {
  return {
    type: actionTypes.SET_ERROR,
    error: error,
  };
};
export const setItem = (item: any) => {
  return {
    type: actionTypes.SET_ITEM,
    item: item,
  };
};
export const setEdit = () => {
  return {
    type: actionTypes.SET_EDIT,
  };
};

export const getTodos = () => {
  return async function (
    dispatch: (arg0: { type: string; payload: any }) => void
  ) {
    return axios
      .get(`https://jsonplaceholder.typicode.com/todos`)
      .then((response) => {
        dispatch({
          type: actionTypes.GET_TODOS,
          payload: response.data,
        });
      });
  };
};
