import {configureStore} from "@reduxjs/toolkit"
import coursesSlice from './slices/coursesSlice'
import categoriesSlice from './slices/categoriesSlice'


const store = configureStore({
    reducer:{
        courses: coursesSlice,
        categories: categoriesSlice,
    }
})

export default store;