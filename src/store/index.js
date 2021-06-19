import {configureStore} from "@reduxjs/toolkit"
import coursesSlice from './slices/coursesSlice'

const store = configureStore({
    reducer:{
        courses: coursesSlice,
    }
})

export default store;