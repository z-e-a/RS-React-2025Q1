import { createSlice } from '@reduxjs/toolkit';
import { type PayloadAction } from '@reduxjs/toolkit';
import { IPeople } from '../../../SWApi';

export interface IPeopleState {
  peopleList: IPeople[];
}

const initialState: IPeopleState = {
  peopleList: [],
};

export const peopleSlice = createSlice({
  name: 'people',
  initialState,
  reducers: {
    setPeople: (state, action: PayloadAction<IPeople[]>) => {
      state.peopleList = action.payload;
    },
  },
});

const { setPeople } = peopleSlice.actions;
const peopleReducer = peopleSlice.reducer;

export { setPeople, peopleReducer };
