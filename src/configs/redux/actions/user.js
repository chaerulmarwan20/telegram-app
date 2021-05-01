import axios from "axios";
import axiosApiInstance from "../../../helpers/axios";

const signUpRequest = () => {
  return { type: "SIGN_UP_REQUEST" };
};

const signUpSuccess = (data) => {
  return { type: "SIGN_UP_SUCCESS", payload: data };
};

const signUpFailure = (error) => {
  return { type: "SIGN_UP_FAILURE", payload: error };
};

const resetRequest = () => {
  return { type: "RESET_REQUEST" };
};

const resetSuccess = () => {
  return { type: "RESET_SUCCESS" };
};

const resetFailure = (error) => {
  return { type: "RESET_FAILURE", payload: error };
};

export const signUp = (data) => (dispatch) => {
  return new Promise((resolve, reject) => {
    const Url = process.env.REACT_APP_API_URL;
    dispatch(signUpRequest());
    axios
      .post(`${Url}/users/`, data)
      .then((res) => {
        dispatch(signUpSuccess(res.data.data));
        resolve(res.data.message);
      })
      .catch((err) => {
        dispatch(signUpFailure(err.response.data.message));
        reject(new Error(err.response.data.message));
      });
  });
};

export const verify = (email, token) => (dispatch) => {
  return new Promise((resolve, reject) => {
    const Url = process.env.REACT_APP_API_URL;
    axios
      .get(`${Url}/users/auth/verify/?email=${email}&token=${token}`)
      .then((res) => {
        resolve(res.data.message);
      })
      .catch((err) => {
        reject(new Error(err.response.data.message));
      });
  });
};

export const login = (data) => (dispatch) => {
  return new Promise((resolve, reject) => {
    const Url = process.env.REACT_APP_API_URL;
    axios
      .post(`${Url}/users/auth/login`, data)
      .then((res) => {
        dispatch({ type: "LOGIN", payload: res.data.data });
        localStorage.setItem("token", res.data.data.token);
        localStorage.setItem("id", res.data.data.id);
        resolve(res.data.message);
      })
      .catch((err) => {
        reject(new Error(err.response.data.message));
      });
  });
};

export const findUser = () => (dispatch) => {
  return new Promise((resolve, reject) => {
    const Url = process.env.REACT_APP_API_URL;
    axiosApiInstance
      .get(`${Url}/users/find-one`)
      .then((res) => {
        dispatch({
          type: "FIND_USER",
          payload: res.data.data[0],
        });
        resolve(res.data.data[0]);
      })
      .catch((err) => {
        reject(new Error(err.response.data.message));
      });
  });
};

export const update = (data) => (dispatch) => {
  return new Promise((resolve, reject) => {
    const Url = process.env.REACT_APP_API_URL;
    const id = localStorage.getItem("id");
    axiosApiInstance
      .put(`${Url}/users/${id}`, data)
      .then((res) => {
        resolve(res.data.message);
      })
      .catch((err) => {
        reject(new Error(err.response.data.message));
      });
  });
};

export const activate = ({ email }) => (dispatch) => {
  return new Promise((resolve, reject) => {
    const Url = process.env.REACT_APP_API_URL;
    dispatch(resetRequest());
    axios
      .post(`${Url}/users/auth/forgot-password`, { email })
      .then((res) => {
        dispatch(resetSuccess());
        resolve(res.data.message);
      })
      .catch((err) => {
        dispatch(resetFailure(err.response.data.message));
        reject(new Error(err.response.data.message));
      });
  });
};

export const reset = (email, token, data) => (dispatch) => {
  return new Promise((resolve, reject) => {
    const Url = process.env.REACT_APP_API_URL;
    axios
      .put(
        `${Url}/users/auth/reset-password/?email=${email}&token=${token}`,
        data
      )
      .then((res) => {
        resolve(res.data.message);
      })
      .catch((err) => {
        reject(new Error(err.response.data.message));
      });
  });
};

export const getUser = () => (dispatch) => {
  return new Promise((resolve, reject) => {
    const Url = process.env.REACT_APP_API_URL;
    axiosApiInstance
      .get(`${Url}/users?perPage=5`)
      .then((res) => {
        dispatch({
          type: "GET_USER",
          payload: res.data.data,
        });
        resolve(res.data.data);
      })
      .catch((err) => {
        reject(new Error(err.response.data.message));
      });
  });
};

export const searchUser = (data) => (dispatch) => {
  return new Promise((resolve, reject) => {
    const Url = process.env.REACT_APP_API_URL;
    axiosApiInstance
      .get(`${Url}/users/?keyword=${data}&perPage=5`)
      .then((res) => {
        dispatch({
          type: "SEARCH_USER",
          payload: res.data.data,
        });
        resolve(res.data.data);
      })
      .catch((err) => {
        reject(new Error(err.response.data.message));
      });
  });
};

export const getReceiver = (id) => (dispatch) => {
  return new Promise((resolve, reject) => {
    const Url = process.env.REACT_APP_API_URL;
    axiosApiInstance
      .get(`${Url}/users/find-user/${id}`)
      .then((res) => {
        dispatch({
          type: "GET_RECEIVER",
          payload: res.data.data[0],
        });
        resolve(res.data.data[0]);
      })
      .catch((err) => {
        reject(new Error(err.response.data.message));
      });
  });
};

export const getMessages = (idSender, idReceiver) => (dispatch) => {
  return new Promise((resolve, reject) => {
    const Url = process.env.REACT_APP_API_URL;
    axiosApiInstance
      .get(`${Url}/users/messages/${idSender}/${idReceiver}`)
      .then((res) => {
        dispatch({
          type: "GET_MESSAGES",
          payload: res.data.data,
        });
        resolve(res.data.data);
      })
      .catch((err) => {
        reject(new Error(err.response.data.message));
      });
  });
};

export const deleteMessages = (idSender, idReceiver) => (dispatch) => {
  return new Promise((resolve, reject) => {
    const Url = process.env.REACT_APP_API_URL;
    axiosApiInstance
      .delete(`${Url}/users/messages/${idSender}/${idReceiver}`)
      .then((res) => {
        resolve(res.data.message);
      })
      .catch((err) => {
        reject(new Error(err.response.data.message));
      });
  });
};
