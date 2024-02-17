import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const addbill = createAsyncThunk(
  "billing_slice/addbill",
  async (data) => {
    console.log("objectzdfsdf");
    const auth_token = localStorage.getItem("company");
    const response = await axios.post(
      process.env.REACT_APP_API + "/inserbillLog",
      data,
      {
        headers: {
          com_token: auth_token,
        },
      }
    );
    const responseData = response.data;
    return responseData;
  }
);

export const getbilldata = createAsyncThunk(
  "billing_slice/getbilldata",
  async (data) => {
    console.log("objectzdfsdf");
    const auth_token = localStorage.getItem("company");
    const response = await axios.get(
      process.env.REACT_APP_API + "/inserbillLog",
      data,
      {
        headers: {
          com_token: auth_token,
        },
      }
    );
    const responseData = response.data;
    return responseData;
  }
);

const billingSlice = createSlice({
  name: "billing_slice",
  initialState: {
    result: "",
    resultData: "",
  },
  reducers: {
    CleanInsertBill(state) {
      state.result = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addbill.pending, (state) => {
        state.result = "pending";
      })
      .addCase(addbill.fulfilled, (state, action) => {
        state.result = action.payload;
      })
      .addCase(addbill.rejected, (state) => {
        state.result = "rejected";
      })
      .addCase(getbilldata.pending, (state) => {
        state.result = "pending";
      })
      .addCase(getbilldata.fulfilled, (state, action) => {
        state.resultData = action.payload;
      })
      .addCase(getbilldata.rejected, (state) => {
        state.result = "rejected";
      });
  },
});

export default billingSlice.reducer;
export const billingaction = billingSlice.actions;
