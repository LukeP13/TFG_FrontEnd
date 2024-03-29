import Api from "../controllers/api";
import { LOGIN, LOGOUT, REGISTER, ERROR, ENABLE_NOTIFICATIONS } from "./types";

export function login(username, password, token) {
  return (dispatch) =>
    Api.login({ username, password, notificationToken: token }).then(
      (response) =>
        Promise.all(
          dispatch({ type: LOGIN, payload: response.data }),
          token && dispatch({ type: ENABLE_NOTIFICATIONS })
        ),
      (err) =>
        dispatch({
          type: ERROR,
          error: err.response.data && err.response.data.message,
        })
    );
}

export function register(username, email, password, phone = null) {
  return (dispatch) =>
    Api.register({ username, email, password, phone }).then(
      (_) => dispatch({ type: REGISTER }),
      (err) =>
        dispatch({
          type: ERROR,
          error: err.response.data && err.response.data.message,
        })
    );
}

export function logout() {
  return (dispatch) =>
    Api.logout().then(
      (_) => dispatch({ type: LOGOUT }),
      (err) => dispatch({ type: LOGOUT })
    );
}
