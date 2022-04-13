import { loginFailure, loginStart, loginSuccess } from "./userRedux";
import { publicRequest, userRequest } from "../requestMethod";

export const login = async (dispatch, user, msg) => {
  dispatch(loginStart());
  try {
    const response = await publicRequest.post("/auth/login", user);
    return dispatch(loginSuccess(response.data));
  } catch (err) {
    msg(true)
    return dispatch(loginFailure());
  }
};

export const order = async (orders, func, msg) => {
  try {
    const response = await userRequest.post("/orders", orders);
    func(response.data);
  } catch (err) {
    msg(err);
  }
};

export const getOrder = async (userId, func, msg) => {
  try {
    const response = await userRequest.get(`/orders/find/${userId}`);
    func(response.data);
  } catch (err) {
    msg("It didnt work");
  }
};
