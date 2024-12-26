import {configureStore} from '@reduxjs/toolkit'
import AuthSlice from '../features/auth/AuthSlice'
import UserSlice from '../features/user/UserSlice'
import ChatSlice from '../features/chat/ChatSlice'

export const store=configureStore({
    reducer:{
        AuthSlice,
        UserSlice,
        ChatSlice
    }
})