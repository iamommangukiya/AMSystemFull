import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const apiparty = createAsyncThunk(
  "partyinfomation/apiparty",
  async (info) => {
    try {
      const auth_token = localStorage.getItem("company");

      const response = await axios.post(
        process.env.REACT_APP_API + "/party",
        info,
        {
          headers: {
            com_token: auth_token,
          },
        }
      );

      const result = await response.data;
      return result;
    } catch (error) {
      throw error.result.data;
    }
  }
);
export const apipartyGet = createAsyncThunk(
  "partyinfomation/apipartyGet",
  async () => {
    try {
      const auth_token = localStorage.getItem("company");

      const response = await axios.get(
        process.env.REACT_APP_API + "/party",

        {
          headers: {
            com_token: auth_token,
          },
        }
      );
      const result = await response.data;

      return result;
    } catch (error) {
      throw error.result.data;
    }
  }
);
export const updateparty = createAsyncThunk(
  "partyinfomation/updateparty",
  async (info) => {
    try {
      const auth_token = localStorage.getItem("company");

      const response = await axios.put(
        process.env.REACT_APP_API + "/party",
        info,

        {
          headers: {
            com_token: auth_token,
          },
        }
      );
      const result = await response.data;

      return result;
    } catch (error) {
      throw error.result.data;
    }
  }
);
export const AccountGrop = createAsyncThunk(
  "partyinfomation/AccountGrop",
  async () => {
    try {
      const auth_token = localStorage.getItem("company");

      const response = await axios.get(
        process.env.REACT_APP_API + "/accountGroupMaster",

        {
          headers: {
            com_token: auth_token,
          },
        }
      );
      const result = await response.data;

      return result;
    } catch (error) {
      throw error.result.data;
    }
  }
);
export const partyDelete = createAsyncThunk(
  "partyinfomation/partyDelete",
  async (info) => {
    try {
      const auth_token = localStorage.getItem("company");

      const response = await axios.delete(
        process.env.REACT_APP_API + "/party",

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
const party_Slice = createSlice({
  name: "partyinfomation",
  initialState: {
    resultparty: {},
    loading: "",
    error: "",
    party_upadte: {},
    result: {},
    accountGrop: {},
    id: "",
  },
  reducers: {
    resultEmpty(state) {
      state.result = {};
    },
    addpartyEmpty(state, action) {
      state.resultparty = {};
    },
    updatepartyEmpty(state, action) {
      state.party_upadte = {};
    },
    setButton(state, action) {
      state.buttonVlaue = action.payload;
    },
  },
  extraReducers: (bulider) => {
    bulider
      .addCase(apiparty.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(apiparty.fulfilled, (state, action) => {
        state.loading = false;
        state.resultparty = action.payload;
        state.error = "";
      })
      .addCase(apiparty.rejected, (state, action) => {
        state.loading = false;
        state.error = "";
      })
      .addCase(apipartyGet.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(apipartyGet.fulfilled, (state, action) => {
        state.loading = false;
        state.result = action.payload;
        state.error = "";
      })
      .addCase(apipartyGet.rejected, (state) => {
        state.loading = false;
        state.error = "";
      })
      .addCase(updateparty.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(updateparty.fulfilled, (state, action) => {
        state.loading = false;
        state.party_upadte = action.payload;
        state.error = "";
      })
      .addCase(updateparty.rejected, (state) => {
        state.loading = false;
        state.error = "";
      })
      .addCase(AccountGrop.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(AccountGrop.fulfilled, (state, action) => {
        state.loading = false;
        state.accountGrop = action.payload;
        state.error = "";
      })
      .addCase(AccountGrop.rejected, (state, action) => {
        state.loading = false;
        state.error = "";
      })
      .addCase(partyDelete.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(partyDelete.fulfilled, (state, action) => {
        state.loading = false;
        state.id = action.payload;
        state.error = "";
      })
      .addCase(partyDelete.rejected, (state, action) => {
        state.loading = false;
        state.error = "";
      });
  },
});
export const partyAction = party_Slice.actions;
export default party_Slice.reducer;
