import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import { PropSneaker } from "../../@core/model/sneaker";
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
    logging?: boolean;
    isUpdateToken?:boolean;
    currentUser ?: User;
}

const initialState : AuthState = {
    isLoggedIn:false,
    logging:false,
    isUpdateToken:true,
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
            state.isUpdateToken=true;

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
        },

        updateSneakers(state, action: PayloadAction<PropSneaker[]>){
            state.currentUser.sneakers = action.payload;
            console.log("updateSneakers: ",state.currentUser.sneakers );

        },

        updateRMToken(state, action: PayloadAction<{hex:string, type:string}>){
            state.currentUser.RMToken = action.payload;
            console.log("updateRMToken: ",state.currentUser.RMToken );
            state.isUpdateToken=false;
        },

        isUpdateRMT(state, action: PayloadAction<boolean>){
            state.isUpdateToken = action.payload;
            console.log("isUpdateRMT: ",state.isUpdateToken );
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