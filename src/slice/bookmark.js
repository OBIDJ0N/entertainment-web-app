import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import BookmarkService from "../service/bookmark";

export const fetchBookmarks = createAsyncThunk(
  "bookmark/fetchBookmarks",
  async (_, { rejectWithValue }) => {
    try {
      const userBookmarks = await BookmarkService.getBookmarks();
      return userBookmarks;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const bookmarkSlice = createSlice({
  name: 'bookmark',
  initialState: {
    bookmarks: [],
    isLoading: false,
    error: null
  },
  reducers: {
    clearBookmarks: (state) => {
      state.bookmarks = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBookmarks.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchBookmarks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.bookmarks = action.payload;
      })
      .addCase(fetchBookmarks.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default bookmarkSlice.reducer;
