import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
export const transction_create = createAsyncThunk(
  "transction_create/tracstion_Slice",
  async (info) => {
    try {
      const auth_token = localStorage.getItem("company");
      const result = await axios.post(
        process.env.REACT_APP_API + "/financemaster",
        info,
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
export const selectAllTra = createAsyncThunk(
  "selectAllTra/tracstion_Slice",
  async (info) => {
    try {
      const auth_token = localStorage.getItem("company");
      const result = await axios.get(
        process.env.REACT_APP_API + "/alltra",

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
export const transction_Update = createAsyncThunk(
  "transction_Update/tracstion_Slice",
  async (info) => {
    try {
      const auth_token = localStorage.getItem("company");
      const result = await axios.put(
        process.env.REACT_APP_API + "/financemaster",
        info,
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
export const transction_Records = createAsyncThunk(
  "transction_Records/tracstion_Slice",
  async () => {
    try {
      const auth_token = localStorage.getItem("company");
      const result = await axios.get(
        process.env.REACT_APP_API + "/transectionReport",

        {
          headers: {
            com_token: auth_token,
          },
        }
      );
      // console.log(result);
      const response = result.data;
      return response;
    } catch (error) {
      throw error.result.data;
    }
  }
);

export const transction_get = createAsyncThunk(
  "transction_get/tracstion_Slice",
  async (data) => {
    // console.log(data);

    try {
      const auth_token = localStorage.getItem("company");
      const result = await axios.get(
        process.env.REACT_APP_API + "/financemaster",

        {
          headers: {
            com_token: auth_token,
            data: data,
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
export const transction_delete = createAsyncThunk(
  "transction_delete/tracstion_Slice",

  async (info) => {
    try {
      const auth_token = localStorage.getItem("company");

      const response = await axios.delete(
        process.env.REACT_APP_API + "/financemaster",

        {
          headers: {
            com_token: auth_token,
          },
          data: { id: info },
        }
      );
      const result = await response.data;

      return result;
    } catch (error) {
      throw error.result.data;
    }
  }
);

const tracstion_Slice = createSlice({
  name: "trasctioninfo",
  initialState: {
    result: {},
    loading: "",
    Alltra: "",
    error: "",
    trascion_getresult: {},
    trascion_Updateresult: {},
    transectionReports: {},
  },
  reducers: {
    addTrasction(state) {
      state.result = {};
    },
    updateTrasction(state) {
      state.trascion_Updateresult = {};
    },
  },
  extraReducers: (bulider) => {
    bulider
      .addCase(transction_create.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(transction_create.fulfilled, (state, action) => {
        state.loading = false;
        state.result = action.payload;
        state.error = "";
      })
      .addCase(transction_create.rejected, (state) => {
        state.loading = false;
        state.error = "";
      })
      .addCase(transction_get.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(transction_get.fulfilled, (state, action) => {
        state.loading = false;
        state.trascion_getresult = action.payload;
        state.error = "";
      })
      .addCase(transction_get.rejected, (state) => {
        state.loading = false;
        state.error = "";
      })
      .addCase(transction_delete.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(transction_delete.fulfilled, (state, action) => {
        state.loading = false;
        state.trascion_result = action.payload;
        state.error = "";
      })
      .addCase(transction_delete.rejected, (state) => {
        state.loading = false;
        state.error = "";
      })
      .addCase(transction_Update.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(transction_Update.fulfilled, (state, action) => {
        state.loading = false;
        state.trascion_Updateresult = action.payload;
        state.error = "";
      })
      .addCase(transction_Update.rejected, (state) => {
        state.loading = false;
        state.error = "";
      })
      .addCase(transction_Records.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(transction_Records.fulfilled, (state, action) => {
        state.loading = false;
        state.transectionReports = action.payload;
        state.error = "";
      })
      .addCase(transction_Records.rejected, (state) => {
        state.loading = false;
        state.error = "";
      })
      .addCase(selectAllTra.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(selectAllTra.fulfilled, (state, action) => {
        state.loading = false;
        state.Alltra = action.payload;
        state.error = "";
      })
      .addCase(selectAllTra.rejected, (state) => {
        state.loading = false;
        state.error = "";
      });
  },
});
export const traction_Action = tracstion_Slice.actions;
export default tracstion_Slice.reducer;
