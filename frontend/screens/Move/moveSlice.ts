import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {EnergyProps} from "../../@core/model/move"


//Create the thunk


export interface LoginPayload {
    email: string;
    password: string;
}
export interface MoveState {
    energy ?: EnergyProps;
    isFillEnergy: boolean;
}

const initialState : MoveState = {
    energy:{
        currentEnergy: 1,
        maxEnergy:2
    },
    isFillEnergy: false,
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
    
        updateEnergy(state, action:PayloadAction<EnergyProps>){
            state.energy = action.payload;
            console.log("updateEnergy",state.energy)
            checkFillEnergy(state);
        },

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

//Reducer
const moveReducer = moveSlice.reducer;
export default moveReducer;