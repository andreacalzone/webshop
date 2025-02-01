import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import productService from "./productService";

const initialState = {
    products: [],
    filteredProducts: [], // New state for filtered products
    selectedCategory: '', // New state for selected category
    error: null,
    loading: false
};

export const getProducts = createAsyncThunk('product-list/getAll', async (_, thunkAPI) => {
    try {
        return await productService.getAll();
    } catch (err) {
        return thunkAPI.rejectWithValue(err.message);
    }
});

export const productsSlice = createSlice({
    name: 'product-list',
    initialState,
    reducers: {
        setSelectedCategory: (state, action) => {
            state.selectedCategory = action.payload;
            
            state.filteredProducts = action.payload
                ? state.products.filter(product => product.category === action.payload)
                : state.products;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getProducts.pending, state => {
                state.loading = true;
            })
            .addCase(getProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(getProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.products = action.payload;
                state.filteredProducts = action.payload; // Initialize filteredProducts with all products
            });
    }
});

export const { setSelectedCategory } = productsSlice.actions;

export default productsSlice.reducer;