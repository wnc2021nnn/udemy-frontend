import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { login } from "../../api/user-api";
import Status from "../../constants/status-constants";

const initialState = {
  userInform: {
    user: {},
    status: {
      status: "",
      message: "",
    },
  },
};

const sendAPIRequest = async (body) => {
  const res = await login(body);
  return res.data.data;
};

export const userLogin = createAsyncThunk("user/userLogin", async (body) => {
  const res = await sendAPIRequest(body);
  return res;
});

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(userLogin.pending, (state, action)=>{
        state.userInform.status.status = Status.LOADING_STATUS;
    })
    .addCase(userLogin.fulfilled, (state, action)=>{
        state.userInform.status.status = Status.SUCCESS_STATUS;
        state.userInform.user = action.payload;
    })
    .addCase(userLogin.rejected, (state, action)=>{
        state.userInform.status.status = Status.FAILED_STATUS;
        state.userInform.status.message = action.error.message;
    })
  },
});

export default userSlice.reducer;
