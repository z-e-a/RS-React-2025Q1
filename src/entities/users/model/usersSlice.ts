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
  image: string | undefined;
}

export interface UsersState {
  usersList: UserType[];
}

export const defUser: UserType = {
  source: 'uncontrolled form',
  name: 'Evgeny',
  email: 'test@test.com',
  age: 44,
  password: 'password',
  gender: 'male',
  country: 'Russia',
  terms: true,
  image: null,
};

const initialState: UsersState = {
  // usersList: [defUser],
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
