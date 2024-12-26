import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import { fetchLoggedInUserById, updateUserById, getAllStudents } from './UserApi'

const initialState={
    status:"idle",
    userInfo:null,
    errors:null,
    successMessage:null,
    students:null
}

export const fetchLoggedInUserByIdAsync=createAsyncThunk('user/fetchLoggedInUserByIdAsync',async(id)=>{
    const userInfo=await fetchLoggedInUserById(id)
    return userInfo
})
export const updateUserByIdAsync=createAsyncThunk('user/updateUserByIdAsync',async(update)=>{
    const updatedUser=await updateUserById(update)
    return updatedUser
})
export const getAllStudentsAsync=createAsyncThunk('user/getAllStudentsAsync',async()=>{
    const students=await getAllStudents()
    return students
})

const userSlice=createSlice({
    name:"userSlice",
    initialState:initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
            .addCase(fetchLoggedInUserByIdAsync.pending,(state)=>{
                state.status='pending'
            })
            .addCase(fetchLoggedInUserByIdAsync.fulfilled,(state,action)=>{
                state.status='fulfilled'
                state.userInfo=action.payload
            })
            .addCase(fetchLoggedInUserByIdAsync.rejected,(state,action)=>{
                state.status='rejected'
                state.errors=action.error
            })

            .addCase(updateUserByIdAsync.pending,(state)=>{
                state.status='pending'
            })
            .addCase(updateUserByIdAsync.fulfilled,(state,action)=>{
                state.status='fulfilled'
                state.userInfo=action.payload
            })
            .addCase(updateUserByIdAsync.rejected,(state,action)=>{
                state.status='rejected'
                state.errors=action.error
            })

            .addCase(getAllStudentsAsync.pending,(state)=>{
                state.status='pending'
            })
            .addCase(getAllStudentsAsync.fulfilled,(state,action)=>{
                state.status='fulfilled'
                state.students=action.payload
            })
            .addCase(getAllStudentsAsync.rejected,(state,action)=>{
                state.status='rejected'
                state.errors=action.error
            })
    }
})

// exporting selectors
export const selectUserStatus=(state)=>state.UserSlice.status
export const selectUserInfo=(state)=>state.UserSlice.userInfo
export const selectStudents=(state)=>state.UserSlice.students
export const selectUserErrors=(state)=>state.UserSlice.errors
export const selectUserSuccessMessage=(state)=>state.UserSlice.successMessage


export default userSlice.reducer