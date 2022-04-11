import { loginFailure, loginStart, loginSuccess } from "./userRedux";
import { publicRequest, userRequest } from "../requestMethod";

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const response = await publicRequest.post("/auth/login", user);
    return dispatch(loginSuccess(response.data));
  } catch (err) {
    return dispatch(loginFailure());
  }
};

export const order = async (ordera) => {
  try {
    const response = await userRequest.post("/orders", ordera);
    return response.data;
  } catch (err) {
    console.log("It didnt work");
  }
};
