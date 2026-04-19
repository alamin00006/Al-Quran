import { useDispatch, useSelector, type TypedUseSelectorHook } from "react-redux";
import type { RootState, AppDispatch } from "./index";

// Typed dispatch hook for Redux actions and RTK Query utilities.
export const useAppDispatch: () => AppDispatch = useDispatch;
// Typed selector hook for reading Redux state.
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
