import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const creatEIsuue = createAsyncThunk(
  "helpslice/creatEIsuue",
  async (data) => {
    try {
      const auth_token = localStorage.getItem("company");

      const result = await axios.post(
        process.env.REACT_APP_API + "/problem",
        data,
        {
          headers: {
            com_token: auth_token,
          },
        }
      );
      const response = result.data;

      return response;
    } catch (error) {
      throw error.result.data;
    }
  }
);

const helpslice = createSlice({
  name: "iteminfo",
  initialState: {
    result: {},
    lodaing: "",
    error: "",
    id: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(creatEIsuue.pending, (state) => {
      state.lodaing = true;
      state.error = "";
    });
    builder.addCase(creatEIsuue.fulfilled, (state, action) => {
      state.lodaing = false;
      state.result = action.payload;
      state.error = "";
    });
    builder.addCase(creatEIsuue.rejected, (state) => {
      state.lodaing = false;
      state.error = "";
    });
  },
});
export default helpslice.reducer;
