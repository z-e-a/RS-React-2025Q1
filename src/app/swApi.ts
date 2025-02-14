import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IPeople } from '../SWApi';

export interface IPeopleRequest {
  searchText: string;
  page: number;
}

export interface IPeopleResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: IPeople[];
}

export const swApi = createApi({
  reducerPath: 'swApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API_URL}`,
  }),
  endpoints: (builder) => ({
    people: builder.mutation<IPeopleResponse, IPeopleRequest>({
      query: (params) => ({
        url: 'people',
        params: {
          search: params.searchText,
          page: params.page,
        },
      }),
    }),
    person: builder.query<IPeople, { id: string }>({
      query: (params) => ({
        url: `people/${params.id}`,
      }),
    }),
  }),
});

export const { usePeopleMutation, usePersonQuery } = swApi;
