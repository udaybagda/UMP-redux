import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from "axios"
const API_URL = 'http://localhost:3002/users';

const uploadFile = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.readAsDataURL(file);
    });
  };

export const fetchUsers = createAsyncThunk("users/fetchUsers", async()=>{
    const res = await axios.get(API_URL)
    // console.log("API Response:",res.data)
    return res.data
})

export const addUser = createAsyncThunk("users/addUser",async (user)=>{
    let profilePicUrl = '';
    if (user.profile_pic) {
      profilePicUrl = await uploadFile(user.profile_pic);
    }
  
    const res = await axios.post(API_URL, { ...user, profile_pic: profilePicUrl })
    return res.data
})

export const editUser = createAsyncThunk("users/editUser", async({id,updatedUser})=>{

    let profilePicUrl = updatedUser.profile_pic;
    if (updatedUser.profile_pic instanceof File) {
      profilePicUrl = await uploadFile(updatedUser.profile_pic);
    }
    const res = await axios.put(`${API_URL}/${id}`,{ ...updatedUser, profile_pic: profilePicUrl })
    return res.data
})

export const deleteUser = createAsyncThunk("users/deleteUser",async (id)=>{
    await axios.delete(`${API_URL}/${id}`)
    return id
})

const userSlice = createSlice({
    name : "users",
    initialState : {
        users : [],
        error : null,
        status : "idle"
    },
    reducers : {},
    extraReducers : (builder)=>{
        builder
            .addCase(fetchUsers.pending, (state)=>{
                state.status = "loading"
            })
            .addCase(fetchUsers.fulfilled, (state,action)=>{
                state.status = "done"
                state.users = action.payload

            })
            .addCase(fetchUsers.rejected, (state,action)=>{
                state.status = "failed"
                state.error = action.error.message
            })
            .addCase(addUser.fulfilled,(state,action)=>{
                state.users.push(action.payload)

            })
            .addCase(editUser.fulfilled, (state,action)=>{
                const index = state.users.findIndex((user)=> user.id === action.payload.id)
                if(index !== -1){
                    state.users[index]= action.payload
                }
            })
            .addCase(deleteUser.fulfilled, (state,action)=>{
                state.users = state.users.filter((user) => user.id !== action.payload);
            })
    }

})

export default userSlice.reducer;