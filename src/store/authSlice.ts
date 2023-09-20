import {createSlice} from '@reduxjs/toolkit';
import {RootState} from './Store';
import { FUser, TUser } from '@/types/auth';

interface initialAppState {
  isAuthenticated: boolean;
  userData: FUser;
}

const initialUserData = {
  accessToken: null,
  balance: 0,
	firstName: "",
	lastName: "",
	userInfo: "",
};

const initialState: initialAppState = {
  isAuthenticated: false,
  userData: initialUserData,
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
    setUser: (state, { payload }) => {
      state.userData = payload
    }
  },
});

export const {login, logout, setUser} = authSlice.actions;

export const authSelector = (state: RootState) => state.auth.isAuthenticated;

export default authSlice.reducer;
