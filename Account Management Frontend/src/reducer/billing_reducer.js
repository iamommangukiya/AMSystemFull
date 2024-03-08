import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const addbill = createAsyncThunk(
  "billing_slice/addbill",
  async (data) => {
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
    const auth_token = localStorage.getItem("company");
    console.log(auth_token);
    const response = await axios.get(process.env.REACT_APP_API + "/billlog", {
      headers: {
        com_token: auth_token,
      },
    });
    console.log(response.data);
    const responseData = response.data;
    return responseData;
  }
);
export const deletebill = createAsyncThunk(
  "Billing_slice/deletebill",
  async (data) => {
    const authToken = localStorage.getItem("company");
    const response = await axios.delete(
      process.env.REACT_APP_API + "/billlog",
      {
        headers: {
          com_token: authToken,
        },
        data: { id: data },
      }
    );

    const responseData = response.data;
    return responseData;
  }
);
export const getItemsOfBill = createAsyncThunk(
  "Billing_slice/getItemsOfBill",
  async (id) => {
    const authToken = localStorage.getItem("company");
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API}/billItem`,
        { id: id }, // Send the id in the request body
        {
          headers: {
            com_token: authToken,
          },
        }
      );

      return response.data;
    } catch (error) {
      // Handle any errors, e.g., network errors, server errors, etc.
      throw error;
    }
  }
);

const billingSlice = createSlice({
  name: "billing_slice",
  initialState: {
    billItems: "",
    result: "",
    resultData: "",
    delete: "",
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
      })
      .addCase(deletebill.pending, (state) => {
        state.delete = "pending";
      })
      .addCase(deletebill.fulfilled, (state, action) => {
        state.delete = action.payload;
      })
      .addCase(deletebill.rejected, (state) => {
        state.delete = "rejected";
      })
      .addCase(getItemsOfBill.pending, (state) => {
        state.billItems = "pending";
      })
      .addCase(getItemsOfBill.fulfilled, (state, action) => {
        state.billItems = action.payload;
      })
      .addCase(getItemsOfBill.rejected, (state) => {
        state.billItems = "rejected";
      });
  },
});

export default billingSlice.reducer;
export const billingaction = billingSlice.actions;
