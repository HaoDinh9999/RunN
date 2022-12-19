import { combineReducers, configureStore, ThunkAction, Action, getDefaultMiddleware } from '@reduxjs/toolkit';
import authReducer from '../screens/Login/authSlice';
import moveReducer from '../screens/Move/moveSlice';

import { api } from '../services/api';

// ...
// const sagaMiddleware = createSagaMiddleware();
const reducers = combineReducers({
  api: api.reducer,
  auth: authReducer,
  move: moveReducer
});

export const store = configureStore({
  reducer: reducers,
  middleware:getDefaultMiddleware({
    serializableCheck: false
  })
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction <
ReturnType,
RootState,
unknown,
Action<string>
>
