import { configureStore } from "@reduxjs/toolkit";
import coursesSlice from "./slices/coursesSlice";
import categoriesSlice from "./slices/categoriesSlice";
import userSlice from "./slices/userSlice";
import statusSlice from "./slices/statusSlice";

const store = configureStore({
  reducer: {
    courses: coursesSlice,
    categories: categoriesSlice,
    user: userSlice,
    status: statusSlice,
  },
});

export default store;
