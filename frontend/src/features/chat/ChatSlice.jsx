import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import { generateResponse, uploadFile, getFiles, getLectures,createLecture, deleteLecture, updateLecture } from './ChatApi'

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

export const getLecturesAsync = createAsyncThunk('lectures/getLectures', async () => {
    const lectures = await getLectures();
    return lectures;
});

export const createLecturesAsync = createAsyncThunk('lectures/createLecture', async (data) => {
    const lecture = await createLecture(data);
    return lecture;
});

export const deleteLecturesAsync = createAsyncThunk('lectures/deleteLecture', async (id) => {
    const lecture = await deleteLecture(id);
    return lecture;
});

export const updateLecturesAsync = createAsyncThunk('lectures/updateLecture', async ({ id, data }) => {
    const updatedLecture = await updateLecture(id, data);
    return updatedLecture;
});

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

            .addCase(createLecturesAsync.pending, (state) => {
                state.lecturesStatus = 'pending';
            })
            .addCase(createLecturesAsync.fulfilled, (state, action) => {
                state.lecturesStatus = 'fulfilled';
                state.lectures = [...state.lectures, action.payload];
            })
            .addCase(createLecturesAsync.rejected, (state, action) => {
                state.lecturesStatus = 'rejected';
                state.lecturesError = action.error;
            })

            .addCase(deleteLecturesAsync.pending, (state) => {
                state.lecturesStatus = 'pending';
            })
            .addCase(deleteLecturesAsync.fulfilled, (state, action) => {
                state.lecturesStatus = 'fulfilled';
                state.lectures = state.lectures.filter(lecture => lecture._id !== action.meta.arg);
            })
            .addCase(deleteLecturesAsync.rejected, (state, action) => {
                state.lecturesStatus = 'rejected';
                state.lecturesError = action.error;
            })

            .addCase(updateLecturesAsync.pending, (state) => {
                state.lecturesStatus = 'pending';
            })
            .addCase(updateLecturesAsync.fulfilled, (state, action) => {
                state.lecturesStatus = 'fulfilled';
                const updatedLectureIndex = state.lectures.findIndex((lecture) => lecture._id === action.payload._id);
                if (updatedLectureIndex !== -1) {
                    state.lectures[updatedLectureIndex] = action.payload;
                }
            })
            .addCase(updateLecturesAsync.rejected, (state, action) => {
                state.lecturesStatus = 'rejected';
                state.lecturesError = action.error;
            });
    }
})

export const selectGeneratedResponseStateStatus=(state)=>state.ChatSlice.generatedResponseStateStatus
export const selectGeneratedResponseState=(state)=>state.ChatSlice.generatedResponseState
export const selectGeneratedResponseStateError=(state)=>state.ChatSlice.generatedResponseStateError

export const selectFilesStatus=(state)=>state.ChatSlice.filesStatus
export const selectFiles=(state)=>state.ChatSlice.files
export const selectFilesErrors=(state)=>state.ChatSlice.filesError

export const selectLecturesStatus=(state)=>state.ChatSlice.lecturesStatus
export const selectLectures=(state)=>state.ChatSlice.lectures
export const selectLecturesErrors=(state)=>state.ChatSlice.lecturesError

// exporting reducers
export const { clearFilesErrors,clearGeneratedResponseStateErrors,clearSelectedFilesErrors,clearLecturesErrors,resetFilesStatus,resetGeneratedResponseStateStatus,resetSelectedFilesStatus,resetLecturesStatus }=chatSlice.actions

export default chatSlice.reducer