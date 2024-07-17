import { configureStore } from '@reduxjs/toolkit'
import SliceReducer from '../slice/auth'
import ContentReducer from '../slice/content'
import SearchReducer from '../slice/search'
import BookmarkReducer from '../slice/bookmark'

export const store = configureStore({
    reducer: {
        auth: SliceReducer,
        content: ContentReducer,
        search: SearchReducer,
        bookmark: BookmarkReducer,
    },
    devTools: process.env.NODE_ENV !== 'production',
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
})
