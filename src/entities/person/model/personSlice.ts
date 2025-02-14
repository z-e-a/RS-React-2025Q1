import { createSlice } from '@reduxjs/toolkit';
import { type PayloadAction } from '@reduxjs/toolkit';
import { IPeople } from '../../../SWApi';

export interface IPersonState {
  person: IPeople | null;
}

const initialState: IPersonState = {
  person: null,
};

export const personSlice = createSlice({
  name: 'person',
  initialState,
  reducers: {
    setPerson: (state, action: PayloadAction<IPeople>) => {
      state.person = action.payload;
    },
  },
});

const { setPerson } = personSlice.actions;
const personReducer = personSlice.reducer;

export { setPerson, personReducer };
