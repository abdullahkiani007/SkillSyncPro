import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    _id: "",
    firstName: "",
    lastName: "",
    email: "",
    auth: false,
    role: "",
  },

  reducers: {
    login: (state, action) => {
      state._id = action.payload._id;
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.email = action.payload.email;
      state.auth = true;
      state.role = action.payload.role;
    },
    logout: (state) => {
      state._id = "";
      state.firstName = "";
      state.lastName = "";
      state.email = "";
      state.auth = false;
      state.role = "";

      localStorage.clear();
    },
    updateUser: (state, action) => {
      state._id = action.payload._id;
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.email = action.payload.email;
      state.auth = true;
      state.role = action.payload.role;
    },
  },
});

// export const jobseekerSlice = createSlice({
//     name:"jobseeker",
//     initialState:{
//         _id:"",
//     },

// })
export const { login, logout, updateUser } = userSlice.actions;
export default userSlice.reducer;
