import { createSlice } from '@reduxjs/toolkit';
import { type PayloadAction } from '@reduxjs/toolkit';

export interface UserType {
  source: string;
  name: string;
  email: string;
  age: number;
  password: string;
  gender: string;
  country: string;
  terms: boolean;
  image: string;
}

export interface UsersState {
  usersList: UserType[];
}

const initialState: UsersState = {
  usersList: [],
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<UserType>) => {
      state.usersList = [...state.usersList, action.payload];
    },
  },
});

const { addUser } = usersSlice.actions;
const usersReducer = usersSlice.reducer;

export { addUser, usersReducer };
