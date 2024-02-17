import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
export const items_create = createAsyncThunk(
  "item_Slice/items_api",
  async (info) => {
    try {
      const auth_token = localStorage.getItem("company");
      const result = await axios.post(
        process.env.REACT_APP_API + "/itemMaster",
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
export const items_get = createAsyncThunk("items_get/items_api", async () => {
  try {
    const auth_token = localStorage.getItem("company");

    const result = await axios.get(
      process.env.REACT_APP_API + "/itemMaster",

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
});
export const items_delete = createAsyncThunk(
  "items_delete/items_api",
  async (info) => {
    console.log(info);
    try {
      const auth_token = localStorage.getItem("company");

      const result = await axios.delete(
        process.env.REACT_APP_API + "/itemMaster",
       

        {
          headers: {
            com_token: auth_token,
          },   data: { id: info },
        }
      );
      const response = result.data;
      console.log(response);
      return response;
    } catch (error) {
      throw error.result.data;
    }
  }
);
export const items_update = createAsyncThunk(
  "items_update/items_api",
  async (info) => {
    try {
      const auth_token = localStorage.getItem("company");
      const result = await axios.put(
        process.env.REACT_APP_API + "/itemMaster",
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
const item_Slice = createSlice({
  name: "iteminfo",
  initialState: {
    result: {},
    lodaing: "",
    error: "",
    id: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(items_create.pending, (state) => {
        state.lodaing = true;
        state.error = "";
      })
      .addCase(items_create.fulfilled, (state, action) => {
        state.lodaing = false;
        state.error = "";
        state.result = action.payload;
      })
      .addCase(items_create.rejected, (state, action) => {
        state.lodaing = false;
        state.error = "";
      })
      .addCase(items_update.pending, (state) => {
        state.lodaing = true;
        state.error = "";
      })
      .addCase(items_update.fulfilled, (state, action) => {
        state.lodaing = false;
        state.error = "";
        state.result = action.payload;
      })
      .addCase(items_update.rejected, (state, action) => {
        state.lodaing = false;
        state.error = "";
      })
      .addCase(items_get.pending, (state) => {
        state.lodaing = true;
        state.error = "";
      })
      .addCase(items_get.fulfilled, (state, action) => {
        state.lodaing = false;
        state.error = "";
        state.result = action.payload;
      })
      .addCase(items_get.rejected, (state, action) => {
        state.lodaing = false;
        state.error = "";
      })
      .addCase(items_delete.pending, (state) => {
        state.lodaing = true;
        state.error = "";
      })
      .addCase(items_delete.fulfilled, (state, action) => {
        state.lodaing = false;
        state.error = "";
        state.id = action.payload;
      })
      .addCase(items_delete.rejected, (state, action) => {
        state.lodaing = false;
        state.error = "";
      });
  },
});
export const itemAction = item_Slice.actions;
export default item_Slice.reducer;
