import { createSlice } from "@reduxjs/toolkit";

import type { PayloadAction } from "@reduxjs/toolkit";

interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNo: string
  image: string
}

interface Book {
    id: number;
    bookName: string;
    sem: string;
}

interface Issue {
  book: Book;
}

interface Student {
   id: number;

  firstName: string;

  lastName: string;

  phoneNo: string;

  issues: Issue[];
}



interface AuthState {
  user: User | null;
  students: Student[];
}

const initialState: AuthState = {
  user:null,
  students:[],
}

const authSlice = createSlice({

  name:'auth',

  initialState,

  reducers : {
     
     setUser: (state, action: PayloadAction<User>) => {
          
          state.user = action.payload;
     },

     setStudents : (state, action: PayloadAction<Student[]> ) => {
            state.students = action.payload
     },

     logout: (state) => {
            state.user = null
     },
  },

})

export const {setUser, logout, setStudents } = authSlice.actions;

export default authSlice.reducer;