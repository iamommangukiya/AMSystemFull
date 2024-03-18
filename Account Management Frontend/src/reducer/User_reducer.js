import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// export const login = createAsyncThunk("userinfo/login", async (info) => {
//   try {
//     const request = await axios.post(
//       process.env.REACT_APP_API + "/user/singIn",
//       info
//     );

//     const response = await request.data;
//     const token = response.data.auth_token;
//     localStorage.clear();
//     localStorage.setItem("authToken", token);

//     return response;
//   } catch (error) {
//     throw error.request;
//   }
// });
export const login = createAsyncThunk("userinfo/login", async (info) => {
  try {
    const request = await axios.post(
      process.env.REACT_APP_API + "/user/singIn",
      info
    );

    const response = await request.data;

    // Check if login was successful
    if (response.flag) {
      const token = response.data.auth_token;
      localStorage.clear();
      localStorage.setItem("authToken", token);
      return response;
    } else {
      // If login failed, return the error message
      return response;
    }
  } catch (error) {
    // Handle network or other errors
    throw error;
  }
});

export const registation = createAsyncThunk(
  "userinfo/registation",
  async (info) => {
    try {
      const request = await axios.post(
        process.env.REACT_APP_API + "/user/singUp",
        info
      );

      const response = await request.data;

      return response;
    } catch (error) {
      throw error.response.data;
    }
  }
);
export const varifyOtp = createAsyncThunk(
  "userinfo/varifyOtp",
  async (info) => {
    console.log(process.env.REACT_APP_API + "/varify");
    try {
      const request = await axios.post(
        process.env.REACT_APP_API + "/varify",
        info
      );

      const response = await request.data;

      return response;
    } catch (error) {
      throw error.response.data;
    }
  }
);
const UserSlice = createSlice({
  name: "userinfo",
  initialState: {
    // email: "",
    // password: "",
    username: "",
    loading: "",
    error: "",
    varify: "",
    isAuth: "",
    result: "",
  },
  reducers: {
    clearloading(state) {
      state.loading = "";
    },
    clLogindata(state) {
      state.result = "";
    },
    Logout(state) {
      state.email = null;
      state.password = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.username = "";
        state.error = "";
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";
        state.result = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;

        state.username = "";
      })
      .addCase(registation.pending, (state) => {
        state.loading = true;
        state.username = "";
        state.error = "";
      })
      .addCase(registation.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";
        state.result = action.payload;
      })
      .addCase(registation.rejected, (state, action) => {
        state.loading = false;

        state.username = "";
      })
      .addCase(varifyOtp.pending, (state) => {
        state.loading = true;
        state.username = "";
        state.error = "";
      })
      .addCase(varifyOtp.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";
        state.varify = action.payload;
      })
      .addCase(varifyOtp.rejected, (state, action) => {
        state.loading = false;

        state.username = "";
      });
  },
});
export const LoginAction = UserSlice.actions;
export default UserSlice.reducer;
