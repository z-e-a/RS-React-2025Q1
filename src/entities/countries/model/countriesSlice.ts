import { countries } from '../../../constants/countries';
import { createSlice } from '@reduxjs/toolkit';

export interface CountryType {
  name: string;
  code: string;
}

export interface CountriesState {
  countriesList: CountryType[];
}

const initialState: CountriesState = {
  countriesList: countries,
};

export const countriesSlice = createSlice({
  name: 'countries',
  initialState,
  reducers: {},
});

const countriesReducer = countriesSlice.reducer;

export { countriesReducer };
