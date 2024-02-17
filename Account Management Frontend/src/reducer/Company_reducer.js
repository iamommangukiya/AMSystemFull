import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const company = createAsyncThunk(
  "company_Slice/company",
  async (info) => {
    try {
      const auth_token = localStorage.getItem("authToken");

      if (auth_token) {
        const companyResult = await axios.post(
          process.env.REACT_APP_API + "/company",
          info,
          {
            headers: {
              auth_token: auth_token,
            },
          }
        );
        const response = companyResult.data;
        // const response = await JSON.parse(companyResult.data);

        console.log(response);
        return response;
      } else {
      }
    } catch (error) {
      throw error.companyResult.data;
    }
  }
);
export const fetchAllComapny = createAsyncThunk(
  "companyinfo/fetchAllComapny",
  async () => {
    try {
      const auth_token = localStorage.getItem("authToken");

      const result = await axios.get(process.env.REACT_APP_API + "/company", {
        headers: {
          auth_token: auth_token,
        },
      });

      const response = await result.data;

      return response;
    } catch (error) {
      throw error.result.data;
    }
  }
);

export const fetchDetailsComapny = createAsyncThunk(
  "companyinfo/fetchDetailsComapny",
  async () => {
    try {
      const id = localStorage.getItem("itemid");
      const auth_token = localStorage.getItem("authToken");
      const companyName = localStorage.getItem("Comany_name");
      const result = await axios.get(
        process.env.REACT_APP_API + "/companyByid",
        {
          params: {
            id: id,
          },

          headers: {
            auth_token: auth_token,
          },
        }
      );

      const response = result.data;
      localStorage.setItem("cmp_name",result.data.data[0]["companyName"]);
      const token = response.companyId;
      // localStorage.removeItem("company");

      localStorage.setItem("company", token);
      // console.log(response.id);

      return response;
    } catch (error) {
      throw error.result.data;
    }
  }
);
const company_Slice = createSlice({
  name: "companyinfo",
  initialState: {
    result: {},
    resultcompany: {},
    loading: "",
    error: "",
  },
  reducers: {
    companyEmpt(state) {
      state.result = {};
    },
    companyData(state) {
      state.resultcompany = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(company.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(company.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";
        state.resultcompany = action.payload;
      })
      .addCase(company.rejected, (state, action) => {
        state.loading = false;
        state.error = "";
      })
      .addCase(fetchAllComapny.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(fetchAllComapny.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";
        state.result = action.payload;
      })
      .addCase(fetchAllComapny.rejected, (state, action) => {
        state.loading = false;
        state.error = "";
      })
      .addCase(fetchDetailsComapny.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(fetchDetailsComapny.fulfilled, (state, action) => {
        state.loading = false;

        state.error = "";
        state.result = action.payload;
      })
      .addCase(fetchDetailsComapny.rejected, (state, action) => {
        state.loading = false;
        state.error = "";
      });
  },
});
export const companyAction = company_Slice.actions;
export default company_Slice.reducer;
