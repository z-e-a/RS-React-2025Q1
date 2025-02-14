import { createSlice } from '@reduxjs/toolkit';
import { type PayloadAction } from '@reduxjs/toolkit';
import { IPeople } from '../../../SWApi';

export interface IPeopleViewState {
  currentPage: number;
  totalItemsCount: number;
  selectedPeople: IPeople[];
  searchText: string;
}

const initialState: IPeopleViewState = {
  currentPage: 1,
  totalItemsCount: 0,
  selectedPeople: [],
  searchText: '',
};

export const peopleViewSlice = createSlice({
  name: 'people',
  initialState,
  reducers: {
    setSearchText: (state, action: PayloadAction<{ searchText: string }>) => {
      const searchText = action.payload.searchText;
      state.searchText = searchText;
      if (searchText) {
        window.localStorage.setItem(
          `${import.meta.env.VITE_APP_PREFIX}searchText`,
          JSON.stringify(action.payload.searchText)
        );
      }
    },
    setTotalItemsCount: (
      state,
      action: PayloadAction<{ totalItemsCount: number }>
    ) => {
      state.totalItemsCount = action.payload.totalItemsCount;
    },
    setCurrentPage: (state, action: PayloadAction<{ currentPage: number }>) => {
      state.currentPage = action.payload.currentPage;
    },
    togglePeopleSelection: (
      state,
      action: PayloadAction<{ people: IPeople }>
    ) => {
      if (
        !state.selectedPeople.some((p) => p.name === action.payload.people.name)
      ) {
        state.selectedPeople.push(action.payload.people);
      } else {
        state.selectedPeople = state.selectedPeople.filter(
          (p) => p.name !== action.payload.people.name
        );
      }
    },
    unselectAllPeople: (state) => {
      state.selectedPeople = [];
    },
  },
});

const {
  setSearchText,
  setTotalItemsCount,
  setCurrentPage,
  togglePeopleSelection,
  unselectAllPeople,
} = peopleViewSlice.actions;
const peopleViewReducer = peopleViewSlice.reducer;

export {
  setSearchText,
  setTotalItemsCount,
  setCurrentPage,
  togglePeopleSelection,
  unselectAllPeople,
  peopleViewReducer,
};
