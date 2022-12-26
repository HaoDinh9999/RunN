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
        currentEnergy: 0,
        maxEnergy:0
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

        updateMaxEnergy(state, action:PayloadAction<PropSneaker[]>){
            const sneakers = action.payload;
            let totalEnerygy:number = 0;
            if(sneakers.length < 3 && sneakers.length > 0)  totalEnerygy=2;
            else if( sneakers.length < 6 && sneakers.length >=3) totalEnerygy=4;
            else if(sneakers.length < 10 && sneakers.length >=6) totalEnerygy=6;
            else if(sneakers.length < 15 && sneakers.length >=10) totalEnerygy = 9;
            else if(sneakers.length <25 && sneakers.length >=15) totalEnerygy = 12;
            else if(sneakers.length >=25) totalEnerygy=18;

            sneakers.forEach((sneaker:PropSneaker)=>{
                switch(sneaker.Type){
                    case "Common":
                        totalEnerygy+=0;
                        break;
                    case "Uncommon":
                        totalEnerygy+=1;
                        break;
                    case "Rare":
                        totalEnerygy+=2;
                        break;
                    case "Epic":
                        totalEnerygy+=3;
                        break;
                    case "Legendary":
                        totalEnerygy+=4;
                        break;
                    default:
                        break;
                }
                
            })
            state.energy.maxEnergy = totalEnerygy;
            console.log("updateMaxEnergy", state.energy.maxEnergy)
            checkFillEnergy(state);
        },

        resetMaxEnergy(state){
            state.energy.maxEnergy = 0;
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