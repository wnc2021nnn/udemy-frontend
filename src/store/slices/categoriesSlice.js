import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Status from "../../constants/status-constants";
import { getAllCategories } from "../../api/api-categories";
/**
 * Categories Initial state 
 */
const initialState = {
    listCategory:{
        entities: [],
        status: {
            status: "",
            message: ""
        }
    }
}


export const fetchCategoriesList = createAsyncThunk(
    "categories/fetchCategoriesList",
    async () => {
        const res = await getAllCategories();
        return res.data.data;
    },
);


const categoriesSlice = createSlice({
    name: "categories",
    initialState: initialState,
    reducers:{},
    extraReducers: (builder)=>{
        builder
        .addCase(fetchCategoriesList.pending, (state)=>{
            state.listCategory.status.status = Status.LOADING_STATUS;
        })
        .addCase(fetchCategoriesList.fulfilled, (state, action)=>{
            state.listCategory.status.status = Status.SUCCESS_STATUS;
            state.listCategory.entities = action.payload;
        })
        .addCase(fetchCategoriesList.rejected, (state, action)=>{
            state.listCategory.status.status = Status.FAILED_STATUS;
            state.listCategory.status.message = action.error.message;
        })
    }
})

export default categoriesSlice.reducer;


