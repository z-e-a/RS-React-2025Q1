import { type TypedUseSelectorHook, useSelector } from 'react-redux';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { peopleReducer } from '../entities/people';
import { peopleViewReducer } from '../entities/people/model/peopleViewSlice';
import { swApi } from './swApi';
import { personReducer } from '../entities/person';

export const rootReducer = combineReducers({
  people: peopleReducer,
  peopleView: peopleViewReducer,
  person: personReducer,
  [swApi.reducerPath]: swApi.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(swApi.middleware),
});

export type RootStateType = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;
export const AppSelector: TypedUseSelectorHook<RootStateType> = useSelector;
export const useAppSelector = useSelector.withTypes<RootStateType>();
