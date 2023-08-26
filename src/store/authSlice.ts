import {createSlice} from '@reduxjs/toolkit';
import {RootState} from './Store';

interface initialAppState {
  isAuthenticated: boolean;
}

const initialState: initialAppState = {
  isAuthenticated: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: state => {
      state.isAuthenticated = true;
    },
    logout: state => {
      state.isAuthenticated = false;
    },
  },
});

export const {login, logout} = authSlice.actions;

export const authSelector = (state: RootState) => state.auth.isAuthenticated;

export default authSlice.reducer;
