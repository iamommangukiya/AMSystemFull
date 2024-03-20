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

export const gstbill = createAsyncThunk(
  "billing_slice/gsttbill",
  async (data) => {
    const auth_token = localStorage.getItem("company");
    const response = await axios.get(
      process.env.REACT_APP_API + "/billget",

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
export const UpdateBillog = createAsyncThunk(
  "billing_slice/UpdateBillog",
  async (data) => {
    // console.log(data, "update");
    const auth_token = localStorage.getItem("company");
    const response = await axios.put(
      process.env.REACT_APP_API + "/billlog",
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
    console.log(data);
    const auth_token = localStorage.getItem("company");
    // console.log(auth_token);
    const response = await axios.post(
      process.env.REACT_APP_API + "/billlog",
      { bookName: data },
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

export const getbilldatabyId = createAsyncThunk(
  "billing_slice/getbilldatabyId",
  async (data) => {
    const auth_token = localStorage.getItem("company");

    const response = await axios.post(
      process.env.REACT_APP_API + "/billitemById",
      { id: data },
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
export const getletestInvoceId = createAsyncThunk(
  "Billing_slice/getletestInvoceId",
  async (id) => {
    const authToken = localStorage.getItem("company");
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API}/getletestInvoiceId`,
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
export const getbalancesheet = createAsyncThunk(
  "Billing_slice/getbalancesheet",
  async (id) => {
    const authToken = localStorage.getItem("company");
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API}/balancesheet`,
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
    updateBilllog: "",
    InvoiceID: "",
    gstBilldata: "",
    balancesheet: "",
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
      })
      .addCase(UpdateBillog.pending, (state) => {
        state.updateBilllog = "pending";
      })
      .addCase(UpdateBillog.fulfilled, (state, action) => {
        state.updateBilllog = action.payload;
      })
      .addCase(UpdateBillog.rejected, (state) => {
        state.updateBilllog = "rejected";
      })
      .addCase(getbilldatabyId.pending, (state) => {
        state.result = "pending";
      })
      .addCase(getbilldatabyId.fulfilled, (state, action) => {
        state.result = action.payload;
      })
      .addCase(getbilldatabyId.rejected, (state) => {
        state.result = "rejected";
      })
      .addCase(getletestInvoceId.pending, (state) => {
        state.InvoiceID = "pending";
      })
      .addCase(getletestInvoceId.fulfilled, (state, action) => {
        state.InvoiceID = action.payload;
      })
      .addCase(getletestInvoceId.rejected, (state) => {
        state.InvoiceID = "rejected";
      })
      .addCase(gstbill.pending, (state) => {
        state.InvoiceID = "pending";
      })
      .addCase(gstbill.fulfilled, (state, action) => {
        state.gstBilldata = action.payload;
      })
      .addCase(gstbill.rejected, (state) => {
        state.InvoiceID = "rejected";
      })
      .addCase(getbalancesheet.pending, (state) => {
        state.balancesheet = "pending";
      })
      .addCase(getbalancesheet.fulfilled, (state, action) => {
        state.balancesheet = action.payload;
      })
      .addCase(getbalancesheet.rejected, (state) => {
        state.balancesheet = "rejected";
      });
  },
});

export default billingSlice.reducer;
export const billingaction = billingSlice.actions;
