import { configureStore } from '@reduxjs/toolkit'

import { authSlice, orderSlice, productSlice } from './slices'


export const store = configureStore({
    reducer: {
        product: productSlice.reducer,
        orders: orderSlice.reducer,
        auth: authSlice.reducer,
    }
})
