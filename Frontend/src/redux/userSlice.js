import { createSlice } from "@reduxjs/toolkit";


export const userSlice = createSlice({
    name:"user",
    initialState:{
        _id:"",
        name:"",
        email:"",
        auth:false,
    },

    reducers:{
        login:(state,action)=>{
            state._id = action.payload._id;
            state.name = action.payload.name;
            state.email = action.payload.email;
            state.auth = true;
        },
        logout:(state)=>{
            state._id = "";
            state.name = "";
            state.email = "";
            state.auth = false;
        }
    }
});

export const {login,logout} = userSlice.actions;
export default userSlice.reducer;
