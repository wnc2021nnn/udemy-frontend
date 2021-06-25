import {configureStore} from "@reduxjs/toolkit"
import coursesSlice from './slices/coursesSlice'
import categoriesSlice from './slices/categoriesSlice'
import userSlice from "./slices/userSlice";


const store = configureStore({
    reducer:{
        courses: coursesSlice,
        categories: categoriesSlice,
        user: userSlice,
    }
})

export default store;