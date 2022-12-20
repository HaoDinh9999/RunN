import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {EnergyProps} from "../../@core/model/move"
import { PropSneaker } from "../../@core/model/sneaker";


//Create the thunk


export interface LoginPayload {
    email: string;
    password: string;
}
export interface MoveState {
    energy ?: EnergyProps;
    isFillEnergy?: boolean;
    timing?: boolean;
    coinReward?: number;
}

const initialState : MoveState = {
    energy:{
        currentEnergy: 1,
        maxEnergy:2
    },
    isFillEnergy: false,
    timing: false,
    coinReward:0
}
const checkFillEnergy = (state) =>{
    if(state.energy.currentEnergy >= state.energy.maxEnergy){
        state.isFillEnergy = false;
    }
    else{
        state.isFillEnergy = true;
    }
}

const moveSlice = createSlice({
    name:'move',
    initialState,
    reducers:{
        moving(state, action: PayloadAction<LoginPayload>){
            // state.logging = true;
        },
    
        updateCurrentEnergy(state, action:PayloadAction<number>){
            state.energy.currentEnergy = action.payload;
            console.log("updateCurrentEnergy",state.energy.currentEnergy)
            checkFillEnergy(state);
        },

        updateMaxEnergy(state, action:PayloadAction<PropSneaker>){
            const sneakers = action.payload;
            console.log("updateMaxEnergy",state.energy.maxEnergy)
            checkFillEnergy(state);
        },

        updateTiming(state, action:PayloadAction<boolean>){
            state.timing = action.payload;
            console.log("updateTiming",state.timing)

        },

        updateCoinReward(state, action: PayloadAction<number>){
            state.coinReward = action.payload;
            console.log("updateCoinReward",state.coinReward)

        }


    },
    // extraReducers: (builder) =>{
    //     builder.addMatcher(userApi.endpoints.login.matchFulfilled,(state,action:PayloadAction<User>) => {
    //         // state.currentUser = action.payload
    //         // console.log("stateAuthSlice: ",state)
    //     })
    // }
});

//Action
export const moveActions = moveSlice.actions;

//Selectors
export const selectEnergy = state => state.move.energy;
export const selectIsFillEnergy = state => state.move.isFillEnergy;
export const selectTiming = state => state.move.timing;

//Reducer
const moveReducer = moveSlice.reducer;
export default moveReducer;