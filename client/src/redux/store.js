import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice.js"   //we change the name here only when importing

export const store = configureStore({
  reducer: {user: userReducer},
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,   //we add this for prevent error for not serializing our variables
    }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
// export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
// export type AppDispatch = typeof store.dispatch;
