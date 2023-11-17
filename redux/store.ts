import { configureStore } from "@reduxjs/toolkit";
import { reducer } from "./reducer";
import {
  useSelector as useReduxSelector,
  useDispatch as useReduxDispatch,
  TypedUseSelectorHook,
} from "react-redux";

export const reduxStore = configureStore({ reducer });
export const ReduxDispatch = typeof reduxStore.dispatch;
export const useDispatch = () => useReduxDispatch();
export const useSelector: TypedUseSelectorHook<ReduxState> = useReduxSelector;
export type ReduxState = ReturnType<typeof reduxStore.getState>;
