import { type TypedUseSelectorHook, useSelector } from 'react-redux';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { usersReducer } from '../entities/users';

export const rootReducer = combineReducers({
  users: usersReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootStateType = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;
export const AppSelector: TypedUseSelectorHook<RootStateType> = useSelector;
export const useAppSelector = useSelector.withTypes<RootStateType>();
