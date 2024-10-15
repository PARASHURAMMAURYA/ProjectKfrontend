import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


interface AuthState {
    token: string | null;
    error: string | null;
  }
  
const initialState: AuthState = {
  token: null,
  error: null,
};


export const loginUser = createAsyncThunk(
'auth/login',
async (userData:{email:string,password:string})=>{
    const response = await axios.post('http://localhost:5000/api/auth/login',userData);
    return response.data.token;
}
);

const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{

    },
extraReducers:(builder)=>{
    builder
    .addCase(loginUser.fulfilled,(state,action)=>{
        state.token = action.payload;
        state.error = null;
    })
    .addCase(loginUser.rejected,(state,action)=>{
        state.error = action.error.message||'Login Failed';
    });
}
});

export default authSlice.reducer;