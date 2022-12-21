import axios from "axios";
import { GET_TODOS } from "../store/actions/actionTypes";
export const getTodos = () => {
  return async function (dispatch: any) {
    return axios.get(`https://jsonplaceholder.typicode.com/todos`).then((response) => {
      dispatch({
        type: GET_TODOS,
        payload: response.data,
      });
    });
  };
};
