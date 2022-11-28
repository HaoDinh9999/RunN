import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import { User } from "../../@core/model/user";
import { api } from "../../services/api";
import { userApi } from "../../services/modules/users";

//Create the thunk


export interface LoginPayload {
    email: string;
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
            state.currentUser = action.payload;
            
            console.log("loginSuccess: ",state );

        },
        loginFailed(state, action: PayloadAction<string>){
            state.logging = false;
        },

        logout(state){
            state.isLoggedIn = false;
            state.currentUser = undefined;
        },

        updateCurrentUser(state, action: PayloadAction<User>){
            state.currentUser = action.payload;
            console.log("updateCurrentUser: ",state.currentUser );

        }

    },
    extraReducers: (builder) =>{
        builder.addMatcher(userApi.endpoints.login.matchFulfilled,(state,action:PayloadAction<User>) => {
            // state.currentUser = action.payload
            // console.log("stateAuthSlice: ",state)
        })
    }
});

//Action
export const authActions = authSlice.actions;

//Selectors
export const selectIsLoggedIn = state => state.auth.isLoggedIn;
export const selectLogging = state => state.auth.logging;
export const currentUser = state => state.auth.currentUser;

//Reducer
const authReducer = authSlice.reducer;
export default authReducer;