import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import { generateResponse, uploadFile, getFiles, getLectures } from './ChatApi'

const initialState={
    generatedResponseStateStatus:"idle",
    generatedResponseStateError:null,
    generatedResponseState:null,
    filesStatus:"idle",
    filesError:null,
    files:null,
    selectedFilesStatus:"idle",
    selectedFilesError:null,
    selectedFiles:[],
    lecturesStatus:"idle",
    lecturesError:null,
    lectures:null,
}

export const generateResponseAsync=createAsyncThunk('ai/generate',async(data)=>{
    const generatedResponse=await generateResponse(data)
    return generatedResponse
})

export const uploadFileAsync=createAsyncThunk('files/upload',async(data)=>{
    const uploadedFile=await uploadFile(data)
    return uploadedFile
})

export const getFilesAsync=createAsyncThunk('files', async() => {
    const files = await getFiles();
    return files
})

export const getLecturesAsync=createAsyncThunk('lectures', async() => {
    const files = await getLectures();
    return files
})

const chatSlice=createSlice({
    name:"chatSlice",
    initialState:initialState,
    reducers:{
        clearGeneratedResponseStateErrors:(state)=>{
            state.generatedResponseStateError=null
        },
        resetGeneratedResponseStateStatus:(state)=>{
            state.generatedResponseStateStatus='idle'
        },
        clearFilesErrors:(state)=>{
            state.filesError=null
        },
        resetFilesStatus:(state)=>{
            state.filesStatus='idle'
        },
        clearSelectedFilesErrors:(state)=>{
            state.selectedFilesError=null
        },
        resetSelectedFilesStatus:(state)=>{
            state.selectedFilesStatus='idle'
        },
        clearLecturesErrors:(state)=>{
            state.lecturesError=null
        },
        resetLecturesStatus:(state)=>{
            state.lecturesStatus='idle'
        },
    },
    extraReducers:(builder)=>{
        builder
            .addCase(generateResponseAsync.pending,(state)=>{
                state.generatedResponseStateStatus='pending'
            })
            .addCase(generateResponseAsync.fulfilled,(state,action)=>{
                state.generatedResponseStateStatus='fulfilled'
                state.generatedResponseState=action.payload
            })
            .addCase(generateResponseAsync.rejected,(state,action)=>{
                state.generatedResponseStateStatus='rejected'
                state.generatedResponseStateError=action.error
            })

            .addCase(uploadFileAsync.pending,(state)=>{
                state.status='pending'
            })
            .addCase(uploadFileAsync.fulfilled,(state,action)=>{
                state.status='fulfilled'
            })
            .addCase(uploadFileAsync.rejected,(state,action)=>{
                state.status='rejected'
                state.filesError=action.error
            })

            .addCase(getFilesAsync.pending,(state)=>{
                state.filesStatus='pending'
            })
            .addCase(getFilesAsync.fulfilled,(state,action)=>{
                state.filesStatus='fulfilled'
                state.files = action.payload
            })
            .addCase(getFilesAsync.rejected,(state,action)=>{
                state.filesStatus='rejected'
                state.filesError=action.error
            })

            .addCase(getLecturesAsync.pending,(state)=>{
                state.lecturesStatus='pending'
            })
            .addCase(getLecturesAsync.fulfilled,(state,action)=>{
                state.lecturesStatus='fulfilled'
                state.lectures = action.payload
            })
            .addCase(getLecturesAsync.rejected,(state,action)=>{
                state.lecturesStatus='rejected'
                state.lecturesError=action.error
            })
    }
})



export const selectFilesStatus=(state)=>state.ChatSlice.filesStatus
export const selectFiles=(state)=>state.ChatSlice.files
export const selectFilesErrors=(state)=>state.ChatSlice.filesError

export const selectLecturesStatus=(state)=>state.ChatSlice.lecturesStatus
export const selectLectures=(state)=>state.ChatSlice.lectures
export const selectLecturesErrors=(state)=>state.ChatSlice.lecturesError

// exporting reducers
export const { clearFilesErrors,clearGeneratedResponseStateErrors,clearSelectedFilesErrors,clearLecturesErrors,resetFilesStatus,resetGeneratedResponseStateStatus,resetSelectedFilesStatus,resetLecturesStatus }=chatSlice.actions

export default chatSlice.reducer