import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import { User } from "../../@core/model/user";

export interface LoginPayload {
    username: string;
    password: string;
}
export interface AuthState {
    isLoggedIn: boolean;
    logging?: Boolean;
    currentUser ?: User;
}

const initialState : AuthState = {
    isLoggedIn:false,
    logging:false,
    currentUser:undefined,
}

const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        login(state, action: PayloadAction<LoginPayload>){
            state.logging = true;
        },
        loginSuccess(state, action: PayloadAction<User>){
            state.logging = false;
            state.isLoggedIn = true;
            state.currentUser = action.payload
        },
        loginFailed(state, action: PayloadAction<string>){
            state.logging = false;
        },

        logout(state){
            state.isLoggedIn = false;
            state.currentUser = undefined;
        }

    }
});

//Action
export const authActions = authSlice.actions;

//Selectors
export const selectIsLoggedIn = state => state.auth.isLoggedIn;
export const selectLogging = state => state.auth.logging;

//Reducer
const authReducer = authSlice.reducer;
export default authReducer;