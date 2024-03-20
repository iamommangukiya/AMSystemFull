import { configureStore } from "@reduxjs/toolkit";
import reducers from "../reducer/index";
const store = configureStore({
  reducer: reducers,
});
export default store;
